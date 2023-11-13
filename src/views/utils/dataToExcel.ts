  import * as XLSX from "xlsx";
  import toast from 'react-hot-toast'

  export function dataToExcel(data: any) {
   
    const newData = data.map(obj => {
      const { src, ...data } = obj;
      
          return data;
          });
    const worksheet = XLSX.utils.json_to_sheet(newData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "Data.xlsx", { compression: true });
    
    toast.loading('Descargando información...', {
      duration: 3000,
      style: {
        zIndex: 999999
      }
    });
  };