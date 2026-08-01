import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'VTA Pro Backend API',
    description: 'Tài liệu hướng dẫn tích hợp hệ thống IoT VTA Pro (Chuẩn OpenAPI 3.0)',
    version: '2.0.9',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Nhập token theo định dạng: Bearer <token>'
    }
  },
  security: [ { bearerAuth: [] } ]
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.ts'];

// Sử dụng option { openapi: '3.0.0' } để tương thích tốt với Swagger UI
swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully.");
});
