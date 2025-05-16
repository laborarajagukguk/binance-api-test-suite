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

  it('Fetch order book - Invalid symbol should return 400', async () => {
    const response = await api.fetchOrderBook('INVALID');

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('code');
    expect(response.body).to.have.property('msg', 'Invalid symbol.');
  });

  it('Fetch order book - Missing symbol parameter should return 400', async () => {
    // Call the endpoint without symbol param
    const response = await api.fetchOrderBook('');
    
    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('code');
    expect(response.body).to.have.property('msg', `Parameter 'symbol' was empty.`);
  });
});