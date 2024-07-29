const express = require('express');

const taxRateRoutes = require('./routes/taxRateRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Tax Rate API Wrapper');
});

app.use('/', taxRateRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});