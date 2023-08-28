// pages/api/csv.js

import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse';
import { parse } from 'csv-parse/sync';
export async function GET(req, res) {
  if (req.method === 'GET') {
    try {
      // Path to the CSV file
      const csvFilePath = path.join(process.cwd(),'public','csv', 'WISCI_SR_V2_Redcap_Codebook_21_8_23.csv');
  
      // Read the CSV file
      const csvData = fs.readFileSync(csvFilePath, 'utf-8');
      const records = parse(csvData, {
          columns: true,
          skip_empty_lines: true
        });
        return Response.json({ data: records })
       
      // Parse CSV data into JSON
  
    } catch (error) {
      console.error('Error reading CSV file:', error);
      return Response.json({ data: "error occured" })
    }
  }
  
}
