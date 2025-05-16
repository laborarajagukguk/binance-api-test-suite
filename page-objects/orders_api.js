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

async function placeLimitOrder(symbol, quantity, price) {
  const queryParams = `symbol=${symbol}&side=BUY&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${price}`;
  const signed = signedQuery(queryParams);
  return api.post(`/api/v3/order?${signed}`).set(headers);
}

async function fetchOpenOrders(symbol) {
  const queryParams = `symbol=${symbol}`;
  const signed = signedQuery(queryParams);
  return api.get(`/api/v3/openOrders?${signed}`).set(headers);
}

async function fetchTradeHistory(symbol) {
  const queryParams = `symbol=${symbol}`;
  const signed = signedQuery(queryParams);
  return api.get(`/api/v3/myTrades?${signed}`).set(headers);
}

module.exports = {
  placeLimitOrder,
  fetchOpenOrders,
  fetchTradeHistory,
};