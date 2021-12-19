const {Transform} = require('stream');
const {Buffer} = require('buffer');

const reduceDuplicated = sourceArr => {
  return Object.values(
    sourceArr.reduce((snappedItem, newItem) => {
      const {concatKey, snapKeys} = Object.keys(newItem).includes('weight')
        ? {concatKey: 'weight', snapKeys: ['item', 'type', 'pricePerKilo']}
        : {concatKey: 'quantity', snapKeys: ['item', 'type', 'pricePerItem']};

      const snap = snapKeys.map(key => newItem[key]).join('|');

      if (!snappedItem[snap]) snappedItem[snap] = newItem;
      else {
        snappedItem[snap][concatKey] += newItem[concatKey];
      }

      return snappedItem;
    }, {}),
  );
};

class JsonOptimizeTransform extends Transform {
  _maxLength = 0;
  _currentLength = 0;
  _sourceArr = [];
  _optimizedArr = [];

  constructor(options, contentLength) {
    super(options);

    this._maxLength = Number(contentLength);
  }

  _optimizeData() {
    this._optimizedArr = reduceDuplicated(this._sourceArr);
  }

  _transform(chunk, encoding, callback) {
    // calc transformed chunks length
    this._currentLength += chunk.chunkLength;

    // push new chunk in source arr
    this._sourceArr = this._sourceArr.concat(chunk.parsedChunk);

    // optimize json with new chunks
    this._optimizeData();

    callback();
  }

  _flush(callback) {
    // if transformed chunks is equal request content length push to write data
    if (this._currentLength === this._maxLength) {
      const optimizedJsonBuffer = Buffer.from(
        JSON.stringify(this._optimizedArr, null, 4),
        'utf-8',
      );

      this.push(optimizedJsonBuffer);
    }

    this._optimizedArr = [];
    callback();
  }
}

module.exports = JsonOptimizeTransform;
