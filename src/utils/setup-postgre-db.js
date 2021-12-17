const {
  database: {postgreClient},
} = require('../libs');
const {
  database: {
    postgre: {dbCredentials},
  },
} = require('../../config');

const createProductsTable = async () => {
  const client = postgreClient('default');
  const queries = {
    createUuidExt: 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
    checkProductsTable: `SELECT EXISTS (
      SELECT FROM pg_tables
      WHERE  tablename = 'products'
      );`,
    createProductsTable: `
      CREATE TABLE "products" (
        "id" uuid DEFAULT uuid_generate_v4 (),
        "item" VARCHAR NOT NULL,
        "type" VARCHAR NOT NULL,
        "measure" VARCHAR NOT NULL,
        "measureValue" INT NOT NULL,
        "priceType" VARCHAR NOT NULL,
        "priceValue" VARCHAR NOT NULL,
        PRIMARY KEY ("id")
       );`,
  };

  try {
    await client.connect();
    const checkProductsTable = await client.query(queries.checkProductsTable);

    if (!checkProductsTable.rows.shift().exists) {
      await client.query(queries.createUuidExt);
      await client.query(queries.createProductsTable);

      console.log('PostgreSQL: "Create Table - products"');
    }
  } catch (error) {
    return error.message;
  } finally {
    await client.release();
  }
};

const createPostgreDatabase = async () => {
  const client = postgreClient('super');
  const queries = {
    selectDB: 'SELECT FROM pg_database WHERE datname = $1',
    selectUser: 'SELECT FROM pg_roles WHERE rolname = $1',
    createDB(dbName) {
      return `CREATE DATABASE ${dbName}`;
    },
    createUser(user, password) {
      return `CREATE USER ${user} with ENCRYPTED PASSWORD '${password}'`;
    },
    grantPrivileges(user, dbName) {
      return `GRANT ALL PRIVILEGES ON DATABASE ${dbName} TO ${user}`;
    },
  };

  try {
    await client.connect();
    // check DB exists and create if no db founded
    const dbQuery = await client.query(queries.selectDB, [
      dbCredentials.database,
    ]);
    if (!dbQuery.rows.length) {
      await client.query(queries.createDB(dbCredentials.database));

      console.log(`PostgreSQL: "Create Database - ${dbCredentials.database}"`);
    }

    // check db username exists, if no user founded - create with grant privileges
    const userQuery = await client.query(queries.selectUser, [
      dbCredentials.username,
    ]);
    if (!userQuery.rows.length) {
      await client.query(
        queries.createUser(dbCredentials.username, dbCredentials.password),
      );
      await client.query(
        queries.grantPrivileges(dbCredentials.username, dbCredentials.database),
      );

      console.log(`PostgreSQL: "Create User - ${dbCredentials.username}"`);

      // create table "products"
      await createProductsTable();
    }
  } catch (error) {
    return error.message;
  } finally {
    await client.end();
  }
};

module.exports = createPostgreDatabase;
