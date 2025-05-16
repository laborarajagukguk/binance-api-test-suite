const supertest = require('supertest');
const crypto = require('crypto');
require('dotenv').config();

const api = supertest(process.env.BASE_URL_API);
const headers = { 'X-MBX-APIKEY': process.env.API_KEY };
const invalidHeaders = { 'X-MBX-APIKEY': 'INVALID_API_KEY' };

function getSignature(queryString) {
  return crypto.createHmac('sha256', process.env.API_SECRET)
    .update(queryString)
    .digest('hex');
}

function signQuery(queryParams = '') {
  const timestamp = Date.now();
  const fullQuery = queryParams ? `${queryParams}&timestamp=${timestamp}` : `timestamp=${timestamp}`;
  const signature = getSignature(fullQuery);
  return `${fullQuery}&signature=${signature}`;
}

function requestWithSignature(method, endpoint, queryParams = '', useInvalidKey = false) {
  const signedQuery = signQuery(queryParams);
  const url = `${endpoint}?${signedQuery}`;
  const req = api[method](url);
  return useInvalidKey ? req.set(invalidHeaders) : req.set(headers);
}

function requestWithoutKey(method, endpoint, queryParams = '') {
  const signedQuery = signQuery(queryParams);
  const url = `${endpoint}?${signedQuery}`;
  return api[method](url); // no headers
}

module.exports = {
  requestWithSignature,
  requestWithoutKey,
  signQuery,
};