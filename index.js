const express = require('express');
const axios = require('axios');
const getGeoCode = require('./utils/getGeocode');
require('dotenv').config();

// env.config();
const app = express();
const PORT = process.env.PORT || 5001;
const apiHost = process.env.REMOTE_API_HOST;
const getRateByAddrUri = process.env.GETRATEBYADDRURI;
const getRateByLngLatUri = process.env.GETRATEBYLNGLATURI;

const baseApiUri = process.env.BASE_API_URI;
const byAddr = process.env.BYADDR;
const byCity = process.env.BYCITY;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Tax Rate API Wrapper');
});

// app.get('/taxrate', async (req, res) => {
const byAddrUri = '/' + baseApiUri + '/' + byAddr;
console.log(byAddrUri);
app.get(byAddrUri, async (req, res) => {
    const { address, city, zip } = req.query;
  
    if (!address || !city || !zip) {
      return res.status(400).send('Address, city, and zip are required');
    }
  
    try {
    //   const response = await axios.get(`${apiHost}`, {
        const response = await axios.get(apiHost + '/' + getRateByAddrUri, {
        params: { address, city, zip }
      });
      res.json(response.data);
    } catch (error) {
      res.status(error.response ? error.response.status : 500).send(error.message);
    }
  });

const byCityUri = '/' + baseApiUri + '/' + byCity;
console.log(byCityUri);
app.get(byCityUri, async (req, res) => {
    const { city, } = req.query;
    console.log(city);
    if (!city) {
      return res.status(400).send('city is required');
    }
  
    try {
        const addr = city + ', CA';
        const geoCode = await getGeoCode(addr);
        const response = await axios.get(apiHost + '/' + getRateByLngLatUri, {
        params: { longitude:geoCode.lng, latitude:geoCode.lat, }
      });
      res.json(response.data);
    } catch (error) {
      res.status(error.response ? error.response.status : 500).send(error.message);
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

  
