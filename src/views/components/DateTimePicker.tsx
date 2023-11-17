import { useState, useMemo } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/'
import { DateValidationError } from '@mui/x-date-pickers/models'
import dayjs from 'dayjs'
import es from 'dayjs/locale/es'
import { DateTimePicker } from '@mui/x-date-pickers'
import { DigitalClock } from '@mui/x-date-pickers'

dayjs.locale(es)
interface IProps {
  disabled?: boolean
  query: any
  handleQuery: any
}

export default function DateTimePickers({ disabled, query, handleQuery }: IProps) {
  const [startDate, setStartDate] = useState(dayjs().startOf('month').startOf('day'))
  const [endDate, setEndDate] = useState(dayjs())
  const [startError, setStartError] = useState<any | null>(null)
  const [endError, setEndError] = useState<any | null>(null)
  const [error, setError] = useState(true)

  const handleDates = (type: string, date: any) => {
    if (type === 'desde') {
      setStartDate(date)
    } else {
      setEndDate(date)
    }
    setError(false)
  }
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

  const handleCloseCalendar = () => {
    handleQuery('desde', startDate)
    handleQuery('hasta', endDate)
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label='Fecha'
          onChange={(date: any) => setStartDate(date)}
          onClose={handleCloseCalendar}
          value={query.desde}
          format={'DD/MM/YYYY HH:mm'}
          ampm={false}
          slotProps={{
            actionBar: {
              actions: []
            },
            textField: {
              variant: 'outlined',
              helperText: startErrorMessage,
              size: 'small'
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
                },
                ['.MuiMultiSectionDigitalClock-root']: {
                  width: '110px'
                },
                ['.css-23tkee-MuiButtonBase-root-MuiMenuItem-root-MuiMultiSectionDigitalClockSection-item']: {
                  padding: 1,
                  fontSize: '12px',
                  width: 30
                }
              }
            }
          }}
          maxDate={endDate}
          disableFuture
          disabled={disabled}
          onError={newError => setStartError(newError)}
        />
      </LocalizationProvider>
    </>
  )
}
