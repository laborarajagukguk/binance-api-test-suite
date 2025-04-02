const global = require('./../helper/global.js');

const scenario = ({
  deleteValidOrder: {
    desc: 'DELETE order by valid order ID',
    response: global.response.ok,
  },
  deleteInvalidOrder: {
    desc: 'DELETE order with non-existent order ID',
    response: global.response.notFound,
  },
});

module.exports = {
  scenario,
};