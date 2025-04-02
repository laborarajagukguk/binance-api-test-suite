/* eslint-disable no-underscore-dangle */

const { expect } = require('chai');
const api = require('../page-objects/api_post_request.js');

const cases = require('../test-cases/api_post_testcases.js');
const global = require('../helper/global.js');
const setup = require('./setup.js');

describe('@postdescribe POST request /pet', () => {
  it(`@postit ${cases.scenario.getOK.desc}`, async () => {
    
    const response = await api.postAPI(global.petData);

    // Assert status code
    expect(response.status).to.equal(cases.scenario.getOK.response);

    // Assert response type
    expect(response.type).to.equal('application/json');

    // Assert response body structure
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('id').that.is.a('number');
    expect(response.body).to.have.property('name').that.is.a('string');
    expect(response.body).to.have.property('status').that.is.oneOf(['available', 'pending', 'sold']);
  });
});

//still success to add petData with no mandatory field
// describe('@postdescribe POST request /pet', () => {
//   it(`@postit ${cases.scenario.badRequest.desc}`, async () => {
    
//     console.log(global.invalidPetData);
//     const response = await api.postAPI(global.invalidPetData);

//     // Assert status code
//     expect(response.status).to.equal(cases.scenario.badRequest.response);

//     console.log('Response:', response.body);
//   });
// });
