require('dotenv').config();
const WebSocket = require('ws');
const { expect } = require('chai');
const axios = require('axios');

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

  it('Subscribe to User Data Stream', async function () {
    this.timeout(10000);

    // Step 1: Get listenKey
    const res = await axios.post(
      'https://testnet.binance.vision/api/v3/userDataStream',
      null,
      {
        headers: {
          'X-MBX-APIKEY': process.env.API_KEY
        }
      }
    );

    const listenKey = res.data.listenKey;
    expect(listenKey).to.be.a('string');

    // Step 2: Connect WebSocket
    const ws = new WebSocket(`${process.env.WS_BASE_URL}/ws/${listenKey}?timeUnit=MICROSECOND`);

    let messageReceived = false;

    await new Promise((resolve, reject) => {
      ws.on('message', (data) => {
        if (messageReceived) return;
        messageReceived = true;

        try {
          const msg = JSON.parse(data);
          expect(msg).to.be.an('object');
          console.log('📨 Message:', msg);
          ws.close();
          resolve();
        } catch (err) {
          reject(err);
        }
      });

      ws.on('error', reject);
      ws.on('close', () => {
        if (!messageReceived) reject(new Error('WebSocket closed before message received'));
      });

      // Step 3: Place a small test order (MARKET buy BTCUSDT)
      setTimeout(async () => {
        try {
          const timestamp = Date.now();
          const params = {
            symbol: 'BTCUSDT',
            side: 'BUY',
            type: 'MARKET',
            quantity: '0.0001',
            timestamp
          };
          const query = signParams(params, process.env.API_SECRET);

          await axios.post(
            `https://api.binance.com/api/v3/order?${query}`,
            null,
            { headers: { 'X-MBX-APIKEY': process.env.API_KEY } }
          );
        } catch (err) {
          reject(new Error(`Failed to place test order: ${err.response?.data?.msg || err.message}`));
        }
      }, 1000);

      // Timeout fallback
      setTimeout(() => {
        if (!messageReceived) {
          ws.close();
          reject(new Error('No message received'));
        }
      }, 10000);
    });
  });

//   it('Subscribe to User Data Stream', (done) => {
//     const listenKey = process.env.LISTEN_KEY;
//     if (!listenKey) return done(new Error('LISTEN_KEY is not set in environment variables'));

//     const ws = new WebSocket(`${process.env.WS_BASE_URL}/ws/${listenKey}`);

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


});
