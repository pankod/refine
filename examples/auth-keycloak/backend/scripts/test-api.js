const http = require('http');

http.get('http://localhost:3000/devices/4b344a0e-6277-4711-b9ff-c0623dbfc2dd/telemetry', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log('TELEMETRY:', res.statusCode, data));
}).on('error', console.error);

http.get('http://localhost:3000/devices/4b344a0e-6277-4711-b9ff-c0623dbfc2dd/telemetry/history', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log('HISTORY:', res.statusCode, data));
}).on('error', console.error);
