const { expect } = require('chai');
const api = require('../page-objects/api_get_order_request.js');
const cases = require('../test-cases/api_get_order_testcases.js');
const global = require('../helper/global.js');
const setup = require('./setup.js');

describe('@getdescribe GET order by ID', () => {
  it(`@getit ${cases.scenario.getValidOrder.desc}`, async () => {

    const response = await api.getOrder(global.validOrderId);

    expect(response.status).to.equal(cases.scenario.getValidOrder.response);
    expect(response.body).to.have.property('id', global.validOrderId);
    expect(response.body).to.have.property('status');
    expect(response.body).to.have.property('complete');
  });

  it(`@getit ${cases.scenario.getInvalidOrder.desc}`, async () => {

    const response = await api.getOrder(global.fakePetId);

    expect(response.status).to.equal(cases.scenario.getInvalidOrder.response);
    expect(response.body).to.have.property('message'); // API should return an error message
  });
});