const randomstring = require('randomstring');
const randomNumber = () => Math.floor(Math.random() * 1000000) + 1;

const firstName = randomstring.generate(7);
const lastName = randomstring.generate(7);

const response = {
  ok: 200,
  created: 201, // for created success
  accepted: 202,
  noContent: 204,
  badRequest: 400, // for blank or no key sent
  unauthorized: 401, // for no login
  forbidden: 403,
  invalidAuth: 403,
  notFound: 404,
  internalServerError: 500,
};

const codes = {
  unauthorized: 'UNAUTHORIZED', // 401
  invalidToken: 'INVALID_TOKEN', // 403
  badRequest: 'BadRequest', // 400
  notFound: 'NotFound', // 404
  forbidden: 'Forbidden', // 403
};

// petData with random ID each run
const petData = {
  id: randomNumber(),
  name: 'Fluffy',
  status: 'available'
};

const orderData = {
  petId: 12345,
  quantity: 1,
  shipDate: new Date().toISOString(),
  status: 'placed',
  complete: true,
};

const updatedPet = { 
  ...petData,
  name: 'Fluffy', 
  status: 'available' };

const nonExistentPet = { 
  ...petData,
  id: 99999999,
  name: 'Fluffy', 
  status: 'available' };

// petData with Missing required fields
const invalidPetData = {
  name: 'Fluffy',
}

const fakePetId = 99999999; // A pet ID that should not exist

const validOrderId = 10;


module.exports = {
  response,
  codes,
  petData,
  orderData,
  updatedPet,
  invalidPetData,
  fakePetId,
  nonExistentPet,
  validOrderId
};
