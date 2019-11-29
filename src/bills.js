import * as fs from 'fs';

function getPathFrom( uri ) {
  let splittedUri = uri.split('/');
  splittedUri.splice(splittedUri.length - 1, 1);
  return splittedUri.join('/');
}

function billsFilter(uri) {
  let path = getPathFrom(uri);
  fs.writeFileSync(`${path}/csvfile-filtered.csv`, '');
}

export {
  billsFilter
}

