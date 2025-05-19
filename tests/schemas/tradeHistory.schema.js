module.exports = {
    type: "array",
    items: {
      type: "object",
      properties: {
        symbol: {
          type: "string",
          example: "BTCUSDT"
        },
        id: {
          type: "integer",
          example: 1495582
        },
        orderId: {
          type: "integer",
          example: 2676437
        },
        orderListId: {
          type: "integer",
          example: -1
        },
        price: {
          type: "string",
          pattern: "^[0-9]+(\\.[0-9]+)?$",
          example: "30000.00000000"
        },
        qty: {
          type: "string",
          pattern: "^[0-9]+(\\.[0-9]+)?$",
          example: "0.00100000"
        },
        quoteQty: {
          type: "string",
          pattern: "^[0-9]+(\\.[0-9]+)?$",
          example: "30.00000000"
        },
        commission: {
          type: "string",
          pattern: "^[0-9]+(\\.[0-9]+)?$",
          example: "0.00000000"
        },
        commissionAsset: {
          type: "string",
          example: "BTC"
        },
        time: {
          type: "integer",
          description: "Timestamp in milliseconds",
          example: 1747477187887
        },
        isBuyer: {
          type: "boolean",
          example: true
        },
        isMaker: {
          type: "boolean",
          example: true
        },
        isBestMatch: {
          type: "boolean",
          example: true
        }
      },
      required: [
        "symbol",
        "id",
        "orderId",
        "orderListId",
        "price",
        "qty",
        "quoteQty",
        "commission",
        "commissionAsset",
        "time",
        "isBuyer",
        "isMaker",
        "isBestMatch"
      ],
      additionalProperties: false
    }
  };