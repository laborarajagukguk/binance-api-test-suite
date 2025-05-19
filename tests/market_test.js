require('dotenv').config();
const { expect } = require('chai');
const api = require('../page-objects/market_api.js');
const cases = require('../test-cases/market_cases.js');
const { logResponse } = require('../helper/logger.js');
const orderBookSchema = require('./schemas/orderBook.schema');

describe('Market API Tests', () => {
  it(`${cases.scenario.fetchOrderBook.desc}`, async () => {
    const response = await api.fetchOrderBook(process.env.SYMBOL);
    // logResponse(response);
    
    // Basic checks
    expect(response.status).to.equal(cases.scenario.fetchOrderBook.response);
    expect(response.body).to.have.property('lastUpdateId').that.is.a('number');
    expect(response.body).to.have.property('bids').that.is.an('array');
    expect(response.body).to.have.property('asks').that.is.an('array');

    // Validate bid/ask format (each item is [price, quantity])
    response.body.bids.forEach(bid => {
      expect(bid).to.be.an('array').with.lengthOf(2);
      expect(bid[0]).to.match(/^[0-9]+(\.[0-9]+)?$/); // price
      expect(bid[1]).to.match(/^[0-9]+(\.[0-9]+)?$/); // quantity
    });

    response.body.asks.forEach(ask => {
      expect(ask).to.be.an('array').with.lengthOf(2);
      expect(ask[0]).to.match(/^[0-9]+(\.[0-9]+)?$/); // price
      expect(ask[1]).to.match(/^[0-9]+(\.[0-9]+)?$/); // quantity
    });

    // Check ask > bid prices logically
    if (response.body.bids.length > 0 && response.body.asks.length > 0) {
      const highestBid = parseFloat(response.body.bids[0][0]);
      const lowestAsk = parseFloat(response.body.asks[0][0]);
      expect(highestBid).to.be.below(lowestAsk);
    }

    // Schema validation
    expect(response.body).to.be.jsonSchema(orderBookSchema);
  });

  it(`${cases.scenario.fetchOrderBookInvalidSymbol.desc}`, async () => {
    const response = await api.fetchOrderBook('INVALID');

    expect(response.status).to.equal(cases.scenario.fetchOrderBookInvalidSymbol.response);
    expect(response.body).to.have.property('code').that.is.a('number');
    expect(response.body).to.have.property('msg').that.is.a('string');
    expect(response.body.msg).to.equal('Invalid symbol.');
  });

  it(`${cases.scenario.fetchOrderBookMissingSymbol.desc}`, async () => {
    // Call the endpoint without symbol param
    const response = await api.fetchOrderBook('');
    
    expect(response.status).to.equal(cases.scenario.fetchOrderBookMissingSymbol.response);
    expect(response.body).to.have.property('code').that.is.a('number');
    expect(response.body).to.have.property('msg').that.is.a('string');
    expect(response.body.msg).to.equal(`Parameter 'symbol' was empty.`);
  });
});