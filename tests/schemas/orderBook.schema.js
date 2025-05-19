module.exports = {
    "title": "Order Book Schema",
    "type": "object",
    "required": ["lastUpdateId", "bids", "asks"],
    "properties": {
      "lastUpdateId": {
        "type": "integer"
      },
      "bids": {
        "type": "array",
        "items": {
          "type": "array",
          "minItems": 2,
          "maxItems": 2,
          "items": [
            { "type": "string" },   // price as string
            { "type": "string" }    // quantity as string
          ]
        }
      },
      "asks": {
        "type": "array",
        "items": {
          "type": "array",
          "minItems": 2,
          "maxItems": 2,
          "items": [
            { "type": "string" },   // price as string
            { "type": "string" }    // quantity as string
          ]
        }
      }
    }
  };