// ** React Imports
import { useState, useRef, useEffect } from 'react'

// ** MUI Imports

import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Box, Divider, Theme, createStyles } from '@mui/material'

// ** Theme
import { useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'
import { BoxScroll } from 'src/views/components/BoxScroll'

import { useFetch } from 'src/hooks/useFetch'

interface IProps {
  handleCloseDialog: () => void
  id: string | number
  row: any
  keyOfActivate: string
  data: object
  open: boolean
  type: string
  ignore: string[]
  title: string
}

export default function ReadAdditionalMetadata({
  handleCloseDialog,
  row,
  id,
  open,
  type,
  data,
  ignore,
  title
}: IProps) {
  // ** Hooks
  const theme = useTheme()

  if (open && type === 'additional') {
    return (
      <Dialog maxWidth={'xl'} onClose={handleCloseDialog} open={open && type === 'additional'}>
        <Box sx={{ width: '500px' }}>
          <DialogTitle
            id='customized-dialog-title'
            sx={{
              p: 4,
              backgroundColor: theme.palette.customColors.darkBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography variant='body1' sx={{ color: 'white', fontWeight: 400, mr: 2 }}>
                Metadata adicional -
              </Typography>
              <Typography sx={{ color: 'white', fontWeight: 600 }}>{title} </Typography>
            </Box>
            <IconButton aria-label='close' onClick={handleCloseDialog} sx={{ color: 'white', justifySelf: 'end' }}>
              <Icon icon='mdi:close' />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ mt: 7, p: 7 }}>
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
                <Typography variant='body2' sx={{ fontWeight: 600, color: '#9155FD' }}>
                  Información general
                </Typography>
                {data &&
                  Object.entries(data).map(([key, value]: any) => {
                    if (!ignore.includes(key)) {
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
                            {typeof value === 'object' ? JSON.stringify(value) : value}
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
  } else {
    return null
  }
}
