const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.BASE_URL_API);

function postOrder(orderBody) {
  return api.post('/store/order').send(orderBody);
}

module.exports = {
  postOrder,
};