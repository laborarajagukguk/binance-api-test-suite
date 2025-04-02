const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.BASE_URL_API);

const Path = '/pet';

function getAPI(petId) {
  return api.get(`${Path}/${petId}`);
}

module.exports = {
  getAPI,
};
