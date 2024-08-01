const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const setupSwagger = require('./utils/swaggerConfig'); 
const checkAuth = require('./utils/checkAuth');
const taxRateRoutes = require('./routes/taxRateRoutes');
require('dotenv').config();

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const httpPort = process.env.PORT || 5000;
const httpsPort = process.env.HTTPS_PORT || 5001;

// Use express.json() to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

setupSwagger(app, httpPort);
// Apply the checkAuth middleware to all routes
app.use(checkAuth);

app.get('/', (req, res) => {
  res.send('Welcome to the Tax Rate API Wrapper');
});

app.use('/', taxRateRoutes);

// start web server with https enabled if it's not production env
if (!isProd)  {
  const privateKey = fs.readFileSync('./ssl/https.key', 'utf8');
  const certificate = fs.readFileSync('./ssl/https.crt', 'utf8');
  const credentials = { key: privateKey, cert: certificate };
  https.createServer(credentials, app).listen(httpsPort, () => {
    console.log(`HTTPS Server running on port ${httpsPort}`);
  });
}

// start web server with http 
http.createServer(app).listen(httpPort, () => {
  console.log(`Server is running on port ${httpPort}`);
});