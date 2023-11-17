import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Box, Button, DialogActions, Divider, Theme, createStyles, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useFetch } from 'src/hooks/useFetch'

import { toast } from 'react-hot-toast'
import { Icon } from '@iconify/react'

interface IProps {
  handleCloseDialog: () => void
  id?: string | number
  type: string
  open: boolean
  title: string
  url: string
}

export default function DeleteForm({ handleCloseDialog, open, type, title, url, id }: IProps) {
  // ** Hooks
  const theme = useTheme()
  const { fetch, data, loading } = useFetch()

  const onSubmit = () => {
    fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
      .then(data => {
        toast.success(data.data.msg, {
          duration: 5000
        })
        handleCloseDialog()
      })
      .catch(error => {
        toast.error(error.response.data.msg, {
          duration: 5000,
          style: {
            zIndex: 999999999999
          }
        })
      })
  }
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog maxWidth={isSmallScreen ? 'xs' : 'xs'} onClose={handleCloseDialog} open={open} fullWidth>
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
            {type}
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
      <DialogContent
        sx={{
          padding: 6,
          minWidth: isSmallScreen ? 200 : 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography sx={{ color: 'rgba(0,0,0,0.7)', fontWeight: 400, textAlign: 'center', mt: 6 }}>
          {title === 'calle'
            ? `¿Esta seguro/a que desea eliminar esta ${title}?`
            : `¿Esta seguro/a que desea eliminar este ${title}?`}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 6, pt: 0 }}>
        <Button onClick={handleCloseDialog} color='secondary' variant='outlined'>
          Cancelar
        </Button>
        <Button variant='contained' color='error' onClick={() => onSubmit()} disabled={loading}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
