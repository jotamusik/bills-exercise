
import { billsFilter } from "../src/bills";
import * as fs from 'fs';

describe('Bills Filter', function () {
  test('Should exists the function', function () {
    expect(billsFilter).toBeDefined()
  });
  test('Should create a file with a suffix on the same location as input', function () {
    billsFilter('./test/csvfile.csv');
    expect(fs.accessSync('./test/csvfile-filtered.csv')).toBeTruthy();
  });
});
