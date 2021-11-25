const routes = require('./routes');
const streamHandlers = require('./stream-handlers');

module.exports = (req, res) => {
  const allowedContentType = ['text/plain', 'text/csv', 'application/json'];

  const {
    url,
    headers: {host},
  } = req;

  if (!allowedContentType.includes(req.headers['content-type'])) {
    res.statusCode = 415;

    return res.end('Not supported request content');
  }

  const {pathname, searchParams} = new URL(url, `https://${host}`);

  const query = {};
  for (const params of searchParams) {
    Object.assign(query, {[params.shift()]: params.pop()});
  }

  if (req.headers['content-type'] === 'text/csv')
    streamHandlers.csvTransform(req);

  let body = [];

  req
    .on('error', err => console.error('req err', err))
    .on('data', chunk => body.push(chunk))
    .on('end', () => {
      body = Buffer.concat(body).toString();
      routes({...req, pathname, body, query}, res);
    });
};
