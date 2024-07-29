const express = require('express');
const axios = require('axios');
const router = express.Router();
const getGeoCode = require('../utils/getGeocode');

// const for remote api
const apiHost = process.env.REMOTE_API_HOST;
const getRateByAddrUri = process.env.GETRATEBYADDRURI;
const getRateByLngLatUri = process.env.GETRATEBYLNGLATURI;

// const for this web api
const baseApiUri = process.env.BASE_API_URI;
const byAddr = process.env.BYADDR;
const byCity = process.env.BYCITY;

// by address
const byAddrUri = `/${baseApiUri}/${byAddr}`;
// console.log(byAddrUri);

router.get(byAddrUri, async (req, res) => {
  const { address, city, zip } = req.query;

  if (!address || !city || !zip) {
    return res.status(400).send('Address, city, and zip are required');
  }

  try {
    const response = await axios.get(`${apiHost}/${getRateByAddrUri}`, {
      params: { address, city, zip }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

// by city
const byCityUri = `/${baseApiUri}/${byCity}`;
// console.log(byCityUri);
router.get(byCityUri, async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).send('City is required');
  }

  try {
    const addr = `${city}, CA`;
    const geoCode = await getGeoCode(addr);
    const response = await axios.get(`${apiHost}/${getRateByLngLatUri}`, {
      params: { longitude: geoCode.lng, latitude: geoCode.lat }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

module.exports = router;