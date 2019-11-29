import * as fs from 'fs';

function getPathFrom( uri ) {
  let splittedUri = uri.split('/');
  splittedUri.splice(splittedUri.length - 1, 1);
  return splittedUri.join('/');
}

function billsFilter(uri) {
  let input = fs.readFileSync(uri);
  let outputPath = getPathFrom(uri);
  fs.writeFileSync(`${outputPath}/csvfile-filtered.csv`, input);
}

export {
  billsFilter
}

