// swaggerConfig.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const getSwaggerDefinition = (port)=> ({
  openapi: '3.0.0',
  info: {
    title: 'California Sales Tax Rate Api',
    version: '1.0.0',
    description: 'Lotusseats Api for California Sales Tax Rate',
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Development server',
    },
  ],
  tags: [
    {
        name: 'Sales Tax',
        description: 'Endpoints related to sales tax rates',
      },
  ],
});

const options = (port) => ({
  swaggerDefinition: getSwaggerDefinition(port),
  apis: [path.join(__dirname, './routes/*.js')], 
});

const setupSwagger = (app, port) => {
   const swaggerSpec = swaggerJSDoc(options(port));
  //  console.log(swaggerSpec);
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;