import toast from 'react-hot-toast';



const cleanLine = (line) => line.replace(/"/g, '').trim();

export default function parseCsv(file: File): Promise<string[]> {
  const reader = new FileReader();

  return new Promise<string[]>((resolve, reject) => {
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target) {
        reject(new Error("Error al leer el archivo."));

        return;
      }

      const fileContents = e.target.result as string;
      const lines = fileContents.split('\n').map(cleanLine);
      const nonEmptyLines = lines.filter(line => line !== '');
      const columnNames = nonEmptyLines[0].split(/[,;]/);
      const nombreAudioColumnIndex = columnNames.indexOf('NOMBRE_AUDIO');

      if (nombreAudioColumnIndex === -1) {
        toast.error("La columna 'NOMBRE_AUDIO' no existe en el CSV.", {
          duration: 6000,
          style: {
            zIndex: 999999,
          },
        });
        reject(new Error("La columna 'NOMBRE_AUDIO' no existe en el CSV."));

        return;
      }

      const nonEmptyRowsInNombreAudioColumn: string[] = [];
      for (let i = 1; i < nonEmptyLines.length; i++) {
        const rowData = nonEmptyLines[i].split(/[,;]/);
        const cellValue = rowData[nombreAudioColumnIndex].trim();
        if (cellValue !== '') {
          nonEmptyRowsInNombreAudioColumn.push(cellValue);
        }
      }

      resolve(nonEmptyRowsInNombreAudioColumn);
    };

    reader.onerror = () => {
      reject(new Error("Error al leer el archivo."));
    };

    reader.readAsText(file);
  });
}
