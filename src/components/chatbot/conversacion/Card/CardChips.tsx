import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function CardChips({data}) {
   
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Stack direction="row" spacing={2}>
      <Chip
        label={data.text}
        onClick={handleClick}
        onDelete={handleDelete}
        variant="outlined"
        color="info"
        style={{marginLeft:10}}
      />
    </Stack>
  );
}