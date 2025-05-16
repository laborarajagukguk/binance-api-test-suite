require('dotenv').config();
const { expect } = require('chai');
const api = require('../page-objects/market_api.js');
const cases = require('../test-cases/market_cases.js');
const { logResponse } = require('../helper/logger.js');

describe('Market API Tests', () => {
  it(`${cases.scenario.fetchOrderBook.desc}`, async () => {
    const response = await api.fetchOrderBook(process.env.SYMBOL);

    expect(response.status).to.equal(cases.scenario.fetchOrderBook.response);
    expect(response.body).to.have.property('bids');
    expect(response.body).to.have.property('asks');
  });
});