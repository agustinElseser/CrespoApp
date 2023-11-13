import { Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import Icon from 'src/@core/components/icon'
import CardChips from './CardChips'

const CardComponent = ({data, customize, styling, intentions}) => {
 
 
  return (
  
    <Card variant='elevation' sx={{ display: 'flex', my:5 }} style={styling}>
    <CardContent sx={{ flex: '1 0 auto' }}>
    <Typography component="div" variant="h6">
        {data.title}
    </Typography>
    {intentions ? <Typography variant="subtitle1" color="text.secondary" component="div" style={{width:'60%'}}>
          {data.text}
    </Typography> :<Typography variant="subtitle1" color="text.secondary" component="div" >
          {data.text}
    </Typography>}
    { data.buttons && data?.buttons.length > 0 ? data.buttons.map((button,i)=> <CardChips  key={i}  data={button}/>):null}
    <div style={{display:'flex', alignItems:'center', width:'38%', marginTop:'1em'}}>

    { data.words && data?.words.length > 0 ? data.words.map((word,i)=> <CardChips  key={i}  data={word}/>):null}
    </div>
    </CardContent>
    <CardActions>
        <Icon icon='mdi:pencil-outline' onClick={()=>customize(data)}/>
    </CardActions>
    </Card>
   
  )
}

export default CardComponent