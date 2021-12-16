/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable prefer-promise-reject-errors */
const {promises: pfs} = require('fs');
const {join} = require('path');

const normalizeFile = file => Number(file.split('.').shift());

const latestUploadedFile = () =>
  new Promise((resolve, reject) => {
    const uploadsPath = join(process.cwd(), '/uploads');
    pfs
      .readdir(uploadsPath)
      .then(files => {
        if (!files.length) reject({message: 'No data files uploaded yet'});

        const latestFile = files
          .sort((a, b) => normalizeFile(b) - normalizeFile(a))
          .shift();

        return resolve(require(`${uploadsPath}/${latestFile}`));
      })
      .catch(error => reject(error));
  });

module.exports = latestUploadedFile;
