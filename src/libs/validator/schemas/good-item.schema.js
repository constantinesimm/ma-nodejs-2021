const weightSchema = {
  id: 'weightItem',
  type: 'object',
  properties: {
    item: {type: 'string'},
    type: {type: 'string'},
    weight: {type: 'number'},
    pricePerKilo: {
      type: 'string',
      pattern: /\$\d/,
    },
    required: ['item', 'type', 'weight', 'pricePerKilo'],
  },
  additionalProperties: false,
};
const quantitySchema = {
  id: 'quantityItem',
  type: 'object',
  properties: {
    item: {type: 'string'},
    type: {type: 'string'},
    quantity: {type: 'number'},
    pricePerItem: {
      type: 'string',
      pattern: /\$\d/,
    },
    required: ['item', 'type', 'quantity', 'pricePerItem'],
  },
  additionalProperties: false,
};

module.exports = {
  weightSchema,
  quantitySchema,
};
