// ** MUI Imports
import { Box, MenuItem, TextField, Button, Divider, Switch, useTheme, useMediaQuery, Typography } from '@mui/material'

// ** Icon Imports
import DatePickers from './DatePickers'
import DateDay from './DatePicker'
import { Dayjs } from 'dayjs'
import { useState } from 'react'
import SearchFilter, { IQueryFilter } from './SearchFilter'
import { IconExcel } from './IconExcel'

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
  const { buttons, service, filter, handleFilter, toggle, handleDowload } = props
  const { user } = useAuth()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
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
          color='warning'
          key={1}
          sx={{ height: '100%', width: isSmallScreen ? '100%' : 200 }}
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
          sx={{ height: '100%', width: isSmallScreen ? '80%' : 200 }}
          onClick={() => toggle(item)}
          variant='contained'
        >
          {item}
        </Button>
      ))
    },
    {
      id: 3,
      input: (
        <SearchFilter key={66} title={props.search} handleFilter={handleFilter} filter={filter} service={service} />
      )
    },
    {
      id: 13,
      input: <SearchFilter key={3} title={props.search} handleFilter={handleFilter} filter={filter} service={service} />
    },
    {
      id: 4,
      input: <DatePickers filter={props.filter} handleFilter={handleFilter} />
    },
    {
      id: 5,
      input: (
        <>
          {!isSmallScreen && <Divider orientation='vertical' flexItem />}
          <Button
            startIcon={<Icon icon='mdi:file-search' fontSize={22} />}
            variant='contained'
            color='info'
            onClick={() => handleFilter('filtrar', 'find')}
            sx={{ height: '100%', width: isSmallScreen ? '100%' : 120 }}
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
    },
    {
      id: 10,
      input: (
        <Box sx={{ border: `1px solid ${theme.palette.text.disabled}`, padding: 2, borderRadius: 1 }}>
          <Typography color={theme.palette.text.secondary} fontWeight={900} key={10}>
            Reclamos de vecinos
          </Typography>
        </Box>
      )
    }
  ]

  return (
    <Box
      sx={{
        p: 5,
        display: 'flex',
        flexDirection: isSmallScreen ? 'row' : 'row',
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
