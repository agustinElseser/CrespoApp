import { Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import Icon from 'src/@core/components/icon'

const ButtonCard = ({ data, styling }) => {
  return (
    <Card variant='elevation' sx={{ display: 'flex', my: 5 }} style={styling}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component='div' variant='h6'>
          {data.text}
        </Typography>
        <Typography variant='subtitle1' color='text.secondary' component='div'>
          {data.functionality}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ButtonCard
