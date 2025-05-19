const global = require('../helper/global.js');

const scenario = {
  fetchAccountBalance: {
    desc: 'Fetch Account Balance - Valid API key',
    response: global.response.ok,
  },
  fetchAccountBalanceUnauthorized: {
    desc: 'Unauthorized account balance request returns 401',
    response: global.response.unauthorized,
  },
  fetchAccountBalanceExpiredTime: {
    desc: 'Signed request without timestamp should return 400',
    response: global.response.badRequest,
  },
  fetchAccountBalanceMalformedSignature: {
    desc: 'Account balance with malformed signature should return 400',
    response: global.response.badRequest,
  }
};

module.exports = {
  scenario
};