const global = require('../helper/global.js');

const scenario = {
  orderOK: {
    desc: 'POST pet order should return 200 with correct details',
    response: global.response.ok,
  },
};

module.exports = {
  scenario,
};