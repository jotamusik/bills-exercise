
import { billsFilter } from "../src/bills";
import * as fs from 'fs';

describe('Bills Filter General Behaviour', function () {
  test('Should discard those rows with IVA and IGIC (both) setted', async function () {

    let input = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente\n" +
        "1,02/05/2019,1190,1000,19,,ACER Laptop,B76430134,\n" +
        "2,03/08/2019,2160,2000,,8,MacBook Pro,,78544372A\n" +
        "3,03/12/2019,2160,2000,19,8,Lenovo Laptop,,78544372A";

    let expectedOutput = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente\n" +
        "1,02/05/2019,1190,1000,19,,ACER Laptop,B76430134,\n" +
        "2,03/08/2019,2160,2000,,8,MacBook Pro,,78544372A";

    let inputFile = './test/csvfile.csv';
    let outputFile = './test/csvfile-filtered.csv';

    fs.writeFileSync(inputFile, input);

    await billsFilter(inputFile);
    expect(fs.readFileSync(outputFile).toString()).toBe(expectedOutput);
  });
  test('Should discard those rows with CIF and NIF (both) setted', async function () {

    let input = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente\n" +
        "1,02/05/2019,1190,1000,19,,ACER Laptop,B76430134,78545372A\n" +
        "2,03/08/2019,2160,2000,,8,MacBook Pro,,78544372A\n" +
        "3,03/12/2019,2160,2000,,8,Lenovo Laptop,,78544372A";

    let expectedOutput = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente\n" +
        "2,03/08/2019,2160,2000,,8,MacBook Pro,,78544372A\n" +
        "3,03/12/2019,2160,2000,,8,Lenovo Laptop,,78544372A";

    let inputFile = './test/csvfile.csv';
    let outputFile = './test/csvfile-filtered.csv';

    fs.writeFileSync(inputFile, input);

    await billsFilter(inputFile);
    expect(fs.readFileSync(outputFile).toString()).toBe(expectedOutput);
  });
  test('Should discard those rows with already used num_factura', async function () {

    let input = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente\n" +
        "1,02/05/2019,1190,1000,19,,ACER Laptop,,78545372A\n" +
        "2,03/08/2019,2160,2000,,8,MacBook Pro,,78544372A\n" +
        "1,03/12/2019,2160,2000,,8,Lenovo Laptop,,78544372A";

    let expectedOutput = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente\n" +
        "2,03/08/2019,2160,2000,,8,MacBook Pro,,78544372A";

    let inputFile = './test/csvfile.csv';
    let outputFile = './test/csvfile-filtered.csv';

    fs.writeFileSync(inputFile, input);

    await billsFilter(inputFile);
    expect(fs.readFileSync(outputFile).toString()).toBe(expectedOutput);
  });
  test('Should discard those rows with wrong calculated gros price', async function () {

    let input = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente\n" +
        "1,02/05/2019,1100,810,19,,ACER Laptop,,78545372A\n" +
        "2,03/08/2019,2160,2000,,8,MacBook Pro,,78544372A\n" +
        "3,03/12/2019,1000,2000,,8,Lenovo Laptop,,78544372A";

    let expectedOutput = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente\n" +
        "2,03/08/2019,2160,2000,,8,MacBook Pro,,78544372A";

    let inputFile = './test/csvfile.csv';
    let outputFile = './test/csvfile-filtered.csv';

    fs.writeFileSync(inputFile, input);

    await billsFilter(inputFile);
    expect(fs.readFileSync(outputFile).toString()).toBe(expectedOutput);
  });
});

describe('Bills Filter Strange Cases', function () {
  describe('With one line cases', function () {
    test('Should discard IGIC and IVA setted row', async function () {
      let input = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente\n" +
          "1,02/05/2019,1000,810,19,8,ACER Laptop,,78545372A";

      let expectedOutput = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente";

      let inputFile = './test/csvfile.csv';
      let outputFile = './test/csvfile-filtered.csv';

      fs.writeFileSync(inputFile, input);

      await billsFilter(inputFile);
      expect(fs.readFileSync(outputFile).toString()).toBe(expectedOutput);
    });
    test('Should discard CIF and NIF setted row', async function () {
      let input = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente\n" +
          "1,02/05/2019,1000,810,19,,ACER Laptop,48545372E,78545372A";

      let expectedOutput = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente";

      let inputFile = './test/csvfile.csv';
      let outputFile = './test/csvfile-filtered.csv';

      fs.writeFileSync(inputFile, input);

      await billsFilter(inputFile);
      expect(fs.readFileSync(outputFile).toString()).toBe(expectedOutput);
    });
    test('Should discard wrong calculated gros price row', async function () {
      let input = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente\n" +
          "1,02/05/2019,1100,810,19,,ACER Laptop,,78545372A";

      let expectedOutput = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente";

      let inputFile = './test/csvfile.csv';
      let outputFile = './test/csvfile-filtered.csv';

      fs.writeFileSync(inputFile, input);

      await billsFilter(inputFile);
      expect(fs.readFileSync(outputFile).toString()).toBe(expectedOutput);
    });
    test('Should output the header on no rows', async function () {
      let input = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente";

      let expectedOutput = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente";

      let inputFile = './test/csvfile.csv';
      let outputFile = './test/csvfile-filtered.csv';

      fs.writeFileSync(inputFile, input);

      await billsFilter(inputFile);
      expect(fs.readFileSync(outputFile).toString()).toBe(expectedOutput);
    });
    test('Should do nothing on empty file input', async function () {
      let input = "";

      let expectedOutput = "";

      let inputFile = './test/csvfile.csv';
      let outputFile = './test/csvfile-filtered.csv';

      fs.writeFileSync(inputFile, input);

      await billsFilter(inputFile);
      expect(fs.readFileSync(outputFile).toString()).toBe(expectedOutput);
    });
  });
});
