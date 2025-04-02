const { expect } = require('chai');
const api = require('../page-objects/api_get_request.js');
const cases = require('../test-cases/api_get_testcases.js');
const global = require('../helper/global.js');
const testData = require('../helper/testData.js');
const setup = require('./setup.js');

describe('@getdescribe GET Request /pet', () => {
  it(`@getit ${cases.scenario.getOK.desc}`, async () => {
    
    const response = await api.getAPI(global.petData.id);

    // Assert status code
    expect(response.status).to.equal(cases.scenario.getOK.response);

    // Assert response type
    expect(response.type).to.equal('application/json');

    // Assert response body structure
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('id'),global.petData.id;
    expect(response.body).to.have.property('name', global.petData.name);
    expect(response.body).to.have.property('status', global.petData.status);
  });
});

describe('@getdescribe GET Request for non-existent pet', () => {
  it(`@getit ${cases.scenario.notFound.desc}`, async () => {

    const response = await api.getAPI(global.fakePetIdfakePetId);
    
    // Assert status code
    expect(response.status).to.equal(cases.scenario.notFound.response);

    // Assert response body structure
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message'), "Pet not found";
  });
});

describe('@getdescribe GET pets by status', () => {
  it(`@getit ${cases.scenario.getOK.desc}`, async () => {
    const response = await api.getByStatus('available');
    
    expect(response.status).to.equal(cases.scenario.getOK.response);
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.be.greaterThan(0);
    response.body.forEach((pet) => {
      expect(pet).to.have.property('status', 'available');
    });
  });
});

// describe('@getdescribe GET pets by invalid status', () => {
//   it(`@getit ${cases.scenario.getInvalidStatus.desc}`, async () => {
//     const response = await api.getByStatus("invalidStatus");

//     expect(response.status).to.equal(cases.scenario.getInvalidStatus.response);
//   });
// });

