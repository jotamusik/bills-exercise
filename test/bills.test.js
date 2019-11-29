
import { billsFilter } from "../src/bills";
import * as fs from 'fs';

describe('Bills Filter', function () {
  test('Should create a file with a suffix on the same location as input', function () {
    billsFilter('./test/csvfile.csv');
    expect(fs.existsSync('./test/csvfile-filtered.csv')).toBeTruthy();
  });
  test('Should read the file and write to the output one', function () {
    billsFilter('./test/csvfile.csv');
    expect(fs.readFileSync('./test/csvfile-filtered.csv').toString()).toBe(fs.readFileSync('./test/csvfile.csv').toString());
  });
});
