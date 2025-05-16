const global = require('../helper/global.js');

const scenario = {
  fetchAccountBalance: {
    desc: 'Fetch Account Balance - Valid API key',
    response: global.response.ok,
  }
};

module.exports = {
  scenario
};