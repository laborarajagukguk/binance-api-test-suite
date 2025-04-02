const supertest = require('supertest');
require('dotenv').config();

const api = supertest(process.env.BASE_URL_API);

const Path = '/store/order';

function deleteOrder(orderId) {
  return api.delete(`${Path}/${orderId}`);
}

module.exports = {
  deleteOrder,
};