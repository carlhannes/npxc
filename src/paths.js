var fs = require('fs');
var path = require('path');

var genpaths;
var trypath;
var result;
var i;

function pathExists(checkPath) {
  try {
    fs.accessSync(checkPath);
    return true;
  } catch (err) {
    return false;
  }
}

function generatePathsFromDepth(depth) {
  genpaths = [];
  genpaths.length = depth;

  for (i = 0; i < depth; i += 1) {
    genpaths[i] = './' + Array(i).fill('../').join('');
  }

  return genpaths;
}

function getClosestNPMBin(paths, curwd, bin) {
  result = false;
  paths.forEach(function scanFolders(item) {
    if (!result) {
      trypath = path.resolve(curwd, item, './node_modules/.bin/', bin);
      if (pathExists(trypath)) {
        result = path.relative(curwd, trypath);
      }
    }
  });
  return result;
}

module.exports = {
  generatePathsFromDepth: generatePathsFromDepth,
  pathExists: pathExists,
  getClosestNPMBin: getClosestNPMBin
};
