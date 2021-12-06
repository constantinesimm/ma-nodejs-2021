const {Transform} = require('stream');

const normalizeItemKeys = objItem => {
  const keys = Object.keys(objItem);
  const values = Object.values(objItem);

  const correctKeys = {};

  keys.forEach((k, i) => {
    if (['item', 'type'].includes(k)) {
      Object.assign(correctKeys, {[k]: values[i]});
    }
    if (['measure', 'priceType'].includes(k)) {
      Object.assign(correctKeys, {[values[i]]: values[i + 1]});
    }
  });

  return correctKeys;
};

class CsvParserTransform extends Transform {
  _invalidLine = null;
  _headerKeys = false;
  _totalLength = 0;

  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    let rawData = chunk.toString();

    //concat chunk with invalid line
    if (this._invalidLine) {
      rawData = this._invalidLine + rawData;
    }

    // split each csv line for getting object
    let csvLines = rawData.split('\n');

    // set invalid line if line is not full
    this._invalidLine = csvLines.splice(csvLines.length - 1, 1)[0];

    // set object keys from first line
    if (!this._headerKeys) {
      let headersLine = csvLines.splice(0, 1).shift();

      this._headerKeys = headersLine.split(',');
    }

    // parsed json chunk
    const parsedChunk = [];

    for (let line of csvLines) {
      let idx = 0;
      let parsedLine = {};
      let values = line.split(',');

      // source priceValue contains comma and after splitting array - values length is 7 and 6 headers
      // checking line arr length - concat priceValue and remove '"' extra symbols
      if (this._headerKeys.length < values.length) {
        let priceColumn = values.splice(5, 2).join(',').replace(/"/g, '');

        values.push(priceColumn);
      }

      // create json object with headers and values arrs
      while (idx < this._headerKeys.length) {
        let value = isNaN(values[idx]) ? values[idx] : Number(values[idx]);

        Object.assign(parsedLine, {[this._headerKeys[idx]]: value});
        ++idx;
      }

      // transform parsed line structure
      parsedLine = normalizeItemKeys(parsedLine);

      // push parsed line in parsed chunk
      parsedChunk.push(parsedLine);
    }
    this._totalLength += parsedChunk.length;

    // push parsed chunk in next pipe
    this.push({parsedChunk, chunkLength: chunk.length});

    callback();
  }

  _flush(callback) {
    if (this._invalidLine) {
      this._invalidLine = null;
      this._headerKeys = false;
      this.push([this._invalidLine]);
    }

    callback();
  }
}

module.exports = CsvParserTransform;
