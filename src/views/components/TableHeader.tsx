// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import SearchFilter, { IQueryFilter } from 'src/views/components/SearchFilter'
import { IconExcel } from './IconExcel'

interface TableHeaderProps {
  toggle: (type:string) => void
  handleFilter: (name: keyof IQueryFilter, value: IQueryFilter[keyof IQueryFilter]) => void
  handleDowload:(type:string) => void
  title?: string
  buttons?:string[]
}

export default function TableHeader(props: TableHeaderProps) {
  // ** Props
  const { handleDowload, handleFilter, toggle, buttons } = props
  
  let debounceTimer;
  const handleInputChange = (value) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      handleFilter('value', value);
    }, 500); 
  };

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap:3}}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'start', gap:3, height:'2.5rem'}}>
        <Button
          size='medium'
          color='success'
          variant='outlined'
          startIcon={<IconExcel />} 
          onClick={() => handleDowload('partial')}
          sx={{color:'#217346', borderColor:'#217346'}}
        >
          Página actual
        </Button>
        <Button
          size='medium'
          color='success'
          variant='outlined'
          startIcon={<IconExcel />} 
          onClick={() => handleDowload('all')}
          sx={{color:'#217346', borderColor:'#217346'}}
        >
          Todo
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'start', gap:3, height:'2.5rem'}}>
        <TextField
          size='small'
          sx={{height:'100%'}}
          placeholder={props?.title ? `Búsqueda ${props.title}` : 'Buscar..'}
          onChange={e => handleInputChange(e.target.value)}
        />
        {buttons?.map((item, index) => (
        <Button
          key={index}
          sx={{height:'100%'}}
          onClick={()=>toggle(item)}
          variant='contained'
        >
          {item}
        </Button>
      ))}
        <SearchFilter title={props.title}  handleFilter={handleFilter} />
      </Box>
    </Box>
  )
}


