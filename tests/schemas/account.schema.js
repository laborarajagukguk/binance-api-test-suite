module.exports = {
    "title": "Account Info Schema",
    "type": "object",
    "required": ["balances", "permissions", "uid"],
    "properties": {
      "balances": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["asset", "free", "locked"],
          "properties": {
            "asset": { "type": "string" },
            "free": { "type": "string" },
            "locked": { "type": "string" }
          }
        }
      },
      "permissions": {
        "type": "array",
        "items": { "type": "string" }
      },
      "uid": {
        "type": "integer"
      }
    }
  };