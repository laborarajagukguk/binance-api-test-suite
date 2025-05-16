const { requestWithSignature } = require('../helper/request');

function placeLimitOrder(symbol, quantity, price) {
  const params = `symbol=${symbol}&side=BUY&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${price}`;
  return requestWithSignature('post', '/api/v3/order', params);
}

function fetchOpenOrders(symbol) {
  return requestWithSignature('get', '/api/v3/openOrders', `symbol=${symbol}`);
}

function fetchOpenOrdersAll() {
  return requestWithSignature('get', '/api/v3/openOrders');
}

function fetchTradeHistory(symbol) {
  return requestWithSignature('get', '/api/v3/myTrades', `symbol=${symbol}`);
}

function placeLimitOrderInvalidKey(symbol, quantity, price) {
  const params = `symbol=${symbol}&side=BUY&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${price}`;
  return requestWithSignature('post', '/api/v3/order', params, true);
}

module.exports = {
  placeLimitOrder,
  fetchOpenOrders,
  fetchOpenOrdersAll,
  fetchTradeHistory,
  placeLimitOrderInvalidKey,
};