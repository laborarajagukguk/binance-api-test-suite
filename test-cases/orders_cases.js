const global = require('../helper/global.js');

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
};

module.exports = {
  scenario
};