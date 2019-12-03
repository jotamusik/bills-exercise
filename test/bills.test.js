
import { billsFilter } from "../src/bills";
import * as fs from 'fs';

describe('Bills Filter', function () {
  test('Should filter those rows with IVA and IGIC (both) setted', async function () {

    let input = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente\n" +
        "1,02/05/2019,1000,810,19,,ACER Laptop,B76430134,\n" +
        "2,03/08/2019,2000,2000,,8,MacBook Pro,,78544372A\n" +
        "3,03/12/2019,1000,2000,19,8,Lenovo Laptop,,78544372A";

    let expectedOutput = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente\n" +
        "1,02/05/2019,1000,810,19,,ACER Laptop,B76430134,\n" +
        "2,03/08/2019,2000,2000,,8,MacBook Pro,,78544372A";

    let inputFile = './test/csvfile.csv';
    let outputFile = './test/csvfile-filtered.csv';

    fs.writeFileSync(inputFile, input);

    await billsFilter(inputFile);
    expect(fs.readFileSync(outputFile).toString()).toBe(expectedOutput);
  });
});
