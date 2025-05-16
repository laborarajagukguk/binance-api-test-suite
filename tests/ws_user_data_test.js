require('dotenv').config();

module.exports = {
  baseUrl: process.env.BASE_URL,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  symbol: 'btcusdt'
};