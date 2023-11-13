export interface CSVRow {
  [key: string]: string
}

export function createCSVFile(data: CSVRow[]): string {
  const headers = Object.keys(data[0]).join(',')
  const rows = data.map(row => Object.values(row).join(',')).join('\n')

  return `${headers}\n${rows}`
}

export function downloadCSVFile(content: string, fileName: string): void {
  const blob = new Blob([content], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()

  URL.revokeObjectURL(url)
}
