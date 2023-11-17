import { useState, useMemo, useEffect } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/'
import { DateValidationError } from '@mui/x-date-pickers/models'
import dayjs from 'dayjs'
import es from 'dayjs/locale/es'

import { TextField } from '@mui/material'
import { IQueryMonthFilter } from './SearchFilter'

dayjs.locale(es)
interface DatePickersProps {
  query: IQueryMonthFilter
  handleQuery: (name, value) => void
  disabled: boolean
}

export default function MonthYearPickers({ query, handleQuery, disabled }: DatePickersProps) {
  //** States
  const [startError, setStartError] = useState<DateValidationError | null>(null)
  const [endError, setEndError] = useState<DateValidationError | null>(null)
  const [error, setError] = useState(true)

  //** Functions
  const startErrorMessage = useMemo(() => {
    switch (startError) {
      case 'maxDate': {
        setError(true)

        return 'Fecha posterior a fin'
      }
      case 'minDate':
      case 'invalidDate':
      case 'disableFuture': {
        setError(true)

        return 'Fecha futura no disponible'
      }
      default: {
        return ''
      }
    }
  }, [startError])

  const endErrorMessage = useMemo(() => {
    switch (endError) {
      case 'maxDate':
      case 'minDate': {
        setError(true)

        return 'Fecha anterior a inicio'
      }
      case 'invalidDate': {
        setError(true)

        return 'Fecha inválida'
      }
      case 'disableFuture': {
        setError(true)

        return 'Fecha futura no disponible'
      }
      default: {
        return ''
      }
    }
  }, [endError])

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Mes'
          value={query.mes}
          onChange={(date: any) => handleQuery('mes', date)}
          onError={newError => setEndError(newError)}
          views={['month']}
          disabled={disabled}
          slotProps={{
            actionBar: {
              actions: []
            },
            textField: {
              size: 'small',
              variant: 'outlined',
              helperText: endErrorMessage
            },
            layout: {
              sx: {
                ['.MuiDateCalendar-root']: {},
                ['.Mui-selected']: {
                  borderRadius: '7px'
                },
                ['.MuiButtonBase-root']: {
                  borderRadius: '6px'
                },
                ['.MuiPickersMonth-root']: {}
              }
            }
          }}
          sx={{ width: '250px' }}
        />
        <DatePicker
          label='Año'
          disableFuture
          value={query.year}
          onChange={(date: any) => handleQuery('year', date)}
          onError={newError => setEndError(newError)}
          views={['year']}
          disabled={disabled}
          slotProps={{
            actionBar: {
              actions: []
            },
            textField: {
              size: 'small',
              variant: 'outlined',
              helperText: endErrorMessage
            },
            layout: {
              sx: {
                ['.MuiDateCalendar-root']: {},
                ['.Mui-selected']: {
                  borderRadius: '7px'
                },
                ['.MuiButtonBase-root']: {
                  borderRadius: '6px'
                }
              }
            }
          }}
          sx={{ width: '250px' }}
        />
      </LocalizationProvider>
    </>
  )
}
