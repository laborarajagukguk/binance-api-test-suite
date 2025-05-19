module.exports = {
    type: 'array',
    items: {
      type: 'object',
      required: ['symbol', 'orderId', 'price', 'origQty', 'executedQty'],
      properties: {
        symbol: { type: 'string' },
        orderId: { type: 'number' },
        price: { type: 'string' },
        origQty: { type: 'string' },
        executedQty: { type: 'string' }
      }
    }
  };