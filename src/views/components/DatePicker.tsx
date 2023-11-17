import { useState, useMemo } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/'
import { DateValidationError } from '@mui/x-date-pickers/models'
import dayjs from 'dayjs'
import es from 'dayjs/locale/es'

dayjs.locale(es)

interface DatePickersProps {
  query: any
  handleQuery: () => void
}
export default function DateDay({ query, handleQuery }: DatePickersProps) {
  //** States
  const [startError, setStartError] = useState<DateValidationError | null>(null)

  //** Functions
  const startErrorMessage = useMemo(() => {
    switch (startError) {
      case 'disableFuture': {
        return 'Fecha futura no disponible'
      }
      default: {
        return ''
      }
    }
  }, [startError])

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Fecha'
          onChange={(date: any) => handleQuery()}
          value={query.fecha}
          format={'DD/MM/YYYY'}
          slotProps={{
            actionBar: {
              actions: []
            },
            textField: {
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
          sx={{ width: '250px' }}
          disableFuture
          onError={newError => setStartError(newError)}
        />
      </LocalizationProvider>
    </>
  )
}
