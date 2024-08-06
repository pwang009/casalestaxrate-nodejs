const express = require('express');
const axios = require('axios');
const router = express.Router();
const getGeoCode = require('../utils/getGeocode');

// const for remote api
const apiHost = process.env.REMOTE_APIHOST;
const getRateByAddrUri = process.env.GETRATEBYADDRURI || 'GetRateByAddress';
const getRateByLngLatUri = process.env.GETRATEBYLNGLATURI || 'GetRateByLngLat';

// const for this web api
// const baseApiUri = process.env.BASE_API_URI || 'CASalesTaxRate';
const byAddr = process.env.BYADDR || 'byAddress';
const byCity = process.env.BYCITY || 'byCity';

/**
 * @swagger
 * /CASalesTaxRate/byaddress:
 *   get:
 *     summary: Get tax rate by address
 *     parameters:
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: zip
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rate:
 *                   type: number
 *                 city:
 *                   type: string
 *                 county:
 *                   type: string
 *       400:
 *         description: Invalid parameters
 *       500:
 *         description: Internal server error
 */
const byAddrUri = `/${byAddr}`;
// console.log(byAddrUri);

router.get(byAddrUri, async (req, res) => {
  const { Street: address, city, zip } = req.query;

  if (!address || !city || !zip) {
    return res.status(400).send('street, city, and zip are required');
  }

  try {
    const response = await axios.get(`${apiHost}/${getRateByAddrUri}`, {
      params: { address, city, zip }
    });
    res.json(response.data.taxRateInfo[0]);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

/**
 * @swagger
 * /CASalesTaxRate/bycity:
 *   get:
 *     summary: Get tax rate by city
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rate:
 *                   type: number
 *                 city:
 *                   type: string
 *                 county:
 *                   type: string
 *       400:
 *         description: Invalid parameters
 *       500:
 *         description: Internal server error
 */
const byCityUri = `/${byCity}`;
// console.log(byCityUri);
router.get(byCityUri, async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).send('City is required');
  }

  // console.log(city);
  try {
    const addr = `${city}, CA`;
    const geoCode = await getGeoCode(addr);
    const response = await axios.get(`${apiHost}/${getRateByLngLatUri}`, {
      params: { longitude: geoCode.lng, latitude: geoCode.lat }
    });
    // console.log(city);
    // const {rate, city: responseCity, county} = response.data.taxRateInfo[0];
    // console.log(city);
    // const result = {rate, city: responseCity, county};
    res.json(response.data.taxRateInfo[0]);
    // return {result};
  } catch (error) {
    res.status(error.response ? error.response.status : 500).send(error.message);
  }
});

router.get('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

module.exports = router;