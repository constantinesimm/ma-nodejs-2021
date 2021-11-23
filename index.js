const http = require('http');
const {port} = require('./config');
const requestHandler = require('./src/server/request-handler');

function enableGracefulShutdown() {
  const exitHandler = error => {
    if (error) console.error(error);

    console.log('Init Graceful shutdown...');
    process.exit();
  };

  process
    .on('SIGINT', exitHandler)
    .on('SIGTERM', exitHandler)
    .on('SIGUSR1', exitHandler)
    .on('SIGUSR2', exitHandler)
    .on('uncaughtException', exitHandler)
    .on('unhandledRejection', exitHandler);
}

const bootServer = () => {
  enableGracefulShutdown();

  http.createServer(requestHandler).listen(port, () => {
    console.log('♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦');
    console.log(`♦♦♦♦♦♦  Server is ready for usage on port - ${port} ♦♦♦♦♦♦`);
    console.log('♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦');
  });
};

bootServer();
