import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

const Header = ({ toggle, title, buttonTitle, handleFilter }: any) => {
  return (
    <Box sx={{ p: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'start', gap: 3, height: '2.5rem' }}>
        <TextField
          size='small'
          sx={{ height: '100%' }}
          placeholder={'Buscar..'}
          onChange={e => handleFilter('value', e.target.value)}
        />
        <Button onClick={toggle} variant='contained'>
          {buttonTitle}
        </Button>
      </Box>
    </Box>
  )
}

export default Header
