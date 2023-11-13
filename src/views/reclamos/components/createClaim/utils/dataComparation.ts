

export default function dataComparation(metadata: any, files: any) {
  const filesComparation:any = [];
  
  // ** Comparacion data
  metadata?.forEach((metadataItem: string, index: number) => {
    
    const audioNew = files?.find((audio: any) => audio.name  === metadataItem)
    const audio = audioNew ? audioNew.name : '';
   

    if (metadataItem || audio ){
      if (metadataItem === audio) {
        const newItem = { id: audio, metadata: metadataItem, audio:audioNew.name, status: 1 };
        filesComparation.unshift(newItem);
      } else if (metadataItem && audio === '') {
        const newItem = { id: metadataItem, metadata: metadataItem, audio, status: 2 };
        filesComparation.push(newItem);
      }
    } else return

  });
  
  // Verificar si hay audios adicionales sin metadata
  files?.forEach((audio: any) => {
    if (!metadata.some((metadataItem: any) => metadataItem === audio.name ) &&
        !filesComparation.some((item: any) => item.id === audio.name)) {
      const newItem = { id: audio.name, metadata: '', audio: audio.name, status:3 };
      filesComparation.push(newItem);
    }
  });
  
  return filesComparation
  }

