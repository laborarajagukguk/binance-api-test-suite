const supertest = require('supertest');
const crypto = require('crypto');
require('dotenv').config();

const api = supertest(process.env.BASE_URL_API);

function getSignature(queryString) {
  return crypto.createHmac('sha256', process.env.API_SECRET)
    .update(queryString)
    .digest('hex');
}

function signedQuery(queryParams = '') {
  const timestamp = Date.now();
  const fullQuery = `${queryParams}&timestamp=${timestamp}`;
  const signature = getSignature(fullQuery);
  return `${fullQuery}&signature=${signature}`;
}

const headers = { 'X-MBX-APIKEY': process.env.API_KEY };

async function fetchAccountBalance() {
  const signed = signedQuery('');
  return api.get(`/api/v3/account?${signed}`).set(headers);
}

module.exports = {
  fetchAccountBalance,
};