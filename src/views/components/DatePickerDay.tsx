import { useState, useMemo } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/'
import { DateValidationError } from '@mui/x-date-pickers/models'
import dayjs from 'dayjs'
import es from 'dayjs/locale/es'

import { IQueryFilter } from './SearchFilter'

dayjs.locale(es)

interface DatePickersProps {
  query: IQueryFilter
  handleQuery: (name: keyof IQueryFilter, value: IQueryFilter[keyof IQueryFilter]) => void
}
export default function DatePickerDay({ query, handleQuery }: DatePickersProps) {
  //** States
  const [startError, setStartError] = useState<DateValidationError | null>(null)

  //** Functions
  const startErrorMessage = useMemo(() => {
    switch (startError) {
      case 'disablePast': {
        return 'Fecha pasada no disponible.'
      }
      default: {
        return ''
      }
    }
  }, [startError])

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={dayjs.locale(es)}>
        <DatePicker
          label='Fecha'
          onChange={(date: any) => handleQuery('desde', date)}
          value={query.desde}
          defaultValue={dayjs()}
          format={'dddd, D [de] MMMM [de] YYYY'}
          disablePast
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
                  width: '350px'
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
          sx={{ width: 350 }}
          onError={newError => setStartError(newError)}
        />
      </LocalizationProvider>
    </>
  )
}
