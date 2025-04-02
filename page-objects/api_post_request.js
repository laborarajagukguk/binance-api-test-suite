const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.BASE_URL_API);

const Path = '/pet';

function postAPI(body) {
  return api.post(Path)
    .send(body);
}

module.exports = {
  postAPI,
};
