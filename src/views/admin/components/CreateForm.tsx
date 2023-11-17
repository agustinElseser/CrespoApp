import { useState, useEffect } from 'react'
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
  MenuItem,
  TextField,
  useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useFetch } from 'src/hooks/useFetch'

import dayjs, { Dayjs } from 'dayjs'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import { Icon } from '@iconify/react'
import DateTimePickers from 'src/views/components/DateTimePickers'

interface IProps {
  handleCloseDialog: () => void
  id?: string | number
  type: string
  open: boolean
  title: string
  inputs: IFormItem[]
  url: string
}

interface IQueryFilter {
  desde?: Dayjs
  hasta?: Dayjs
  fecha?: Dayjs
}

export interface IFormItem {
  name: string
  label: string
  placeholder?: string
  select?: boolean
  multiple?: boolean
  value?: string | string[]
  multiline?: boolean
  options?: { id: string; nombre: string }[]
  validation?: any
}

export interface IDefaultValues {
  [key: string]: string
}

const initialState: IQueryFilter = {
  fecha: dayjs()
}

export default function CreateForm({ handleCloseDialog, open, type, title, inputs, url, id }: IProps) {
  // ** Hooks
  const theme = useTheme()
  const { fetch, loading } = useFetch()
  const [query, setQuery] = useState(initialState)

  // Esquema de validaciones
  const schema = yup.object().shape({
    ...inputs.reduce((acc: any, item: IFormItem) => {
      let validation = yup
        .string()
        .required(`${item.label} es un campo requerido.`)
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/, `${item.label} sólo puede contener letras y números.`)

      if (item.validation) {
        validation = item.validation
      }

      if (item.multiple) {
        acc[item.name] = yup
          .array()
          .required(`${item.label} es un campo requerido.`)
          .min(1, `${item.label} debe tener al menos una opción seleccionada.`)
      } else {
        acc[item.name] = validation
      }

      return acc
    }, {})
  })

  // Valores por defecto
  const defaultValues: IDefaultValues = {
    ...inputs.reduce((acc: any, item: IFormItem) => {
      return {
        ...acc,
        [item.name]: item.multiple ? item.value || [] : item.value || ''
      }
    }, {})
  }

  //Opciones formulario
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (values: any) => {
    fetch(type === 'EDITAR' ? `${url}/${id}` : url, {
      method: type === 'EDITAR' ? 'PATCH' : 'POST',
      data: { ...values }
    })
      .then(data => {
        toast.success(data?.data?.msg, {
          duration: 5000
        })
        reset()
        handleCloseDialog()
      })
      .catch(error => {
        toast.error(error.response?.data?.msg, {
          duration: 5000,
          style: {
            zIndex: 999999999999
          }
        })
      })
  }

  const handleQuery = (name: keyof IQueryFilter, value: IQueryFilter[keyof IQueryFilter]) => {
    setQuery({ ...query, [name]: value })
  }
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog maxWidth={isSmallScreen ? 'xs' : 'md'} onClose={handleCloseDialog} open={open} sx={{ zIndex: 999 }}>
      <form id={title} onSubmit={handleSubmit(onSubmit)}>
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
        <DialogContent sx={{ p: 6, mt: 3 }}>
          <Box
            sx={{
              minWidth: isSmallScreen ? 200 : 350,
              mt: 4,
              mb: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8
            }}
          >
            {/* {title === 'Seguimiento' && <DateTimePickers query={query} handleQuery={handleQuery} />} */}
            {inputs?.map(item => (
              <FormControl key={item.name} sx={{ width: '100%' }}>
                <Controller
                  name={item.name}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      size='small'
                      fullWidth
                      {...(item.select && { select: true })}
                      {...(item.multiline && { multiline: true })}
                      SelectProps={{
                        multiple: item.multiple ? true : false
                      }}
                      minRows={5}
                      placeholder={item.placeholder ?? ''}
                      label={item.label}
                      value={value}
                      onChange={onChange}
                      variant='outlined'
                      color='warning'
                      error={Boolean(errors[item.name])}
                    >
                      {item.select &&
                        item.options &&
                        item.options.map(option => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                    </TextField>
                  )}
                />
                {errors[item.name] && (
                  <FormHelperText sx={{ color: 'error.main' }} id={item.name}>
                    {errors[item?.name]?.message?.toString()}
                  </FormHelperText>
                )}
              </FormControl>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', p: 6, pt: 0 }}>
          <Button onClick={handleCloseDialog} color='secondary' variant='outlined'>
            Cancelar
          </Button>
          <Button variant='contained' type='submit' disabled={loading}>
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
