// ** MUI Imports
import { Box, MenuItem, TextField, Button, Divider, Switch } from '@mui/material'

// ** Icon Imports
import DatePickers from './DatePickers'
import DateDay from './DatePicker'
import { Dayjs } from 'dayjs'
import { useState } from 'react'
import SearchFilter, { IQueryFilter } from './SearchFilter'
import { IconExcel } from './IconExcel'
import SendReport from './SendReport'
import { Icon } from '@iconify/react'
import { useAuth } from 'src/hooks/useAuth'

interface TableHeardersProps {
  filter: any
  search?: string
  service?: string
  buttons: number[]
  buttonsTitle?: string[]
  handleFilter: (name: keyof IQueryFilter, value: IQueryFilter[keyof IQueryFilter]) => void
  toggle: (type: string) => void
  handleDowload?: (type: string) => void
}

export interface IQuery {
  campaña?: string
  cuenta?: string
  desde?: Dayjs
  hasta?: Dayjs
  fecha?: Dayjs
  numeracion?: string | string[]
  email?: string
}

export default function TableHeaders(props: TableHeardersProps) {
  // ** Props
  const { buttons, service, handleFilter, toggle, handleDowload } = props
  const { user } = useAuth()
  //**States
  const [value, setValue] = useState<string>('')

  let debounceTimer
  const handleInputChange = value => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      handleFilter('value', value)
    }, 500)
  }

  const Inputs = [
    {
      id: 1,
      input: (
        <TextField
          size='small'
          key={1}
          sx={{ height: '100%', width: 200 }}
          placeholder={props?.search ? `Buscar ${props.search}` : 'Buscar..'}
          onChange={e => handleInputChange(e.target.value)}
        />
      )
    },
    {
      id: 2,
      input: props.buttonsTitle?.map((item, index) => (
        <Button
          startIcon={<Icon icon='mdi:plus-circle' fontSize={22} />}
          key={item}
          sx={{ height: '100%' }}
          onClick={() => toggle(item)}
          variant='contained'
        >
          {item}
        </Button>
      ))
    },
    {
      id: 3,
      input: <SearchFilter key={3} title={props.search} handleFilter={handleFilter} service={service} />
    },

    {
      id: 4,
      input: <DatePickers filter={props.filter} handleFilter={handleFilter} />
    },
    {
      id: 5,
      input: (
        <>
          <Divider orientation='vertical' flexItem />
          <Button
            startIcon={<Icon icon='mdi:file-search' fontSize={22} />}
            variant='contained'
            onClick={() => handleFilter('filtrar', 'find')}
          >
            Buscar
          </Button>
        </>
      )
    },
    {
      id: 6,
      input: (
        <Box key={6} sx={{ flex: 1 }}>
          {/* separador de secciones de botones */}
        </Box>
      )
    },
    {
      id: 7,
      input: user?.rol === 'JEFE' && (
        <Button
          color='error'
          variant='outlined'
          sx={{ height: 40, padding: 2, gap: 2 }}
          onClick={() => handleFilter('inactivos', !props.filter.inactivos)}
        >
          Incluir inactivos
          <Switch
            defaultChecked={props.filter.inactivos}
            checked={props.filter.inactivos}
            size='small'
            onChange={() => handleFilter('inactivos', !props.filter.inactivos)}
            name='inactivos'
            color='error'
          />
        </Button>
      )
    },
    {
      id: 8,
      input: (
        <Button
          size='medium'
          color='success'
          key={8}
          variant='outlined'
          startIcon={<Icon icon='mdi:email-fast' fontSize={22} />}
          onClick={() => toggle('Reporte')}
          sx={{ color: '#217346', borderColor: '#217346' }}
        >
          INFORME STT
        </Button>
      )
    },
    {
      id: 9,
      input: (
        <Button
          size='medium'
          key={9}
          color='success'
          variant='outlined'
          startIcon={<Icon icon='mdi:email-fast' fontSize={22} />}
          onClick={() => toggle('Reporte')}
          sx={{ color: '#217346', borderColor: '#217346' }}
        >
          INFORME SA
        </Button>
      )
    }
  ]

  return (
    <Box
      sx={{
        p: 5,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3
      }}
    >
      {buttons.map(button => {
        const input = Inputs.find(input => input.id === button)

        return input ? input.input : null
      })}
    </Box>
  )
}
