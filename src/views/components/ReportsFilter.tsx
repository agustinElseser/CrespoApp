// ** MUI Imports
import { Box, MenuItem, TextField, Button, Divider } from '@mui/material'

// ** Icon Imports
import DatePickers from './DatePickers'
import DateDay from './DatePicker'
import { Dayjs } from 'dayjs'
import { useState } from 'react'

interface ReportsFilterProps {
  search?: string,
  buttons: number[],
  query:IQuery,
  handleQuery: (name: keyof IQuery, value: IQuery[keyof IQuery]) => void ,
  handleAction:(type: string, value?:string) => void
}

export interface IQuery {
  campaña?: string,
  cuenta?: string,
  desde?: Dayjs,
  hasta?: Dayjs,
  fecha?: Dayjs,
  numeracion?: string | string[]
  email?: string
}

export default function ReportsFilter(props: ReportsFilterProps) {
  // ** Props
  const { buttons, query, handleQuery, handleAction } = props
  
  //**States
  const [value, setValue] = useState<string>('')
  
  const Inputs = [
  {
      id: 1,
      input: <TextField
          size='small'
          sx={{width:'250px'}}
          label='Email'
          value={query.email}
          onChange={(e)=>handleQuery('email', e.target.value)}
          variant='outlined'
        />
    },
    {
      id: 2,
      input: <TextField
          size='small'
          sx={{ width:'250px', flexGrow:1}}
          label='Buscar'
          value={value}
          onChange={(e)=>setValue(e.target.value)}
          variant='outlined'
        />
    },
    {
      id: 3,
      input: <TextField
        select
          size='small'
          sx={{width:'250px',flexGrow: 1  }}
          label='Cuenta'
          value={query.cuenta}
          type='select'
          onChange={(e)=>handleQuery('cuenta', e.target.value)}
          variant='outlined'
        >
          <MenuItem key={12} value={'Siptel'} >
            Siptel
          </MenuItem>
          <MenuItem key={12} value={ 'GoCloud'} >
            GoCloud
          </MenuItem>
        </TextField>
    },
    {
      id:4,
      input:<TextField
          select
          size='small'
          sx={{  width:'250px',flexGrow: 1  }}
          label='Campaña'
          value={query.campaña}
          type='select'
          onChange={(e)=>handleQuery('campaña', e.target.value)}
          variant='outlined'
          disabled={!query.cuenta}
        >
          <MenuItem key={12} value={'Siptel'} >
            Siptel
          </MenuItem>
          <MenuItem key={12} value={ 'GoCloud'} >
            GoCloud
          </MenuItem>
        </TextField>
    },
    {
      id:5,
      input:<TextField
          select
          size='small'
          sx={{  width:'250px'}}
          label='Numeración'
          value={query.numeracion}
          type='select'
          onChange={(e)=>handleQuery('numeracion', e.target.value)}
          variant='outlined'
        >
          <MenuItem key={12} value={'Siptel'} >
            564534534543
          </MenuItem>
          <MenuItem key={12} value={ 'GoCloud'} >
            564534534534
          </MenuItem>
        </TextField>
    },
    {
      id:6,
      input: <DatePickers handleQuery={handleQuery} query={query} />
    },
    {
      id:7,
      input:<DateDay handleQuery={handleQuery} query={query}/>
    },
    {
      id:8,
      input:  <>
      <Button key={6} sx={{height:'100%'}} variant='contained'onClick={()=> handleAction('filter', value)} >
                Filtrar
              </Button>
        <Divider  orientation="vertical" flexItem/>
        </>
    },
    {
      id:9,
      input:  <Button key={7} sx={{height:'100%'}} variant='contained' onClick={()=> handleAction('find')}>
                Buscar
              </Button>
    },
    {
      id:10,
      input:  <Button key={7} sx={{height:'100%'}} variant='contained' onClick={()=> handleAction('send')}>
                Enviar
              </Button>
    }

  ]

  return (
    <Box sx={{ pt: 5, display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
      {buttons.map((button) => {
        const input = Inputs.find((input) => input.id === button);
        
        return input ? input.input : null;
      })} 
    </Box>
  )
}


