const express = require('express');
const checkAuth = require('./utils/authMiddleware');
const taxRateRoutes = require('./routes/taxRateRoutes');
require('dotenv').config();

const app = express();
const isProd = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 5001;

// Use express.json() to parse JSON bodies
app.use(express.json());

// Apply the checkAuth middleware to all routes
app.use(checkAuth);

app.get('/', (req, res) => {
  res.send('Welcome to the Tax Rate API Wrapper');
});

app.use('/', taxRateRoutes);

// if (!isProd === 'production') 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});