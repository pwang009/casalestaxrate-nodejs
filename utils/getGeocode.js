const axios = require('axios');
require('dotenv').config();

const getGeocode = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = process.env.GOOGLE_MAPS_API_URL;

  try {
    const response = await axios.get(url, {
      params: { address, key: apiKey }
    });

    const data = response.data;

    if (data.status === 'OK') {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error(data.status);
    }
  } catch (error) {
    console.error('Error fetching geocode:', error.message);
    return null;
  }
};

module.exports = getGeocode;
