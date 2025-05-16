const { requestWithSignature, requestWithoutKey } = require('../helper/request');

function fetchAccountBalance() {
  return requestWithSignature('get', '/api/v3/account');
}

function fetchAccountBalanceUnauthorized() {
  return requestWithoutKey('get', '/api/v3/account');
}

module.exports = {
  fetchAccountBalance,
  fetchAccountBalanceUnauthorized,
};