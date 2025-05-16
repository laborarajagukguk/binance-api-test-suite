require('dotenv').config();
const { expect } = require('chai');
const api = require('../page-objects/account_api.js');
const cases = require('../test-cases/account_cases.js');
const { logResponse } = require('../helper/logger.js');

describe('Account API Tests', () => {
  it(`${cases.scenario.fetchAccountBalance.desc}`, async () => {
    const response = await api.fetchAccountBalance();

    expect(response.status).to.equal(cases.scenario.fetchAccountBalance.response);
    expect(response.body).to.have.property('balances');
    expect(response.body.balances).to.be.an('array');
  });
});