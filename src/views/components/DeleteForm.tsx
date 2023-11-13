import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Box, Button, DialogActions } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useFetch } from 'src/hooks/useFetch'

import { toast } from 'react-hot-toast'
import IconifyIcon from 'src/@core/components/icon'

interface IProps {
  handleCloseDialog: () => void
  id?: string | number
  type: string
  open: boolean
  title: string
  service: string
}

export default function DeleteForm({ handleCloseDialog, open, type, title, service, id }: IProps) {
  // ** Hooks
  const theme = useTheme()
  const { fetch, data, loading } = useFetch()

  const onSubmit = () => {
    fetch(`${service}/${id}`, {
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

  return (
    <Dialog maxWidth={'xs'} onClose={handleCloseDialog} open={open} fullWidth>
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
            ELIMINAR
          </Typography>
          <Typography sx={{ color: 'white', fontWeight: 600 }}>{title} </Typography>
        </Box>
        <IconButton aria-label='close' onClick={handleCloseDialog} sx={{ color: 'white', justifySelf: 'end' }}>
          <IconifyIcon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{ padding: 3, minHeight: 130, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography sx={{ color: 'rgba(0,0,0,0.7)', fontWeight: 400, textAlign: 'center' }}>
          {title === 'calle'
            ? `¿Esta seguro/a que desea eliminar esta ${title}?`
            : `¿Esta seguro/a que desea eliminar esta ${title}?`}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 3, pt: 0 }}>
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
