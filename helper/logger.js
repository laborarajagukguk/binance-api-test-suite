const chalk = require('chalk');

const log = (msg) => console.log(chalk.blue('[INFO]'), msg);
const error = (msg) => console.error(chalk.red('[ERROR]'), msg);

function logResponse(res) {
    console.log('==== Response Log ====');
    console.log('STATUS:', res.status);
    console.log('BODY:', JSON.stringify(res.body, null, 2));
    console.log('HEADERS:', res.headers);
    console.log('======================');
  }


  module.exports = { 
    logResponse, 
    log, 
    error 
};
  