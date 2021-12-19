const {promises: pfs} = require('fs');
const {join} = require('path');

const {
  server: {directories},
} = require('../../config');

const setupDirectories = () => {
  console.info('♦♦♦♦♦♦  Checking app directories ♦♦♦♦♦♦');

  for (const dir of directories) {
    const fullPath = join(process.cwd(), dir);

    pfs.access(fullPath).catch(error => {
      if (error.code === 'ENOENT') {
        pfs
          .mkdir(fullPath)
          .then(() =>
            console.info(`♦♦♦♦♦♦  "${dir}" - directory created ♦♦♦♦♦♦`),
          );
      }
    });
  }
};

module.exports = setupDirectories;
