#!/usr/bin/env node

'use strict';
const walk = require('walk');
const path = require('path');
const fs = require('fs');
const directoryExists = require('directory-exists');
const folderDelete = require('folder-delete');
const { ncp } = require('ncp');

(async () => {
  if (process.argv.length <= 2) {
    console.error('Not enough args');
    return;
  }

  const [,, folder] = process.argv;
  const folderBasePath = path.resolve(folder);
  const folderBackupPath = path.resolve(folder + '_bak');

  const backupExists = await directoryExists(folderBackupPath);

  if (backupExists) {
    console.log('Backup folder exists. Restoring backup.');
    folderDelete(folderBasePath);
    await new Promise(resolve =>
      ncp(folderBackupPath, folderBasePath, resolve)
    );
  } else {
    console.log('Backup folder does NOT exists. Creating backup.');
    await new Promise(resolve =>
      ncp(folderBasePath, folderBackupPath, resolve)
    );
  }

  const walker = walk.walk(folderBasePath, { followLinks: false });
  console.log('Injecting environment config\n');
  const envVarsFound = {};
  walker.on('file', (root, stat, next) => {
    const fileName = root + '/' + stat.name;
    if (fileName.endsWith('.html')) {
      let content = fs.readFileSync(fileName).toString();
      for (let key in process.env) {
        const newContent = content.replace(
          new RegExp('\\${' + key + '}', 'gi'),
          process.env[key]
        );
        if (newContent !== content) envVarsFound[key] = process.env[key];
        content = newContent;
      }
      fs.writeFileSync(fileName, content);
      console.log('✅  ' + fileName);
    }
    next();
  });

  walker.on('end', () => {
    console.log('\nSummary\n');
    for (let key in envVarsFound) {
      console.log(key + ' ➡️ ' + envVarsFound[key]);
    }
  });
})();
