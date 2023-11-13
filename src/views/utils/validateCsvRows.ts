interface CSVRow {
  [key: string]: string | null
}

// Función para validar filas y separarlas en arrays válidos e inválidos.
export default function validateCsvRows(rows: CSVRow[]): { validRows: CSVRow[]; invalidRows: CSVRow[] } {
  const validRows: CSVRow[] = []
  const invalidRows: CSVRow[] = []

  rows.forEach(row => {
    let isValid = true

    if (!row.correo || !isValidEmail(row.correo)) {
      isValid = false
    }

    for (const key in row) {
      if (key !== 'id' && key !== 'correo' && row[key] === null) {
        isValid = false
        break
      }
    }

    if (isValid) {
      validRows.push(row)
    } else {
      invalidRows.push(row)
    }
  })

  return { validRows, invalidRows }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  return emailRegex.test(email)
}
