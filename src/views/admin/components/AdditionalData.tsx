// ** React Imports
import { useEffect } from 'react'
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { useFetch } from 'src/hooks/useFetch'
import { Icon } from '@iconify/react'
import { BoxScroll } from 'src/views/components/BoxScroll'

interface IProps {
  handleCloseDialog: () => void
  id?: string | number
  type: string
  open: boolean
  title: string
  url: string
}

export default function AdditionalData({ handleCloseDialog, open, type, title, url, id }: IProps) {
  const theme = useTheme()
  const { fetch, data } = useFetch()

  useEffect(() => {
    if (open && type === 'DATALLE') {
      fetch(`${url}/detalle/${id}`)
    }
  }, [open && type === 'DATALLE'])

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog maxWidth={isSmallScreen ? 'xs' : 'md'} onClose={handleCloseDialog} open={open && type === 'DATALLE'}>
      <Box sx={{ minWidth: isSmallScreen ? 200 : 500 }}>
        <DialogTitle
          id='customized-dialog-title'
          sx={{
            p: 6,
            pt: 2,
            pb: 2,
            backgroundColor: theme.palette.primary.dark,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Typography variant='body1' sx={{ color: 'rgba(0,0,0,0.7)', fontWeight: 600, mr: 1 }}>
              DETALLE -
            </Typography>
            <Typography sx={{ color: 'rgba(0,0,0,0.7)', fontWeight: 600 }}>{title.toLocaleUpperCase()} </Typography>
          </Box>
          <IconButton
            aria-label='close'
            onClick={handleCloseDialog}
            sx={{ color: 'rgba(0,0,0,0.7)', justifySelf: 'end' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 6, p: 6 }}>
          <BoxScroll
            className='containScroll'
            sx={{
              maxHeight: '700px',
              overflowY: 'auto',
              overflowX: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              pr: 3
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Información general
              </Typography>
              {data.data &&
                Object.entries(data.data).map(([key, value]: any) => {
                  if (
                    key !== 'json' &&
                    key !== 'nombre_audio' &&
                    key !== 'id' &&
                    key !== 'activo' &&
                    key !== 'entidad' &&
                    key !== 'fecha_creado'
                  ) {
                    return (
                      <Box key={key} sx={{ display: 'flex' }}>
                        <Typography variant='body2' component={'span'} sx={{ color: 'black', minWidth: '40%' }}>
                          {key.toLocaleUpperCase()}
                        </Typography>
                        <Typography
                          variant='body2'
                          component={'span'}
                          sx={{ borderBottom: `1px solid #3a35411f`, minWidth: '50%', flex: 1 }}
                        >
                          {typeof value === 'object'
                            ? JSON.stringify(value)
                            : value === true
                            ? 'Si'
                            : value === false
                            ? 'No'
                            : value}
                        </Typography>
                      </Box>
                    )
                  }

                  return null
                })}
            </Box>
          </BoxScroll>
        </DialogContent>
      </Box>
    </Dialog>
  )
}
