// Swagger Configurations for API Documentation

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerConfigOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MERN Stack App',
      description: 'Example of Simple MERN Stack App API Documentation ',
      version: '1.0.0',
    },
    servers:[
        {
            url:"http://localhost:5000/",
            description: 'Development server',
        }
    ]
  },
  // looks for configuration in specified directories
  apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(swaggerConfigOptions);

const swaggerInit = (app) => {
    
    // Swagger Endpoint -- http://localhost:5000/apidocumentation
    app.use("/apidocumentation",swaggerUI.serve,swaggerUI.setup(swaggerSpec,{ explorer: true }))

    // Documentation in JSON format 
    app.get('/apidocumentation.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })  
}

module.exports = swaggerInit