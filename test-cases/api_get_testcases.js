const global = require('./../helper/global.js');

const scenario = ({
  getOK: {
    desc: 'GET scenario OK',
    response: global.response.ok,
  },

  notFound: {
    desc: 'GET non-existent pet should return 404',
    response: global.response.notFound,
  },

  getInvalidStatus: {
    desc: 'GET pets by invalid status',
    response: global.response.badRequest,
  },

});

module.exports = {
  scenario,
};
