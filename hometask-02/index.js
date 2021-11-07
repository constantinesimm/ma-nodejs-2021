const http = require('http');
const { port } = require('./config');
const requestHandler = require('./src/server/request-handler');

http.createServer(requestHandler).listen(port, () => {
  console.log('♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦');
  console.log(`♦♦♦♦♦♦  Server is ready for usage on port - ${ port } ♦♦♦♦♦♦`);
  console.log('♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦');
});
