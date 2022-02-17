import { Knex } from 'knex';
import * as path from 'path';
import * as csv from '@fast-csv/parse';

function toInteger(val) {
  val = parseInt(val);
  return !isNaN(val) ? val : null;
}

function mapRow(row) {
  return { id: toInteger(row[0]), title: row[5], artist: row[2], year: toInteger(row[9]) };
}

function parseCSV(filename: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const entries = [];
    csv
      .parseFile(filename, { skipRows: 1, delimiter: ';' })
      .on('error', (error) => reject(error))
      .on('data', (row) => entries.push(mapRow(row)))
      .on('end', () => resolve(entries));
  });
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('arts').del();

  // get entries from csv file
  const entries = await parseCSV(path.join(__dirname, '../data/the-tate-collection.csv'));

  // Inserts seed entries
  await knex.batchInsert('arts', entries, 500);

  await knex.raw('SELECT setval(\'arts_id_seq\', (SELECT MAX(id) from "arts"));');
}
