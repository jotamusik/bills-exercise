import * as fs from 'fs';
import csv from 'csvtojson';
import { parse } from 'json2csv';

class CsvParser {
  readFromFile(uri) {
    return csv().fromFile(uri);
  }

  writeToFile(data, file) {
    let fields = [ "Num_factura", "Fecha", "Bruto", "Neto", "IVA", "IGIC", "Concepto", "CIF_cliente", "NIF_cliente" ];
    const csvString = parse(data, { fields, quote: '' });
    fs.writeFileSync(file, csvString);
  }
}


function getPathFrom(uri) {
  let splittedUri = uri.split('/');
  splittedUri.splice(splittedUri.length - 1, 1);
  return splittedUri.join('/');
}

function billsFilter(uri) {

  return new Promise((resolve, reject) => {
    const csvParser = new CsvParser();
    csvParser.readFromFile(uri).then(input => {
      let outputPath = getPathFrom(uri);
      csvParser.writeToFile(input, `${ outputPath }/csvfile-filtered.csv`);
      resolve();
    });
  });

  // let input = fs.readFileSync(uri);
  // let outputPath = getPathFrom(uri);
  // fs.writeFileSync(`${outputPath}/csvfile-filtered.csv`, input);
}

export {
  billsFilter
}
