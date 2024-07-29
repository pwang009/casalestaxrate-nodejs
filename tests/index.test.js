const axios = require('axios');

test('fetches tax rate by address', async () => {
  const response = await axios.get('https://services.maps.cdtfa.ca.gov/api/taxrate/GetRateByAddress', {
    params: {
      address: '450 n st',
      city: 'sacramento',
      zip: '95814'
    }
  });
  expect(response.data).toHaveProperty('TaxRate');
});
