const { expect } = require('chai');
const api = require('../page-objects/api_delete_order_request.js');
const cases = require('../test-cases/api_delete_order_testcases.js');
const global = require('../helper/global.js');
const setup = require('./setup.js');

describe('@deletedescribe DELETE order by ID', () => {
  it(`@deleteit ${cases.scenario.deleteInvalidOrder.desc}`, async () => {

    const response = await api.deleteOrder(global.fakePetId);

    expect(response.status).to.equal(cases.scenario.deleteInvalidOrder.response);
    expect(response.body).to.have.property('message'); // API should return an error message
  });
});