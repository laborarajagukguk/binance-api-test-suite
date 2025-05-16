const supertest = require('supertest');
const api = supertest(process.env.BASE_URL_API);

function fetchOrderBook(symbol) {
  return api
    .get(`/api/v3/depth?symbol=${symbol}&limit=5`)
}

module.exports = {
  fetchOrderBook,
};