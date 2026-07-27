const { spawn, execSync } = require('child_process');

console.log('🔄 Đang dọn dẹp các tiến trình Port-forward cũ (nếu có)...');
try {
  execSync('taskkill /F /IM kubectl.exe', { stdio: 'ignore' });
} catch (e) {}

console.log('🔄 Đang khởi động Redis và EMQX qua Docker Compose...');
try {
  execSync('docker-compose up -d', { stdio: 'inherit' });
} catch (e) {
  console.log('⚠️ Không thể khởi động Docker Compose. Vui lòng kiểm tra lại Docker.');
}

console.log('🔄 Đang khởi động dịch vụ PostgreSQL qua K3s Port-forward...');

const kubeconfig = 'c:\\\\Users\\\\vthea\\\\Documents\\\\GitHub\\\\k3s\\\\kubeconfig.yaml';

const startPortForward = (name, svc, portMap) => {
  try {
    const process = spawn('kubectl.exe', [
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
    console.log(`⚠️ Lỗi khởi động ${name}:`, error.message);
  }
};

startPortForward('PostgreSQL', 'svc/iot-db-cluster-rw', '5432:5432');
