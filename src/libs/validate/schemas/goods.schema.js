module.exports = {
  "type": "array",
  "items": {
    "properties": {
      "item": { "type": "string" },
      "type": { "type": "string" },
      "weight": { "type": "number" },
      "quantity": { "type": "number" },
      "pricePerKilo": {
        "type": "string",
        "pattern": /\$\d/
      },
      "pricePerItem": {
        "type": "string",
        "pattern": /\$\d/
      },
    },
    "anyOf": [
      { "required": ["item", "type", "weight", "pricePerKilo"] },
      { "required": ["item", "type", "quantity", "pricePerItem"] }
    ],
    "additionalProperties": false
  }
};
