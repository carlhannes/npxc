import test from 'ava';
import paths from '../src/paths';

test('paths should be generated correctly from depth', (t) => {
  let trypaths = paths.generatePathsFromDepth(3);

  t.is(JSON.stringify(trypaths), JSON.stringify(['./', './../', './../../']));

  trypaths = paths.generatePathsFromDepth(5);

  t.is(JSON.stringify(trypaths), JSON.stringify(['./', './../', './../../', './../../../', './../../../../']));
});


test('should get correct closest npm bin', (t) => {
  const trypaths = paths.generatePathsFromDepth(2);

  const avaBinPath = paths.getClosestNPMBin(trypaths, __dirname, 'ava');

  t.is(avaBinPath, '../node_modules/.bin/ava');
});
