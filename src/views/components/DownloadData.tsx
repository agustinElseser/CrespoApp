// ** MUI Imports
import { Box,Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { IconExcel } from './IconExcel'

interface DownloadDataProps {
  buttons: number[],
  data:any,
}

export default function DownloadData(props: DownloadDataProps) {
  // ** Props
  const {  buttons, data } = props
  
  const handleDowloader = (type:string) => {
      console.log(type)
    }

  const Inputs = [
    {
      id:1,
      input: <Button  key={6} sx={{color:'#217346', borderColor:'#217346'}} color='success' variant='outlined'
                      startIcon={<IconExcel />}  onClick={() => handleDowloader('total')}>
                      Página actual
            </Button>
        
    },
    {
      id:2,
      input: <Button  key={7} sx={{color:'#217346', borderColor:'#217346'}} color='success' variant='outlined'
                      startIcon={<IconExcel />}  onClick={() => handleDowloader('total')}> 
                      Todo
             </Button>
    },
  ]

    const renderedInputs = buttons.map((button) => {
      const input = Inputs.find((input) => input.id === button);
      
    return input ? input.input : null;
  });
  
  return (
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'start',gap:5 }}>
      {renderedInputs} 
    </Box>
  )
}


