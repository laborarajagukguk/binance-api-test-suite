const global = require('../helper/global.js');

const scenario = ({
  deleteOK: {
    desc: 'DELETE scenario deleted',
    response: global.response.ok,
  },

  notFound: {
    desc: 'DELETE non-existent pet should return 404',
    response: global.response.notFound, // Expected 404 response
  },
});

module.exports = {
  scenario,
};