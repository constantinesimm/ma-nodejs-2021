const http = require('http');
const {port} = require('./config');
const requestHandler = require('./src/server/request-handler');
const fs = require('fs');
const {join} = require('path');

function enableGracefulShutdown() {
  const exitHandler = error => {
    if (error) console.error(error);

    console.log('Init Graceful shutdown...');
    process.exit();
  };

  process
    .on('SIGINT', exitHandler)
    .on('SIGTERM', exitHandler)
    .on('uncaughtException', exitHandler)
    .on('unhandledRejection', exitHandler);
}

function createAppDirectories() {
  const dirs = ['uploads'];
  const createDir = dir => fs.mkdirSync(dir);

  for (let dir of dirs) {
    fs.access(join(__dirname, `/${dir}`), err => {
      if (err) createDir(join(__dirname, `/${dir}`));
    });
  }
}

const bootServer = () => {
  enableGracefulShutdown();
  createAppDirectories();

  http.createServer(requestHandler).listen(port, () => {
    console.log('♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦');
    console.log(`♦♦♦♦♦♦  Server is ready for usage on port - ${port} ♦♦♦♦♦♦`);
    console.log('♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦');
  });
};

bootServer();
