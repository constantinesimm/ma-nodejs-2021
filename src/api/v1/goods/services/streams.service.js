/* eslint-disable import/no-dynamic-require */
const fs = require('fs');

const {
  CsvParserTransform,
  JsonOptimizeTransform,
} = require(`${process.cwd()}/src/libs`);

const streamService = input =>
  new Promise((resolve, reject) => {
    const filePath = `${process.cwd()}/uploads/${Date.now()}.json`;

    const writeFileStream = fs.createWriteStream(filePath, {flags: 'w+'});
    const csvParserStream = new CsvParserTransform({objectMode: true});
    const jsonOptimizeTransform = new JsonOptimizeTransform(
      {objectMode: true},
      input.headers['content-length'],
    );

    input
      .pipe(csvParserStream)
      .pipe(jsonOptimizeTransform)
      .pipe(writeFileStream);

    writeFileStream
      .on('error', error => reject(error.message))
      .on('finish', () => resolve(true));
  });

module.exports = streamService;
