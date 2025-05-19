const { expect } = require('chai');
const chai = require('chai');
const chaiJsonSchema = require('chai-json-schema');

chai.use(chaiJsonSchema);
global.expect = chai.expect;