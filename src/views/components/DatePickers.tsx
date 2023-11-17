import { useState, useMemo, useEffect } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/'
import { DateValidationError } from '@mui/x-date-pickers/models'
import dayjs from 'dayjs'
import es from 'dayjs/locale/es'

import { useMediaQuery, useTheme } from '@mui/material'

dayjs.locale(es)

interface DatePickersProps {
  filter: any
  handleFilter: (name, value) => void
  disabled?: boolean
}

export default function DatePickers({ filter, handleFilter, disabled }: DatePickersProps) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

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
          label='Desde'
          onChange={(date: any) => handleFilter('desde', date)}
          value={filter.desde}
          format={'DD/MM/YYYY'}
          slotProps={{
            actionBar: {
              actions: []
            },
            textField: {
              color: 'warning',
              size: 'small',
              variant: 'outlined',
              helperText: startErrorMessage
            },
            layout: {
              sx: {
                ['.MuiDateCalendar-root']: {
                  width: '250px'
                },
                ['.Mui-selected']: {
                  borderRadius: '7px'
                },
                ['.MuiButtonBase-root']: {
                  borderRadius: '6px'
                }
              }
            }
          }}
          sx={{ width: isSmallScreen ? '100%' : 250 }}
          maxDate={filter.hasta}
          disableFuture
          onError={newError => setStartError(newError)}
          disabled={disabled}
        />
        <DatePicker
          label='Hasta'
          value={filter.hasta}
          onChange={(date: any) => handleFilter('hasta', date)}
          minDate={filter.desde}
          disableFuture
          onError={newError => setEndError(newError)}
          disabled={disabled}
          format={'DD/MM/YYYY'}
          slotProps={{
            actionBar: {
              actions: []
            },
            textField: {
              color: 'warning',
              size: 'small',
              variant: 'outlined',
              helperText: endErrorMessage
            },
            layout: {
              sx: {
                ['.MuiDateCalendar-root']: {
                  width: '250px'
                },
                ['.Mui-selected']: {
                  borderRadius: '7px'
                },
                ['.MuiButtonBase-root']: {
                  borderRadius: '6px'
                }
              }
            }
          }}
          sx={{ width: isSmallScreen ? '100%' : 250 }}
        />
      </LocalizationProvider>
    </>
  )
}
