import toast from 'react-hot-toast';

const requiredColumns = ['NOMBRE_AUDIO', 'NOMBRE_AGENTE', 'ID_AGENTE', 'RUT_CLIENTE', 'NOMBRE_CLIENTE', 'APELLIDO_PATERNO', 'APELLIDO_MATERNO', 'CORREO_CLIENTE', 'TELEFONO_MOVIL', 'TELEFONO_FIJO', 'TELEFONO_AUDIO', 'FECHA_AUDIO', 'COMUNA_CLIENTE', 'CENTRO_COSTO', 'CAMPANA', 'ID_CLIENTE', 'DURACION_AUDIO', 'TIPIFICACION', 'JSON'];

const cleanLine = (line) => line.trim();

export default function checkCsvValidity(fileContents) {
  const fileRead = fileContents.toString();
  const lines = fileRead.split('\n').map(cleanLine);
  const nonEmptyLines = lines.filter(line => line !== '');
  const columnNames = nonEmptyLines[0].split(/[,;]/); 

  //** Verifica que el CSV tenga todas las columnas de datos requeridas
  const missingColumns = requiredColumns.filter(column => !columnNames.includes(column));
  if (missingColumns.length > 0) {
    const missingColumnsMessage = missingColumns.join(', ');
    toast.error(`CSV sin columnas requeridas: ${missingColumnsMessage}.`, {
      duration: 6000,
      style: {
        zIndex: 999999,
      },
    });

    return false;
  }

  //** Verifica si las filas que tienen datos les falta una columna requerida
  for (let i = 1; i < nonEmptyLines.length; i++) { 
    const rowData = nonEmptyLines[i].split(/[,;]/);
    const isEmptyRow = rowData.every(value => value.trim() === ''); 
    if (!isEmptyRow) {
      for (const columnName of requiredColumns) {
        const columnIndex = columnNames.indexOf(columnName);
        const cellValue = rowData[columnIndex];
        if (!cellValue.trim()) {
          toast.error(`Fila ${i + 1}: La columna '${columnName}' está vacía.`, {
            duration: 6000,
            style: {
              zIndex: 999999,
            },
          });

          return false;
        }
      }
    }
  }

  return true;
};

