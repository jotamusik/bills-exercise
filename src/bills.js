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

function validRows(row) {
  if ( row.IVA !== "" && row.IGIC !== "" ) {
    return false;
  }
  return true
}

function billsFilter(uri) {

  return new Promise((resolve) => {
    const csvParser = new CsvParser();
    csvParser.readFromFile(uri).then(input => {

      let output = [];

      output = input.filter(validRows);

      let outputPath = getPathFrom(uri);
      csvParser.writeToFile(output, `${ outputPath }/csvfile-filtered.csv`);
      resolve();
    });
  });
}

export {
  billsFilter
}
