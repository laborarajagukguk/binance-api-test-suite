const global = require('../helper/global.js');

const scenario = ({
  updateOK: {
    desc: 'PUT scenario updated',
    response: global.response.ok,
  },
});

module.exports = {
  scenario,
};