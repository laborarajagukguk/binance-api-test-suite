const { expect } = require('chai');
const postAPI = require('../page-objects/api_post_request.js');
const deleteAPI = require('../page-objects/api_delete_request.js');
const global = require('../helper/global.js');
const testData = require('../helper/testData.js');

before(async () => {
    console.log('Creating a pet before tests...');
    const response = await postAPI.postAPI(global.petData);
    console.log('Pet creation response:', response.body); // ✅ Log pet creation details
    expect(response.status).to.equal(global.response.ok);
  
    // Store the pet ID
    testData.createdPetId = response.body.id;
    console.log(`Pet created with ID: ${testData.createdPetId}`);
  });

after(async () => {
  console.log('Deleting the pet after tests...');
  const response = await deleteAPI.deleteAPI(testData.createdPetId);
  expect(response.status).to.equal(global.response.ok);
  console.log(`Pet deleted with ID: ${testData.createdPetId}`);
});