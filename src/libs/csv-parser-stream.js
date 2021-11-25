const stream = require('stream');
const transform = new stream.Transform({objectMode: true});

let headerLine = false;
transform._transform = function (chunk, encoding, done) {
  let strData = chunk.toString();

  if (this._invalidLine) {
    strData = this._invalidLine + strData;
  }

  let objLines = strData.split('\n');
  this._invalidLine = objLines.splice(objLines.length - 1, 1)[0];

  if (!headerLine) {
    headerLine = objLines.splice(0, 1)[0];
  }

  let parsedJson = [];
  for (let line of objLines) {
    let idx = 0;
    let obj = {};
    let header = headerLine.split(',');
    let values = line.split(',');

    if (header.length < values.length) {
      let price = values.splice(5, 2);

      values.push(price.join(',').replace(/"/g, ''));
    }

    while (idx < header.length) {
      Object.assign(obj, {
        [header[idx]]: isNaN(values[idx]) ? values[idx] : Number(values[idx]),
      });
      ++idx;
    }
    parsedJson.push(obj);
  }

  let optimizedJson = Object.values(
    parsedJson.reduce(function (r, e) {
      const key = ['item', 'measure', 'priceType', 'priceValue', 'type']
        .map(function (k) {
          return e[k];
        })
        .join('|');

      if (!r[key]) r[key] = e;
      else {
        r[key].measureValue += e.measureValue;
      }
      return r;
    }, {}),
  );

  this.push(JSON.stringify(optimizedJson, null, 4));

  done();
};

transform._flush = function (done) {
  if (this._invalidLine) {
    this.push([this._invalidLine]);
  }

  this._invalidLine = null;
  done();
};

module.exports = transform;
