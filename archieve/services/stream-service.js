const fs = require('fs');
const {join} = require('path');
const {CsvParserTransform, JsonOptimizeTransform} = require('../libs/streams');

const streamService = input =>
  new Promise((resolve, reject) => {
    const filepath = join(process.cwd(), `/uploads/${Date.now()}.json`);

    const writeFileStream = fs.createWriteStream(filepath, {flags: 'w+'});
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
