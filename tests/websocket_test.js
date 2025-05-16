// require('dotenv').config();
// const WebSocket = require('ws');
// const { expect } = require('chai');

// describe('WebSocket Tests', () => {
//   it('Subscribe to Order Book Stream', (done) => {
//     const symbol = process.env.SYMBOL.toLowerCase();
//     const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@depth`);

//     ws.on('open', () => {
//       console.log('Connected to Order Book stream');
//     });

//     ws.on('message', (data) => {
//       const msg = JSON.parse(data);
//       expect(msg).to.have.property('bids');
//       expect(msg).to.have.property('asks');
//       ws.close();
//       done();
//     });

//     ws.on('error', (err) => done(err));
//   });

//   it('Subscribe to Trade Stream', (done) => {
//     const symbol = process.env.SYMBOL.toLowerCase();
//     const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);

//     ws.on('message', (data) => {
//       const msg = JSON.parse(data);
//       expect(msg).to.have.property('p'); // price
//       expect(msg).to.have.property('q'); // quantity
//       ws.close();
//       done();
//     });

//     ws.on('error', (err) => done(err));
//   });

//   it('Subscribe to User Data Stream', (done) => {
//     const listenKey = process.env.LISTEN_KEY;
//     if (!listenKey) return done(new Error('LISTEN_KEY is not set in environment variables'));

//     const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${listenKey}`);

//     ws.on('message', (data) => {
//       const msg = JSON.parse(data);
//       expect(msg).to.be.an('object');
//       expect(msg).to.have.property('e'); // event type
//       ws.close();
//       done();
//     });

//     ws.on('error', (err) => done(err));
//   });
// });