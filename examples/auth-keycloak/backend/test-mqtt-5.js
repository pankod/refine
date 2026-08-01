const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883', { protocolVersion: 5 });
client.on('connect', () => {
  client.subscribe('test/topic', { qos: 1 }, () => {
    client.publish('test/topic', 'hello', { properties: { userProperties: { fromGw: 'true' } } });
  });
});
client.on('message', (topic, message, packet) => {
  console.log('Received properties:', packet.properties?.userProperties);
  process.exit(0);
});
