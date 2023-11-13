import { useState, useMemo } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import es from 'dayjs/locale/es'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'
import { QuerySMS } from '../apps/sms/envio-individual/context/SMSContext'

dayjs.locale(es)
interface DatePickersProps {
  query: QuerySMS
  handleQuery: (name, value) => void
}

export default function TimePickers({ query, handleQuery }: DatePickersProps) {
  const [startDate, setStartDate] = useState(dayjs().startOf('month').set('hour', 9).set('minute', 0))
  const [endDate, setEndDate] = useState(dayjs().set('hour', 18).set('minute', 0))
  const [startError, setStartError] = useState<any | null>(null)
  const [endError, setEndError] = useState<any | null>(null)
  const [error, setError] = useState(true)

  const startErrorMessage = useMemo(() => {
    switch (startError) {
      case 'invalidDate': {
        setError(true)

        return 'Fecha inválida'
      }
      default: {
        return ''
      }
    }
  }, [startError])

  const endErrorMessage = useMemo(() => {
    switch (endError) {
      case 'invalidDate': {
        setError(true)

        return 'Fecha inválida'
      }

      default: {
        return ''
      }
    }
  }, [endError])

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label='Hora inicio'
          ampm={false}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock
          }}
          value={query.hora_inicial}
          onChange={(date: any) => handleQuery('hora_inicial', date)}
          onError={newError => setStartError(newError)}
          sx={{ width: '320px' }}
          slotProps={{
            actionBar: {
              actions: []
            },
            textField: {
              variant: 'outlined',
              size: 'small',
              helperText: startErrorMessage
            }
          }}
        />
        <TimePicker
          label='Hora término'
          ampm={false}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock
          }}
          value={query.hora_termino}
          onChange={(date: any) => handleQuery('hora_termino', date)}
          onError={newError => setEndError(newError)}
          sx={{ width: '320px' }}
          slotProps={{
            actionBar: {
              actions: []
            },
            textField: {
              variant: 'outlined',
              size: 'small',
              helperText: endErrorMessage
            }
          }}
        />
      </LocalizationProvider>
    </>
  )
}
