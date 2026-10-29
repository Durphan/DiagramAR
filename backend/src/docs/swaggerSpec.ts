'use strict';

import swaggerJsdoc from 'swagger-jsdoc';

export interface SwaggerSpecOptions {
  definition: {
    openapi: string;
    info: {
      title: string;
      version: string;
      description: string;
    };
    servers: { url: string }[];
  };
  apis: string[];
}

const options: SwaggerSpecOptions = {
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
  apis: ['./src/routes/*.ts', './app.ts'],
};

const spec = swaggerJsdoc(options);

export { spec };
