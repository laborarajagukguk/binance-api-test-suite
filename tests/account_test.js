require('dotenv').config();
const { expect } = require('chai');
const api = require('../page-objects/account_api.js');
const cases = require('../test-cases/account_cases.js');
const { logResponse } = require('../helper/logger.js');
const accountSchema = require('./schemas/account.schema');

describe('Account API Tests', () => {
  it(`${cases.scenario.fetchAccountBalance.desc}`, async () => {
    const response = await api.fetchAccountBalance();
    // logResponse(response);

    // Basic response checks
    expect(response.status).to.equal(cases.scenario.fetchAccountBalance.response);
    expect(response.body).to.have.property('balances');
    expect(response.body.balances).to.be.an('array');
    expect(response.body).to.have.property('accountType');
    expect(response.body).to.have.property('canTrade').that.is.a('boolean');
    expect(response.body).to.have.property('canWithdraw').that.is.a('boolean');
    expect(response.body).to.have.property('canDeposit').that.is.a('boolean');
     
    // Check at least one balance object has required structure
    const sampleBalance = response.body.balances.find(b => parseFloat(b.free) > 0 || parseFloat(b.locked) > 0);
    if (sampleBalance) {
      expect(sampleBalance).to.have.all.keys('asset', 'free', 'locked');
      expect(sampleBalance.asset).to.be.a('string');
      expect(sampleBalance.free).to.match(/^[0-9]+(\.[0-9]+)?$/);
      expect(sampleBalance.locked).to.match(/^[0-9]+(\.[0-9]+)?$/);
    }

    // Validate against schema
    expect(response.body).to.be.jsonSchema(accountSchema);
  });

  it(`${cases.scenario.fetchAccountBalanceUnauthorized.desc}`, async () => {
    const response = await api.fetchAccountBalanceUnauthorized();
    // logResponse(response);
    
    expect(response.status).to.equal(cases.scenario.fetchAccountBalanceUnauthorized.response);
    expect(response.body).to.have.property('code').that.is.a('number');
    expect(response.body).to.have.property('msg').that.is.a('string');
    expect(response.body.msg).to.equal('API-key format invalid.');
  });
});