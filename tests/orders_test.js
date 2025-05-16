require('dotenv').config();
const { expect } = require('chai');
const api = require('../page-objects/orders_api.js');
const cases = require('../test-cases/orders_cases.js');
const global = require('../helper/global.js');
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

  it('Place limit order - Invalid API key should return 401', async () => {
    // Make request with invalid API key header
    const response = await api.placeLimitOrderInvalidKey(process.env.SYMBOL, 0.001, 30000);

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('code');
    expect(response.body).to.have.property('msg', 'API-key format invalid.');
  });

  it('Place limit order - Missing quantity should return 400', async () => {
    const response = await api.placeLimitOrder(process.env.SYMBOL, 30000);

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('code');
  });

  it('Fetch open orders - Without symbol should return 200 with array', async () => {
    const response = await api.fetchOpenOrdersAll();

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('Fetch trade history - Invalid or empty symbol returns 400', async () => {
    const response = await api.fetchTradeHistoryWithSymbol('INVALID');
   
    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('code');
    expect(response.body).to.have.property('msg', 'Invalid symbol.');
  });
});