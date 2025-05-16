function logResponse(res) {
    console.log('==== Response Log ====');
    console.log('STATUS:', res.status);
    console.log('BODY:', JSON.stringify(res.body, null, 2));
    console.log('HEADERS:', res.headers);
    console.log('======================');
  }
  
  module.exports = { logResponse };
  