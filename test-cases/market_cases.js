const global = require('../helper/global.js');

const scenario = {
  fetchOrderBook: {
    desc: 'Fetch Order Book - Valid Symbol',
    response: global.response.ok,
  }
};

module.exports = {
  scenario
};