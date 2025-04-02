const global = require('./../helper/global.js');

const scenario = ({
  getOK: {
    desc: 'POST scenario created',
    response: global.response.ok,
  },
    badRequest: {
    desc: 'POST pet with missing data should return 400',
    response: global.response.badRequest,
  },
});

module.exports = {
  scenario,
};
