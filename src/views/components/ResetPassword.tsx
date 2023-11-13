import { useTheme } from '@mui/material/styles'
import { useFetch } from 'src/hooks/useFetch'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Box } from '@mui/material'
import IconifyIcon from 'src/@core/components/icon'

interface IProps {
  handleCloseDialog: () => void
  open: boolean
}

export default function ResetPassword({ handleCloseDialog, open }: IProps) {
  // ** Hooks
  const theme = useTheme()
  const { fetch, loading, data } = useFetch()

  return (
    <Dialog maxWidth={'xs'} onClose={handleCloseDialog} open={open} fullWidth>
      <DialogTitle
        id='customized-dialog-title'
        sx={{
          p: 3,
          backgroundColor: theme.palette.primary.dark,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant='body1' sx={{ fontWeight: 500 }}>
          RESETEO DE CONTRASEÑA
        </Typography>

        {/* <IconButton aria-label='close' onClick={handleCloseDialog} sx={{ color: 'white', justifySelf: 'end' }}>
          <IconifyIcon icon='mdi:close' />
        </IconButton> */}
      </DialogTitle>
      <Box sx={{ p: 7 }}>
        <Typography variant='body1' sx={{ fontWeight: 400 }}>
          Siga las instrucciones que le enviamos al correo para restablecer su contraseña.
        </Typography>
      </Box>
    </Dialog>
  )
}
