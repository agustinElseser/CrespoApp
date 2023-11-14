// ** React Imports
import { MouseEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import DatePickers from './DatePickers'
import Icon from 'src/@core/components/icon'
import { Box, Divider, MenuItem, Switch, TextField } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import MonthYearPickers from './MonthYearPickers'
import { useFetch } from 'src/hooks/useFetch'

export interface IQueryFilter {
  desde?: Dayjs
  hasta?: Dayjs
  value?: string
  mes?: Dayjs
  year?: Dayjs
  porMes?: boolean
  filtrar?: string
  inactivos?: boolean
}

export interface IQueryMonthFilter {
  mes?: Dayjs
  year?: Dayjs
  value?: string
}

interface IProps {
  title?: string
  service?: string
  handleFilter: (name: keyof IQueryFilter, value: IQueryFilter[keyof IQueryFilter]) => void
}

const initialState: IQueryFilter = {
  desde: dayjs().startOf('month').startOf('day'),
  hasta: dayjs(),
  mes: dayjs().startOf('month').startOf('day'),
  year: dayjs(),
  value: undefined,
  filtrar: 'find',
  inactivos: true
}
const initialStateMonth: IQueryMonthFilter = {
  mes: dayjs().startOf('month').startOf('day'),
  year: dayjs(),
  value: undefined
}

interface Iservice {
  id: string
  nombre: string
}

const TODOS = {
  id: 'all',
  nombre: 'TODAS'
}

export default function SearchFilter({ service, title, handleFilter }: IProps) {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [query, setQuery] = useState<IQueryFilter>(initialState)
  const [switchState, setSwitchState] = useState({ switch1: false, switch2: true })
  const [services, setServices] = useState<Iservice[]>([])
  const [serviceSelect, setServiceSelect] = useState<Iservice>({ id: '', nombre: '' })

  //** Hooks
  const router = useRouter()
  const filterFact = router.asPath.includes('facturacion')
  const { fetch, data } = useFetch()

  // ** Functions
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleQuery = (name: keyof IQueryFilter, value: IQueryFilter[keyof IQueryFilter]) => {
    setQuery({ ...query, [name]: value })
  }

  const handleFind = () => {
    handleFilter('desde', query.desde)
    handleFilter('hasta', query.hasta)
    handleFilter('value', query.hasta)

    setAnchorEl(null)
  }

  const handleSwitchChange = () => {
    setSwitchState(prevState => ({ switch1: !prevState.switch1, switch2: !prevState.switch2 }))
  }

  useEffect(() => {
    handleFind()
  }, [])

  return (
    <>
      <Button
        sx={{ minWidth: '3rem', p: 0, height: '2.5rem' }}
        variant='outlined'
        aria-controls='simple-menu'
        aria-haspopup='true'
        color='info'
        onClick={handleClick}
      >
        <Icon icon='mdi:cog-outline' fontSize={22} />
      </Button>
      <Menu keepMounted id='simple-menu' anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 4, gap: '1.5rem' }}>
          <TextField
            size='small'
            color='warning'
            key={1}
            sx={{ height: '100%', width: '100%' }}
            placeholder={'Buscar..'}
            onChange={e => handleQuery('value', e.target.value)}
          />

          {filterFact && (
            <>
              <Switch checked={switchState.switch1} onChange={() => handleSwitchChange()} size='small' />
              <MonthYearPickers query={query} handleQuery={handleQuery} disabled={switchState.switch2} />
              <Divider sx={{ mt: 1, mb: '0px!important' }} />
              <Switch checked={switchState.switch2} onChange={() => handleSwitchChange()} size='small' />
            </>
          )}

          <DatePickers filter={query} handleFilter={handleQuery} disabled={switchState.switch1} />
          <Button
            color='info'
            onClick={handleFind}
            startIcon={<Icon icon='mdi:file-search' fontSize={22} />}
            variant='outlined'
          >
            Buscar
          </Button>
        </Box>
      </Menu>
    </>
  )
}
