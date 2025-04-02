const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.BASE_URL_API);
const Path = '/pet';

function putAPI(body) {
  return api.put(Path).send(body);
}

module.exports = {
  putAPI,
};