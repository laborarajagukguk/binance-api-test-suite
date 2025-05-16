require('dotenv').config();
const { expect } = require('chai');
const api = require('../page-objects/orders_api.js');
const cases = require('../test-cases/orders_cases.js');
const { logResponse } = require('../helper/logger.js');

describe('Orders API Tests', () => {
  it(`${cases.scenario.placeLimitOrder.desc}`, async () => {
    const response = await api.placeLimitOrder(process.env.SYMBOL, 0.001, 30000);

    expect(response.status).to.equal(cases.scenario.placeLimitOrder.response);
    expect(response.body).to.have.property('orderId');
    expect(response.body).to.have.property('status');
  });

  it(`${cases.scenario.fetchOpenOrders.desc}`, async () => {
    const response = await api.fetchOpenOrders(process.env.SYMBOL);

    expect(response.status).to.equal(cases.scenario.fetchOpenOrders.response);
    expect(response.body).to.be.an('array');
  });

  it(`${cases.scenario.fetchTradeHistory.desc}`, async () => {
    const response = await api.fetchTradeHistory(process.env.SYMBOL);

    expect(response.status).to.equal(cases.scenario.fetchTradeHistory.response);
    expect(response.body).to.be.an('array');
  });
});