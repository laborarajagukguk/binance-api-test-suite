const global = require('../helper/global.js');

const scenario = ({
  updateOK: {
    desc: 'PUT scenario updated',
    response: global.response.ok,
  },
  updateNonExistentPet: {
    desc: 'PUT update a pet that does not exist',
    response: global.response.notFound,
  },
});

module.exports = {
  scenario,
};