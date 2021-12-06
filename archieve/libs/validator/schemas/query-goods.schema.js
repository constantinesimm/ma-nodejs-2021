module.exports = {
  type: 'object',
  properties: {
    item: {type: 'string'},
    type: {type: 'string'},
    weight: {
      oneOf: [{type: 'string', pattern: /\d/}, {type: 'number'}],
    },
    quantity: {
      oneOf: [{type: 'string', pattern: /\d/}, {type: 'number'}],
    },
    pricePerKilo: {type: 'string', pattern: /\$\d/},
    pricePerItem: {},
  },
  additionalProperties: false,
};
