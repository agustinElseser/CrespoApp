import csvParser from 'csv-parser'
import { Readable } from 'stream'

interface CSVRow {
  id: string
  [key: string]: string
}

export default function readCsvFile(content: any): Promise<CSVRow[]> {
  const rows: CSVRow[] = []
  let currentId = 1

  return new Promise((resolve, reject) => {
    const readableStream = new Readable()
    readableStream.push(content)
    readableStream.push(null)

    readableStream
      .pipe(csvParser())
      .on('data', (row: CSVRow) => {
        const cleanedRow: CSVRow = { id: `row_${currentId}` }

        for (const key in row) {
          if (row.hasOwnProperty(key)) {
            const cleanedValue = row[key] ? row[key].trim() : null
            // @ts-ignore
            cleanedRow[key.toLowerCase()] = cleanedValue
          }
        }

        if (Object.keys(cleanedRow).length > 1) {
          rows.push(cleanedRow)
          currentId++
        }
      })
      .on('end', () => {
        resolve(rows)
      })
      .on('error', error => {
        reject(error)
      })
  })
}
