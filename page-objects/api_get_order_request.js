const supertest = require('supertest');
require('dotenv').config();

const api = supertest(process.env.BASE_URL_API);

const Path = '/store/order';

function getOrder(orderId) {
  return api.get(`${Path}/${orderId}`);
}

module.exports = {
  getOrder,
};