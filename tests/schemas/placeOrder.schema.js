module.exports = {
    "title": "Place Limit Order Response Schema",
    "type": "object",
    "required": [
      "symbol",
      "orderId",
      "orderListId",
      "clientOrderId",
      "transactTime",
      "price",
      "origQty",
      "executedQty",
      "origQuoteOrderQty",
      "cummulativeQuoteQty",
      "status",
      "timeInForce",
      "type",
      "side",
      "workingTime",
      "fills",
      "selfTradePreventionMode"
    ],
    "properties": {
      "symbol": { "type": "string" },
      "orderId": { "type": "integer" },
      "orderListId": { "type": "integer" },
      "clientOrderId": { "type": "string" },
      "transactTime": { "type": "integer" },
      "price": { "type": "string" },
      "origQty": { "type": "string" },
      "executedQty": { "type": "string" },
      "origQuoteOrderQty": { "type": "string" },
      "cummulativeQuoteQty": { "type": "string" },
      "status": { "type": "string" },
      "timeInForce": { "type": "string" },
      "type": { "type": "string" },
      "side": { "type": "string" },
      "workingTime": { "type": "integer" },
      "fills": {
        "type": "array",
        "items": { "type": "object" }
      },
      "selfTradePreventionMode": { "type": "string" }
    }
  };