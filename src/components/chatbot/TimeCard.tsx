import { Card, Stack, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React from 'react'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'
import es from 'dayjs/locale/es'
import { useTheme } from '@mui/material/styles'

dayjs.locale(es)
const TimeCard = ({ day, setSave }) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        p: 4,
        width: '100%',
        [theme.breakpoints.down(1000)]: {
          width: '100%'
        },

        [theme.breakpoints.up(1000)]: {
          width: '50%'
        }
      }}
    >
      <Stack
        direction='column'
        alignItems='center'
        sx={{
          [theme.breakpoints.up('md')]: {
            flexDirection: 'row'
          },
          [theme.breakpoints.down('md')]: {
            gap: '1rem'
          }
        }}
        /* spacing={2} alignItems='center'  */ justifyContent={'space-between'}
      >
        <Typography fontWeight={600} variant='body1'>
          {day}
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction='row' spacing={2}>
            <TimePicker
              label='Inicio'
              sx={{ width: '120px' }}
              ampm={false}
              defaultValue={dayjs('2023-05-17T08:30')}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock
              }}
              slotProps={{
                actionBar: {
                  actions: []
                },
                textField: {
                  variant: 'outlined',
                  size: 'small'

                  /*          helperText: startErrorMessage */
                }
              }}
            />
            <TimePicker
              label='Final'
              ampm={false}
              defaultValue={dayjs('2023-05-17T18:00')}
              sx={{ width: '120px' }}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock
              }}
              slotProps={{
                actionBar: {
                  actions: []
                },
                textField: {
                  variant: 'outlined',
                  size: 'small'

                  /*          helperText: startErrorMessage */
                }
              }}
            />
          </Stack>
        </LocalizationProvider>
      </Stack>
    </Card>
  )
}

export default TimeCard
