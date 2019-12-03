
import { billsFilter } from "../src/bills";
import * as fs from 'fs';

describe('Bills Filter', function () {
  test('Should filter those rows with IVA and IGIC (both) setted', async function () {
    let expectedOutput = "Num_factura,Fecha,Bruto,Neto,IVA,IGIC,Concepto,CIF_cliente,NIF_cliente\n" +
        "1,02/05/2019,1000,810,19,,ACER Laptop,B76430134,\n" +
        "2,03/08/2019,2000,2000,,8,MacBook Pro,,78544372A";
    await billsFilter('./test/csvfile.csv');
    expect(fs.readFileSync('./test/csvfile-filtered.csv').toString()).toBe(expectedOutput);
  });
});
