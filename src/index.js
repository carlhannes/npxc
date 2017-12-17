#!/usr/bin/env node

var execSync = require('child_process').execSync;
var paths = require('./paths.js');

var curwd = process.cwd();

var cmd;
var depth = 5;

// TODO add --npxc-d to control depth
var args = process.argv.slice(2).map(function doMap(item) {
  if (item.indexOf(' ') >= 0) {
    return '"' + item.replace('"', '\\"') + '"';
  }
  return item;
});

var trypaths = paths.generatePathsFromDepth(depth);

var result = paths.getClosestNPMBin(trypaths, curwd, args[0]);

if (result) {
  args[0] = result;

  cmd = args.join(' ');

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
