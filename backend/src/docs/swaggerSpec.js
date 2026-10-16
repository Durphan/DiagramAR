const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'DiagramAR API',
      version: '1.0.0',
      description:
        'API for DiagramAR, a web application for creating and sharing diagrams. This API allows users to register, authenticate, and manage their diagrams.',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./src/routes/*.js', './app.js']
};

module.exports = swaggerJsdoc(options);
