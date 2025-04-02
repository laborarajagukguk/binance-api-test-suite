const { expect } = require('chai');
const api = require('../page-objects/api_delete_request.js');
const cases = require('../test-cases/api_delete_testcases.js');
const global = require('../helper/global.js');
const setup = require('./setup.js');


describe('@deletedescribe DELETE Request for Non-Existent Pet', () => {
    it(`@deleteit ${cases.scenario.notFound.desc}`, async () => {
  
      const response = await api.deleteAPI(global.fakePetId);
  
      // Assert status code
      expect(response.status).to.equal(cases.scenario.notFound.response);
    });
  });