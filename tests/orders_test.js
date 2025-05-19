require('dotenv').config();
const { expect } = require('chai');
const api = require('../page-objects/orders_api.js');
const cases = require('../test-cases/orders_cases.js');
const global = require('../helper/global.js');
const { logResponse } = require('../helper/logger.js');
const placeOrderSchema = require('./schemas/placeOrder.schema');
const openOrderSchema = require('./schemas/openOrders.schema');
require('./setup');


describe('Orders API Tests', () => {
  it(`${cases.scenario.placeLimitOrder.desc}`, async () => {
    const response = await api.placeLimitOrder(process.env.SYMBOL, 0.001, 30000);
    // logResponse(response);
    expect(response.status).to.equal(cases.scenario.placeLimitOrder.response);
    expect(response.body).to.have.property('symbol').that.equals(process.env.SYMBOL);
    expect(response.body).to.have.property('orderId').that.is.a('number');
    expect(response.body).to.have.property('status').that.is.a('string');
    expect(response.body).to.have.property('type').that.equals('LIMIT');
    expect(response.body).to.have.property('price').that.matches(/^[0-9]+(\.[0-9]+)?$/);
    expect(response.body).to.have.property('origQty').that.matches(/^[0-9]+(\.[0-9]+)?$/);
    expect(response.body).to.be.jsonSchema(placeOrderSchema);
  });

  it(`${cases.scenario.fetchOpenOrders.desc}`, async () => {
    const response = await api.fetchOpenOrders(process.env.SYMBOL);

    expect(response.status).to.equal(cases.scenario.fetchOpenOrders.response);
    expect(response.body).to.be.an('array');

    response.body.forEach(order => {
      expect(order).to.have.property('symbol').that.equals(process.env.SYMBOL);
      expect(order).to.have.property('orderId').that.is.a('number');
      expect(order).to.have.property('price').that.matches(/^[0-9]+(\.[0-9]+)?$/);
      expect(order).to.have.property('origQty').that.matches(/^[0-9]+(\.[0-9]+)?$/);
    });

    expect(response.body).to.be.jsonSchema(openOrderSchema);
  });

  it(`${cases.scenario.fetchTradeHistory.desc}`, async () => {
    const response = await api.fetchTradeHistory(process.env.SYMBOL);
    // logResponse(response);

    expect(response.status).to.equal(cases.scenario.fetchTradeHistory.response);
    expect(response.body).to.be.an('array');

    response.body.forEach(trade => {
      expect(trade).to.have.property('symbol').that.equals(process.env.SYMBOL);
      expect(trade).to.have.property('id').that.is.a('number');
      expect(trade).to.have.property('orderId').that.is.a('number');
      expect(trade).to.have.property('price').that.matches(/^[0-9]+(\.[0-9]+)?$/);
      expect(trade).to.have.property('qty').that.matches(/^[0-9]+(\.[0-9]+)?$/);
      expect(trade).to.have.property('quoteQty').that.matches(/^[0-9]+(\.[0-9]+)?$/);
      expect(trade).to.have.property('commission').that.matches(/^[0-9]+(\.[0-9]+)?$/);
      expect(trade).to.have.property('commissionAsset').that.is.a('string');
      expect(trade).to.have.property('time').that.is.a('number');
      expect(trade).to.have.property('isBuyer').that.is.a('boolean');
      expect(trade).to.have.property('isMaker').that.is.a('boolean');
      expect(trade).to.have.property('isBestMatch').that.is.a('boolean');
    });
  });

  it(`${cases.scenario.placeLimitOrderInvalidKey.desc}`, async () => {
    // Make request with invalid API key header
    const response = await api.placeLimitOrderInvalidKey(process.env.SYMBOL, 0.001, 30000);

    expect(response.status).to.equal(cases.scenario.placeLimitOrderInvalidKey.response);
    expect(response.body).to.have.property('code').that.is.a('number');
    expect(response.body).to.have.property('msg').that.equals('API-key format invalid.');
  });

  it(`${cases.scenario.placeLimitOrderMissingfQty.desc}`, async () => {
    const response = await api.placeLimitOrder(process.env.SYMBOL, 30000);

    expect(response.status).to.equal(cases.scenario.placeLimitOrderMissingfQty.response);
    expect(response.body).to.have.property('code').that.is.a('number');
    expect(response.body).to.have.property('msg').that.is.a('string');
  });

  it(`${cases.scenario.fetchOpenOrdersNoSymbol.desc}`, async () => {
    const response = await api.fetchOpenOrdersAll();

    expect(response.status).to.equal(cases.scenario.fetchOpenOrdersNoSymbol.response);
    expect(response.body).to.be.an('array');
  });

  it(`${cases.scenario.fetchTradeHistoryNoSymbol.desc}`, async () => {
    const response = await api.fetchOpenOrders("INVALID");
   
    expect(response.status).to.equal(cases.scenario.fetchTradeHistoryNoSymbol.response);
    expect(response.body).to.have.property('code').that.is.a('number');
    expect(response.body).to.have.property('msg').that.equals('Invalid symbol.');
  });
});