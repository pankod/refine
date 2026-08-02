const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const {
  checkKubectl,
  getKubectlArgs,
  kubectlCommand,
  resolveKubeconfig
} = require('./dev-config');

require('dotenv').config({ path: path.resolve(__dirname, '../.env'), quiet: true });

const stopPreviousPortForward = (id) => {
  const pidPath = path.join(__dirname, `.${id}-port-forward.pid`);
  if (!fs.existsSync(pidPath)) return;

  const previousPid = Number(fs.readFileSync(pidPath, 'utf8'));
  if (Number.isInteger(previousPid)) {
    const processInfo = process.platform === 'win32'
      ? spawnSync('powershell.exe', [
          '-NoProfile',
          '-Command',
          `(Get-CimInstance Win32_Process -Filter "ProcessId = ${previousPid}").CommandLine`
        ], { encoding: 'utf8' })
      : spawnSync('ps', ['-p', String(previousPid), '-o', 'command='], { encoding: 'utf8' });
    const commandLine = processInfo.stdout?.trim() || '';

    if (commandLine.includes('kubectl') && commandLine.includes('port-forward')) {
      try {
        process.kill(previousPid, 'SIGTERM');
      } catch (error) {
        if (error.code !== 'ESRCH') {
          console.warn(`⚠️ Không thể dừng port-forward PID ${previousPid}: ${error.message}`);
        }
      }
    } else if (commandLine) {
      console.warn(`⚠️ PID ${previousPid} không phải kubectl port-forward; không dừng tiến trình này.`);
    }
  }
  fs.rmSync(pidPath, { force: true });
};

console.log('🔄 Đang dọn dẹp tiến trình Port-forward cũ (nếu có)...');
stopPreviousPortForward('postgres');
stopPreviousPortForward('redis');
stopPreviousPortForward('emqx');

const kubeconfig = resolveKubeconfig();
const kubectlStatus = checkKubectl(kubeconfig);
const useK3sRedis = kubectlStatus.ok && process.env.USE_K3S_REDIS !== 'false';
const useK3sEmqx = kubectlStatus.ok && process.env.USE_K3S_EMQX !== 'false';

const composeServices = [
  ...(!useK3sEmqx ? ['emqx'] : []),
  ...(!useK3sRedis ? ['redis'] : [])
];
if (composeServices.length > 0) {
  console.log(`🔄 Đang khởi động ${composeServices.join(', ')} qua Docker Compose...`);
  const dockerStatus = spawnSync('docker', ['info'], { stdio: 'ignore' });
  if (dockerStatus.status === 0) {
  const compose = spawnSync('docker', ['compose', 'up', '-d', ...composeServices], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit'
  });
    if (compose.status !== 0) {
      console.warn('⚠️ Docker Compose không khởi động thành công.');
    }
  } else {
    console.warn('⚠️ Docker daemon chưa sẵn sàng. Hãy mở Docker Desktop rồi chạy lại npm run dev.');
  }
} else {
  console.log('ℹ️ PostgreSQL, Redis và EMQX đều dùng từ K3s; không cần Docker local.');
}

console.log('🔄 Đang khởi động dịch vụ K3s qua Port-forward...');
const namespace = process.env.K8S_NAMESPACE || 'default';

const resolveRedisPrimaryPod = () => {
  if (!process.env.REDIS_PASSWORD) {
    console.warn('⚠️ Không có REDIS_PASSWORD để hỏi Sentinel về Redis primary.');
    return null;
  }

  const sentinelPod = process.env.K8S_REDIS_SENTINEL_POD || 'redis-node-0';
  const masterName = process.env.REDIS_MASTER_NAME || 'mymaster';
  const result = spawnSync(
    kubectlCommand,
    getKubectlArgs(kubeconfig, [
      'exec', '-n', namespace, sentinelPod, '-c', 'sentinel', '--',
      'redis-cli', '--no-auth-warning', '-a', process.env.REDIS_PASSWORD,
      '-p', '26379', '--raw', 'SENTINEL', 'get-master-addr-by-name', masterName
    ]),
    { encoding: 'utf8' }
  );

  if (result.error || result.status !== 0) {
    console.warn(`⚠️ Không xác định được Redis primary: ${result.error?.message || result.stderr.trim()}`);
    return null;
  }

  const masterHost = result.stdout.trim().split(/\s+/)[0];
  const podName = masterHost?.match(/^redis-node-\d+/)?.[0];
  return podName ? `pod/${podName}` : null;
};

const startPortForward = (id, name, service, portMap) => {
  const serviceCheck = spawnSync(
    kubectlCommand,
    getKubectlArgs(kubeconfig, ['get', service, '-n', namespace, '-o', 'name']),
    { encoding: 'utf8' }
  );
  if (serviceCheck.error || serviceCheck.status !== 0) {
    const message = serviceCheck.error?.message || serviceCheck.stderr.trim();
    console.warn(`⚠️ Bỏ qua port-forward cho ${name}: ${message}`);
    return;
  }

  const pidPath = path.join(__dirname, `.${id}-port-forward.pid`);
  const logPath = path.join(__dirname, `.${id}-port-forward.log`);
  const logFd = fs.openSync(logPath, 'w');
  const childEnv = { ...process.env };
  delete childEnv.DEBUG;
  const child = spawn(
    kubectlCommand,
    getKubectlArgs(kubeconfig, ['port-forward', service, portMap, '-n', namespace]),
    {
      detached: true,
      stdio: ['ignore', logFd, logFd],
      env: childEnv,
      windowsHide: true
    }
  );

  child.once('error', (error) => {
    console.warn(`⚠️ Không thể khởi động port-forward cho ${name}: ${error.message}`);
  });
  child.once('spawn', () => {
    fs.writeFileSync(pidPath, String(child.pid));
    console.log(`✅ Đã khởi động port-forward cho ${name} (${portMap}), PID ${child.pid}.`);
  });
  child.unref();
  fs.closeSync(logFd);
};

if (process.env.SKIP_K8S_PORT_FORWARD === 'true') {
  console.log('ℹ️ Đã bỏ qua port-forward vì SKIP_K8S_PORT_FORWARD=true.');
} else if (!kubectlStatus.ok) {
  console.warn(`⚠️ Bỏ qua PostgreSQL port-forward: ${kubectlStatus.message}`);
  console.warn('   Hãy đặt K3S_KUBECONFIG hoặc KUBECONFIG tới kubeconfig hợp lệ.');
} else {
  startPortForward(
    'postgres',
    'PostgreSQL',
    process.env.K8S_DB_SERVICE || 'svc/iot-db-cluster-rw',
    `${process.env.LOCAL_DB_PORT || '5432'}:5432`
  );
  if (useK3sRedis) {
    const redisPrimaryPod = resolveRedisPrimaryPod();
    if (redisPrimaryPod) {
      startPortForward(
        'redis',
        'Redis primary',
        redisPrimaryPod,
        `${process.env.LOCAL_REDIS_PORT || '6379'}:6379`
      );
    }
  }
  if (useK3sEmqx) {
    startPortForward(
      'emqx',
      'EMQX',
      process.env.K8S_EMQX_SERVICE || 'svc/emqx',
      `${process.env.LOCAL_EMQX_PORT || '1883'}:1883`
    );
  }
}
