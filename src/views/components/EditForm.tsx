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
import { useState } from 'react'

interface IProps {
  handleCloseDialog: () => void
  id?: string | number
  type: string
  open: boolean
  title: string
  service: string
}
const schema = yup.object().shape({
  id_servicio: yup.string().required('Nombre es un campo requerido.'),
  id_pauta: yup.string().required('Nombre es un campo requerido.')
})
export default function EditForm({ handleCloseDialog, open, type, title, service, id }: IProps) {
  // ** Hooks
  const theme = useTheme()
  const { fetch, loading, data } = useFetch()

  // ** State
  const [services, setServices] = useState<any[]>([])

  const defaultValues = {
    id_servicio: undefined,
    id_pauta: undefined
  }

  // ** Functions
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

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
            EDITAR
          </Typography>
          <Typography sx={{ color: 'white', fontWeight: 600 }}>{title} </Typography>
        </Box>
        <IconButton aria-label='close' onClick={handleCloseDialog} sx={{ color: 'white', justifySelf: 'end' }}>
          <IconifyIcon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 7, p: 7 }}>
        <form key={1} onSubmit={handleSubmit(onSubmit)}>
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
                name='id_pauta'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    size='small'
                    label='URL CORTA'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    variant='outlined'

                    //error={Boolean(errors.metadata)}
                  ></TextField>
                )}
              />
              {errors.id_pauta && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  {errors.id_pauta.message}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </form>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 3, pt: 0 }}>
        <Button onClick={handleCloseDialog} color='secondary' variant='outlined'>
          Cancelar
        </Button>
        <Button variant='contained' onClick={() => onSubmit()} disabled={loading}>
          GUARDAR
        </Button>
      </DialogActions>
    </Dialog>
  )
}
