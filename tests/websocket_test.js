require('dotenv').config();
const WebSocket = require('ws');
const { expect } = require('chai');

describe('WebSocket Tests', () => {
  it('Subscribe to Order Book Stream', (done) => {
    const symbol = process.env.SYMBOL.toLowerCase();
    const ws = new WebSocket(`${process.env.WS_BASE_URL}/ws/${symbol}@depth`);

    let doneCalled = false;

    ws.on('open', () => {
      console.log('Connected to Order Book stream');
    });

    ws.on('message', (data) => {
      if (doneCalled) return;
      try {
        const msg = JSON.parse(data);
        expect(msg).to.have.property('b');
        expect(msg).to.have.property('a');
        expect(msg.b).to.be.an('array');
        expect(msg.a).to.be.an('array');
        doneCalled = true;
        done();
        ws.close();
      } catch (err) {
        doneCalled = true;
        done(err);
        ws.close();
      }
    });

    ws.on('error', (err) => {
      if (doneCalled) return;
      doneCalled = true;
      done(err);
    });
  });

  it('Subscribe to Trade Stream', (done) => {
    const symbol = process.env.SYMBOL.toLowerCase();
    const ws = new WebSocket(`${process.env.WS_BASE_URL}/ws/${symbol}@trade`);

    let doneCalled = false;

    ws.on('message', (data) => {
      if (doneCalled) return;
      try {
        const msg = JSON.parse(data);
        expect(msg).to.have.property('p'); // price
        expect(msg).to.have.property('q'); // quantity
        doneCalled = true;
        done();
        ws.close();
      } catch (err) {
        doneCalled = true;
        done(err);
        ws.close();
      }
    });

    ws.on('error', (err) => {
      if (doneCalled) return;
      doneCalled = true;
      done(err);
    });
  });

//   it('Subscribe to User Data Stream', (done) => {
//     const listenKey = process.env.LISTEN_KEY;
//     if (!listenKey) return done(new Error('LISTEN_KEY is not set in environment variables'));

//     const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${listenKey}`);

//     let doneCalled = false;

//     ws.on('message', (data) => {
//       if (doneCalled) return;
//       try {
//         const msg = JSON.parse(data);
//         expect(msg).to.be.an('object');
//         expect(msg).to.have.property('e'); // event type
//         doneCalled = true;
//         done();
//         ws.close();
//       } catch (err) {
//         doneCalled = true;
//         done(err);
//         ws.close();
//       }
//     });

//     ws.on('error', (err) => {
//       if (doneCalled) return;
//       doneCalled = true;
//       done(err);
//     });
//   });

//   it('WS-004: Invalid or expired listenKey should error or disconnect', (done) => {
//     const invalidListenKey = 'INVALID_LISTEN_KEY';
//     const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${invalidListenKey}`);

//     let closed = false;
//     let doneCalled = false;

//     ws.on('error', (err) => {
//       if (doneCalled) return;
//       expect(err).to.exist;
//       doneCalled = true;
//       done();
//     });

//     ws.on('close', () => {
//       if (doneCalled) return;
//       closed = true;
//       doneCalled = true;
//       done();
//     });

//     setTimeout(() => {
//       if (!doneCalled) {
//         doneCalled = true;
//         done(new Error('No error or close event on invalid listenKey within timeout'));
//       }
//     }, 5000);
//   });
});