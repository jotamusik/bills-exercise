import * as fs from 'fs';

function billsFilter(uri) {
  let splittedUri = uri.split('/');
  splittedUri.splice(splittedUri.length - 1, 1);
  let path = splittedUri.join('/');
  fs.writeFileSync(`${path}/csvfile-filtered.csv`, '');
}

export {
  billsFilter
}

