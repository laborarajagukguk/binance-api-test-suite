const global = require('./../helper/global.js');

const scenario = ({
  getOK: {
    desc: 'GET scenario OK',
    response: global.response.ok,
  },

  notFound: {
    desc: 'GET non-existent pet should return 404',
    response: global.response.notFound, // Expected 404 response
  },
});

module.exports = {
  scenario,
};
