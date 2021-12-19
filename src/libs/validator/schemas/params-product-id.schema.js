module.exports = {
  type: 'object',
  properties: {
    productId: {
      type: 'string',
      format: 'uuid',
    },
  },
  required: ['productId'],
  additionalProperties: false,
};
