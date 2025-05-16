require('dotenv').config();
const WebSocket = require('ws');
const { expect } = require('chai');

describe('WebSocket Tests', () => {
  it('Subscribe to Order Book Stream', (done) => {
    const symbol = process.env.SYMBOL.toLowerCase();
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@depth`);

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
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);

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

});