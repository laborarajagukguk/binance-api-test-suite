# README #

### What is this repository for? ###

This is POC repo for API testing using Mocha-Chai

### How do I get set up? ###

**1.** Assume that you have node installed.

**2.** Clone this repo

**3.** Access the folder

```sh
$ cp env.sample .env
```

**6.** Install all dependencies:
```sh
$ npm install
$ npm install ws
$ npm install chai-json-schema --save-dev
```

**7.** Run File Mocha API test:
```sh
$ npx mocha tests/orders_test.js
$ npx mocha tests/account_test.js
$ npx mocha tests/market_test.js
```

**8.** Run All Mocha API test:
```sh
$ npm test
```

