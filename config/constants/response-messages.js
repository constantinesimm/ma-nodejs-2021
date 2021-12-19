module.exports = {
  errors: {
    emptyRequestBody: 'Request data can not be empty',
    unknownServerError: 'Something went wrong',
    403: {
      public: 'Path available only for new users',
      private: 'Path available only for authenticated users',
    },
    404: (path = '') => `Page "${path}" not found`,
    500: 'Internal Server Error',
  },
  success: {
    files: {
      created: 'Goods file successful created',
      updated: 'File successful updated',
    },
  },
  info: {},
};
