// pages/api/csv.js

import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse';
import { parse } from 'csv-parse/sync';
export default function handler(req, res) {
  try {
    // Path to the CSV file
    const csvFilePath = path.join(process.cwd(),'public','csv', 'WISCI_SR_V2_Redcap_Codebook_21_8_23.csv');

    // Read the CSV file
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');
    const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true
      });
      res.status(200).json({ data: records });
    // Parse CSV data into JSON

  } catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).json({ error: 'An error occurred while reading the CSV file.' });
  }
}
