const global = require('./../helper/global.js');

const scenario = ({
  getValidOrder: {
    desc: 'GET order by valid order ID',
    response: global.response.ok,
  },
  getInvalidOrder: {
    desc: 'GET order with non-existent order ID',
    response: global.response.notFound,
  },
});

module.exports = {
  scenario,
};