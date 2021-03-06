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

function ivaAndIgicAreBothSet(row) {
  return row.IVA !== "" && row.IGIC !== "";
}

function cifAndNifAreBothSet(row) {
  return row.CIF_cliente !== "" && row.NIF_cliente !== "";
}

function rowIsRepeated(array, row) {
  return array.filter(anotherRow => anotherRow.Num_factura === row.Num_factura).length > 1;
}

function calculateGross(net, taxesPercentaje) {
  return net + ( net * taxesPercentaje / 100 );
}

function grossIsWrongCalculated(row) {
  if ( row.IVA === "" ) {
    return parseFloat(row.Bruto) !== calculateGross(parseFloat(row.Neto), parseFloat(row.IGIC));
  }
  else {
    return parseFloat(row.Bruto) !== calculateGross(parseFloat(row.Neto), parseFloat(row.IVA));
  }
}

function validRows(row, index, array) {
  if ( ivaAndIgicAreBothSet(row) || cifAndNifAreBothSet(row) ||
      rowIsRepeated(array, row) || grossIsWrongCalculated(row) ) {
    return false;
  }
  return true
}

function csvValidBillsFilter(uri) {

  return new Promise((resolve) => {
    const csvParser = new CsvParser();
    csvParser.readFromFile(uri).then(input => {
      let output = input.filter(validRows);
      let outputPath = getPathFrom(uri);
      csvParser.writeToFile(output, `${ outputPath }/csvfile-filtered.csv`);
      resolve();
    });
  });
}

export {
  csvValidBillsFilter
}
