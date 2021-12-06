module.exports = {
  type: 'array',
  items: {
    $id: 'goodsArr.json#/items',
    anyOf: [
      {
        $id: 'goodsArr.json#/items/anyOf/0',
        type: 'object',
        required: ['item', 'type', 'weight', 'pricePerKilo'],
        properties: {
          item: {
            $id: 'goodsArr.json#/items/anyOf/0/properties/item',
            type: 'string',
          },
          type: {
            $id: 'goodsArr.json#/items/anyOf/0/properties/type',
            type: 'string',
          },
          weight: {
            $id: 'goodsArr.json#/items/anyOf/0/properties/weight',
            type: 'integer',
          },
          pricePerKilo: {
            $id: 'goodsArr.json#/items/anyOf/0/properties/pricePerKilo',
            type: 'string',
          },
        },
      },
      {
        $id: 'goodsArr.json#/items/anyOf/1',
        type: 'object',
        required: ['item', 'type', 'quantity', 'pricePerItem'],
        properties: {
          item: {
            $id: 'goodsArr.json#/items/anyOf/1/properties/item',
            type: 'string',
          },
          type: {
            $id: 'goodsArr.json#/items/anyOf/1/properties/type',
            type: 'string',
          },
          quantity: {
            $id: 'goodsArr.json#/items/anyOf/1/properties/quantity',
            type: 'integer',
          },
          pricePerItem: {
            $id: 'goodsArr.json#/items/anyOf/1/properties/pricePerItem',
            type: 'string',
          },
        },
      },
    ],
  },
};
