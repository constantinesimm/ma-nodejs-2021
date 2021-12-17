const format = require('pg-format');

const {
  database: {postgreClient},
} = require(`${process.cwd()}/src/libs`);
const client = postgreClient('default');

const createProduct = async data => {
  try {
    const keys = Object.keys(data.shift())
      .map(i => `"${i}"`)
      .join(', ');
    const values = data.map(i => Object.values(i));

    await client.query(
      format(`INSERT INTO products (${keys}) VALUES %L`, values),
    );

    return true;
  } catch (error) {
    return error.message;
  }
};

const getProductById = async productId => {
  try {
    const result = await client.query(
      `SELECT * FROM "products" WHERE "id" = '${productId}';`,
    );

    return result.rows;
  } catch (error) {
    return error.message;
  }
};

const updateProductById = async (productId, data) => {
  try {
    const keys = Object.keys(data)
      .map((k, i) => `"${k}" = $${i + 1}`)
      .join(', ');

    const queryText = `
        UPDATE products
        SET ${keys}
        WHERE "id" = '${productId}'`;

    await client.query(queryText, Object.values(data));

    return true;
  } catch (error) {
    return error.message;
  }
};

const removeProductById = async productId => {
  try {
    await client.query(`DELETE FROM "products" WHERE "id" = '${productId}';`);

    return true;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createProduct,
  getProductById,
  updateProductById,
  removeProductById,
};
