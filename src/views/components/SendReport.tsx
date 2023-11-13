import { useTheme } from '@mui/material/styles'
import { useFetch } from 'src/hooks/useFetch'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import {
  Box,
  Button,
  DialogActions,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  Theme,
  createStyles
} from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'

import IconifyIcon from 'src/@core/components/icon'
import { IQueryFilter } from './SearchFilter'

interface IProps {
  handleCloseDialog: () => void
  filter?: IQueryFilter
  open: boolean
  service: string
}
const schema = yup.object().shape({
  email: yup.string().email('Debe ser un correo válido').required('Correo es un campo requerido.')
})

export default function SendReport({ handleCloseDialog, open, filter, service }: IProps) {
  // ** Hooks
  const theme = useTheme()
  const { fetch, loading, data } = useFetch()

  const defaultValues = {
    email: undefined
  }

  // ** Functions
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = values => {
    const query = {
      email: values.email,
      desde: filter?.desde?.format('YYYY-MM-DD'),
      hasta: filter?.hasta?.format('YYYY-MM-DD'),
      search: filter?.value ?? undefined,
      id_servicio: filter?.id_servicio ?? undefined
    }
    fetch(`/${service}/audios/reports/send-via-email`, {
      method: 'POST',
      data: query
    })
      .then(data => {
        toast.success('Reporte enviado.', {
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

  console.log(filter)

  return (
    <Dialog maxWidth={'xs'} onClose={handleCloseDialog} open={open} fullWidth>
      <form key={1} onSubmit={handleSubmit(onSubmit)}>
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
              ENVIAR INFORME
            </Typography>
            <Typography sx={{ color: 'white', fontWeight: 600 }}> {service.toLocaleUpperCase()}</Typography>
          </Box>
          <IconButton aria-label='close' onClick={handleCloseDialog} sx={{ color: 'white', justifySelf: 'end' }}>
            <IconifyIcon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 7, p: 4 }}>
          <Typography variant='body1' sx={{ fontWeight: 400 }}>
            Ingrese el correo donde sea recibir el informe:
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              alignSelf: 'center',
              width: '100%',
              gap: 8
            }}
          >
            <FormControl fullWidth>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    size='small'
                    label='Correo'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    variant='outlined'
                    error={Boolean(errors.email)}
                  ></TextField>
                )}
              />
              {errors.email && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 3, pt: 0 }}>
          <Button onClick={handleCloseDialog} color='secondary' variant='outlined'>
            Cancelar
          </Button>
          <Button variant='contained' type='submit' disabled={loading}>
            ENVIAR
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
