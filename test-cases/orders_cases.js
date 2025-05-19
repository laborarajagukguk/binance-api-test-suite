const global = require('../helper/global.js');
const { placeLimitOrder } = require('../page-objects/orders_api.js');

const scenario = {
  placeLimitOrder: {
    desc: 'Place Limit Order - Valid parameters',
    response: global.response.ok,
  },
  fetchOpenOrders: {
    desc: 'Fetch Open Orders - Valid Symbol',
    response: global.response.ok,
  },
  fetchTradeHistory: {
    desc: 'Fetch Trade History - Valid Symbol',
    response: global.response.ok,
  },
  placeLimitOrderInvalidKey: {
    desc: 'Place limit order - Invalid API key should return 401',
    response: global.response.unauthorized,
  },
  placeLimitOrderMissingfQty: {
    desc: 'Place limit order - Missing quantity should return 400',
    response: global.response.badRequest,
  },
  fetchOpenOrdersNoSymbol: {
    desc: 'Fetch open orders - Without symbol should return 200 with array',
    response: global.response.ok,
  },
  fetchTradeHistoryNoSymbol: {
    desc: 'Fetch trade history - Invalid or empty symbol returns 400',
    response: global.response.badRequest,
  },
};

module.exports = {
  scenario
};