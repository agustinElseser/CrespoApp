import { jsPDF } from 'jspdf'

export function createPDF(htmlInput) {
  return new Promise((resolve, reject) => {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [700, 1000],
      putOnlyUsedFonts: true
    })
    doc.setFontSize(10)
    // Insertar el HTML en el PDF
    doc.html(htmlInput, {
      callback: function (pdf) {
        // Descargar el PDF con un nombre específico
        pdf.save('output.pdf')

        // Resolver la promesa con el Blob del PDF generado (opcional)
        const pdfBlob = pdf.output('blob')
        resolve(pdfBlob)
      }
    })
  })
}
