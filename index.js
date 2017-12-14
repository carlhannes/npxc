#!/usr/bin/env node

const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');

const curwd = process.cwd();

function pathExists(path) {
  try {
    fs.accessSync(path);
    return true;
  } catch (err) {
    return false;
  }
}

let args = process.argv.slice(2).map((item) => {
  if (item.indexOf(' ') >= 0) {
    return `"${item.replace('"', '\\"')}"`;
  }
  return item;
});

let result = false;

// TODO add depth such as --npxc-d 5
['.', '..', '../../', '../../../', '../../../../'].forEach((item) => {
  if (!result) {
    let trypath = path.resolve(curwd, item, './node_modules/.bin/', args[0]);
    if (pathExists(trypath)) {
      result = path.relative(curwd, trypath);
    }
  }
});

if (result) {
  args[0] = result;

  const cmd = `${args.join(' ')}`;

  // TODO - use spawn instead
  execSync(cmd, {
    cwd: curwd,
    env: process.env,
    stdio: 'inherit'
  });
} else {
  console.log('Could not find any package');
  process.exit(1);
}
