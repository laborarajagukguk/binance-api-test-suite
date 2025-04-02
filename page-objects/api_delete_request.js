const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.BASE_URL_API);
const Path = '/pet';

function deleteAPI(petId) {
  return api.delete(`${Path}/${petId}`);
}

module.exports = {
  deleteAPI,
};