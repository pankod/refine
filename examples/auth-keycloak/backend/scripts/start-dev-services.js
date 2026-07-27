const { spawn } = require('child_process');

console.log('🔄 Đang kiểm tra và khởi động các dịch vụ phụ trợ cho môi trường DEV (Port-forward)...');

const kubeconfig = 'c:\\\\Users\\\\vthea\\\\Documents\\\\GitHub\\\\k3s\\\\kubeconfig.yaml';

const startPortForward = (name, svc, portMap) => {
  try {
    const process = spawn('kubectl', [
      '--kubeconfig', kubeconfig,
      'port-forward', svc, portMap, '-n', 'default'
    ], {
      detached: true,
      stdio: 'ignore',
      windowsHide: true
    });
    process.unref();
    console.log(`✅ Đã ra lệnh chạy ngầm Port-forward cho ${name} (${portMap}).`);
  } catch (error) {
    console.log(`⚠️ Không thể khởi động Port-forward ${name} ngầm. Vui lòng kiểm tra lại kubectl.`);
  }
};

startPortForward('Redis', 'svc/redis', '6379:6379');
startPortForward('PostgreSQL', 'svc/iot-db-cluster-rw', '5432:5432');
