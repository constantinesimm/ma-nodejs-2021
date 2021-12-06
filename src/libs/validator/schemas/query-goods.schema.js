module.exports = {
  type: 'object',
  anyOf: [
    {
      $id: 'weightItem.json',
      type: 'object',
      properties: {
        item: {
          $id: 'weightItem.json#/properties/item',
          type: 'string',
        },
        type: {
          $id: 'weightItem.json#/properties/type',
          type: 'string',
        },
        weight: {
          $id: 'weightItem.json#/properties/weight',
          oneOf: [{type: 'string', regexp: /\d/}, {type: 'number'}],
        },
        pricePerKilo: {
          $id: 'weightItem.json#/properties/pricePerKilo',
          type: 'string',
          regexp: /\$\d/,
        },
      },
    },
    {
      $id: 'quantityItem.json',
      type: 'object',
      properties: {
        item: {
          $id: 'quantityItem.json#/properties/item',
          type: 'string',
        },
        type: {
          $id: 'quantityItem.json#/properties/type',
          type: 'string',
        },
        quantity: {
          $id: 'quantityItem.json#/properties/quantity',
          oneOf: [{type: 'string', regexp: /\d/}, {type: 'number'}],
        },
        pricePerItem: {
          $id: 'quantityItem.json#/properties/pricePerItem',
          type: 'string',
          regexp: /\$\d/,
        },
      },
    },
  ],
};
