const { expect } = require('chai');
const api = require('../page-objects/api_post_order_request.js');
const cases = require('../test-cases/api_post_order_testcases.js');
const global = require('../helper/global.js');
const setup = require('./setup.js');

describe('@postdescribe POST Request /store/order', () => {
  it(`@postit ${cases.scenario.orderOK.desc}`, async () => {
    
    const response = await api.postOrder(global.orderData);

    // Assert status code
    expect(response.status).to.equal(cases.scenario.orderOK.response);

    // Assert response body structure
    expect(response.body).to.have.property('petId', global.orderData.petId);
    expect(response.body).to.have.property('status', 'placed');
  });
});
