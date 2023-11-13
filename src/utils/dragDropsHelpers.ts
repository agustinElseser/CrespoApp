export const grid = 8;

export const borderRadius = 2;
//una pequeña función para ayudarnos a reordenar el resultado

export const reorder = (list, startIndex, endIndex) => {

    const result = Array.from(list)

    const [removed] = result.splice(startIndex, 1)

    result.splice(endIndex, 0, removed)

    return result;
  };


 export  const getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    borderRadius:5,
    padding:1,

    // change background colour if dragging
    boxShadow: isDragging ? '#9055fd18' : 'rgb(244, 245, 250)',
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  
  export const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? '#9155FD2E' : 'rgb(244, 245, 250)',
    
  });