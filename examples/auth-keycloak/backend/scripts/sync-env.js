const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 Đang đồng bộ Mật khẩu Database từ K3s Secret...');

try {
  // Lấy dữ liệu secret từ K3s dưới dạng JSON
  const kubeconfig = 'c:\\\\Users\\\\vthea\\\\Documents\\\\GitHub\\\\k3s\\\\kubeconfig.yaml';
  const stdout = execSync(`kubectl --kubeconfig ${kubeconfig} get secret iot-db-cluster-app -n default -o json`);
  const secret = JSON.parse(stdout.toString());

  // Giải mã Base64 trường 'uri'
  const uriBase64 = secret.data.uri;
  const decodedUri = Buffer.from(uriBase64, 'base64').toString('utf-8');

  // URL từ K3s có dạng: postgresql://iot_user:PASSWORD@iot-db-cluster-rw.default:5432/iot_db
  // Khi chạy local, chúng ta map qua port 5432 trên localhost nên cần sửa đổi host
  const localUri = decodedUri.replace('@iot-db-cluster-rw.default:5432', '@localhost:5432') + '?schema=public&sslmode=disable';

  // Đọc file .env
  const envPath = path.join(__dirname, '..', '.env');
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
  }

  // Cập nhật hoặc thêm DATABASE_URL
  const dbUrlRegex = /^DATABASE_URL=.*$/m;
  if (dbUrlRegex.test(envContent)) {
    envContent = envContent.replace(dbUrlRegex, `DATABASE_URL="${localUri}"`);
  } else {
    envContent += `\nDATABASE_URL="${localUri}"\n`;
  }

  // Ghi lại file .env
  fs.writeFileSync(envPath, envContent, 'utf-8');
  console.log('✅ Đã đồng bộ thành công DATABASE_URL vào file .env!');

} catch (error) {
  console.error('❌ Lỗi khi đồng bộ secret từ K3s:', error.message);
  console.log('⚠️ Hãy chắc chắn bạn đã bật k3s và cấu hình kubectl đúng cách.');
}
