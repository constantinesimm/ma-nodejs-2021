const bodyRawProductSchema = {
  type: 'object',
  properties: {
    item: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    measure: {
      type: 'string',
    },
    measureValue: {
      type: 'number',
    },
    priceType: {
      type: 'string',
    },
    priceValue: {
      type: 'string',
    },
  },
  additionalProperties: false,
};

const bodyProductRequiredSchema = {
  type: 'array',
  items: {
    $id: 'productRequiredBody.json#/items',
    required: [
      'item',
      'type',
      'measure',
      'measureValue',
      'priceType',
      'priceValue',
    ],
    ...bodyRawProductSchema,
  },
};

module.exports = {
  bodyRawProductSchema,
  bodyProductRequiredSchema,
};
