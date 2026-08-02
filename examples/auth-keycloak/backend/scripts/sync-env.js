const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const {
  checkKubectl,
  getKubectlArgs,
  kubectlCommand,
  resolveKubeconfig
} = require('./dev-config');

console.log('🔄 Đang đồng bộ Mật khẩu Database từ K3s Secret...');

const getSecret = (kubeconfig, name, namespace) => {
  const result = spawnSync(
    kubectlCommand,
    getKubectlArgs(kubeconfig, ['get', 'secret', name, '-n', namespace, '-o', 'json']),
    { encoding: 'utf8' }
  );

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(result.stderr.trim() || `kubectl kết thúc với mã ${result.status}`);
  }

  return JSON.parse(result.stdout);
};

const setEnvValue = (content, key, value) => {
  const line = `${key}=${JSON.stringify(value)}`;
  const pattern = new RegExp(`^${key}=.*$`, 'm');
  if (pattern.test(content)) {
    return content.replace(pattern, line);
  }
  return `${content}${content.endsWith('\n') || content.length === 0 ? '' : '\n'}${line}\n`;
};

try {
  if (process.env.SKIP_K8S_SYNC === 'true') {
    console.log('ℹ️ Đã bỏ qua đồng bộ K3s vì SKIP_K8S_SYNC=true.');
    process.exit(0);
  }

  const kubeconfig = resolveKubeconfig();
  const kubectlStatus = checkKubectl(kubeconfig);
  if (!kubectlStatus.ok) {
    throw new Error(kubectlStatus.message);
  }

  const secretName = process.env.K8S_DB_SECRET || 'iot-db-cluster-app';
  const redisSecretName = process.env.K8S_REDIS_SECRET || 'redis';
  const namespace = process.env.K8S_NAMESPACE || 'default';
  const secret = getSecret(kubeconfig, secretName, namespace);
  const uriBase64 = secret.data?.uri;
  if (!uriBase64) {
    throw new Error(`Secret ${secretName} không có trường data.uri.`);
  }

  const decodedUri = Buffer.from(uriBase64, 'base64').toString('utf8');
  const databaseUrl = new URL(decodedUri);
  databaseUrl.hostname = process.env.LOCAL_DB_HOST || 'localhost';
  databaseUrl.port = process.env.LOCAL_DB_PORT || '5432';
  databaseUrl.searchParams.set('schema', 'public');
  databaseUrl.searchParams.set('sslmode', 'disable');
  const localUri = databaseUrl.toString();

  const redisSecret = getSecret(kubeconfig, redisSecretName, namespace);
  const redisPasswordBase64 = redisSecret.data?.['redis-password'];
  if (!redisPasswordBase64) {
    throw new Error(`Secret ${redisSecretName} không có trường data.redis-password.`);
  }
  const redisPassword = Buffer.from(redisPasswordBase64, 'base64').toString('utf8');
  const redisUrl = new URL(`redis://${process.env.LOCAL_REDIS_HOST || 'localhost'}:${process.env.LOCAL_REDIS_PORT || '6379'}`);
  redisUrl.password = redisPassword;

  const envPath = path.join(__dirname, '..', '.env');
  let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
  envContent = setEnvValue(envContent, 'DATABASE_URL', localUri);
  envContent = setEnvValue(envContent, 'REDIS_PASSWORD', redisPassword);
  envContent = setEnvValue(envContent, 'REDIS_URL', redisUrl.toString());

  fs.writeFileSync(envPath, envContent, 'utf8');
  console.log(`✅ Đã đồng bộ Database và Redis Secrets từ context "${kubectlStatus.context}" vào file .env.`);
} catch (error) {
  console.error('❌ Không thể đồng bộ DATABASE_URL từ K3s:', error.message);
  console.log('⚠️ Giữ nguyên .env hiện tại. Hãy đặt K3S_KUBECONFIG hoặc KUBECONFIG tới kubeconfig hợp lệ.');
}
