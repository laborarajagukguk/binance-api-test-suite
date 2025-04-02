/* eslint no-unused-vars: off */
/* eslint prefer-const: off */

// Store created petId for all tests
let createdPetId = null;

let createdOrderId = null;

let addActivityLog = ({
  source: '',
  name: 'mochachaitest name',
  description: 'mochachaitest description',
  action: '',
  module_name: 'mochachaitest module name',
  data: '{"original":"{"name":"old_name"},{"new_value":"{"name":"new name"}"}',
});

module.exports = {
  createdPetId,
  addActivityLog,
  createdOrderId,
};
