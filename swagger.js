// swagger.js
// const { de } = require('faker/lib/locales');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// configuración de swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Docmentacion de la API',
    version: '1.0.0',
    description: 'Esta es la documentación de la API de productos',
  },
  servers: [
    {
      url: 'http://localhost:2000/', // URBL base de la API
      description: 'Servidor de desarrollo',
    }
  ]
}

const options = {
  swaggerDefinition,
  // path to files
  apis: ['./routes/*.js'], // archivos donde se encuentran las rutas

}

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app){
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}


module.exports = setupSwagger;
