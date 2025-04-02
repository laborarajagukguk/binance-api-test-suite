const { expect } = require('chai');
const api = require('../page-objects/api_put_request.js');
const cases = require('../test-cases/api_put_testcases.js');
const global = require('../helper/global.js');
const testData = require('../helper/testData.js');
const setup = require('./setup.js');

describe('@putdescribe PUT request /pet', () => {
  it(`@putit ${cases.scenario.updateOK.desc}`, async () => {
    
    const response = await api.putAPI(global.updatedPet);

    // Assert status code
    expect(response.status).to.equal(cases.scenario.updateOK.response);

    // Assert response structure
    expect(response.body).to.have.property('id', testData.createdPetId);
    expect(response.body).to.have.property('name', global.updatedPet.name);
    expect(response.body).to.have.property('status', global.updatedPet.status);
  });
});

// describe('@putdescribe PUT update a non-existent pet', () => {
//   it(`@putit ${cases.scenario.updateNonExistentPet.desc}`, async () => {
    
//     const response = await api.putAPI(global.nonExistentPet);

//     expect(response.status).to.equal(cases.scenario.updateNonExistentPet.response);
//     expect(response.body).to.have.property('message'); // API should return an error message
//   });
// });