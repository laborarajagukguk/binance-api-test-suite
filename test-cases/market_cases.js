const global = require('../helper/global.js');

const scenario = {
  fetchOrderBook: {
    desc: 'Fetch Order Book - Valid Symbol',
    response: global.response.ok,
  },
  fetchOrderBookInvalidSymbol: {
    desc: 'Fetch order book - Invalid symbol should return 400',
    response: global.response.badRequest,
  },
  fetchOrderBookMissingSymbol: {
    desc: 'Fetch order book - Missing symbol parameter should return 400',
    response: global.response.badRequest,
  }
};

module.exports = {
  scenario
};