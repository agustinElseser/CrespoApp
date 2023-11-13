import { Box, Button, FormControl, FormHelperText, MenuItem, Select, TextField } from '@mui/material'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ThemeColor } from 'src/@core/layouts/types'

export interface IFormItem {
  name: string
  label: string
  placeholder?: string
  select?: boolean
  multiple?: boolean
  multiline?: boolean
  options?: { id: string; nombre: string }[]
  validation?: any
}

export interface IFormButton {
  name: string
  action: any
  color: ThemeColor
}

export interface IFormInputsProps {
  items: IFormItem[]
  buttons?: IFormButton[]
}

export interface IDefaultValues {
  [key: string]: string
}

export default function FormInputs({ items, buttons }: IFormInputsProps) {
  // Esquema de validaciones
  const schema = yup.object().shape({
    ...items.reduce((acc: any, item: IFormItem) => {
      let validation = yup
        .string()
        .required(`${item.label} es un campo requerido.`)
        .max(30, `${item.label} no puede tener más de 30 caracteres.`)
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]+$/, `${item.label} sólo puede contener letras y números.`)

      if (item.validation) {
        validation = item.validation
      }

      if (item.multiple) {
        acc[item.name] = yup
          .array()
          .of(validation)
          .required(`${item.label} es un campo requerido.`)
          .min(1, `${item.label} debe tener al menos una opción seleccionada.`)
      } else {
        acc[item.name] = validation
      }

      return acc
    }, {})
  })

  //Valores por defecto
  const defaultValues: IDefaultValues = {
    ...items.reduce((acc: any, item: IFormItem) => {
      return {
        ...acc,
        [item.name]: item.multiple ? [] : ''
      }
    }, {})
  }

  console.log(defaultValues, 'deffff')
  //Opciones formulario
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (values: any) => {
    console.log(values, '????????')
  }

  const handleGuardar = () => {
    console.log(items)
  }

  return (
    <form id='1' onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, mt: 4, mb: 1 }}>
        {items?.map(item => (
          <FormControl key={item.name} sx={{ width: '100%' }}>
            <Controller
              name={item.name}
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
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
                  onBlur={onBlur}
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

        <Button variant='contained' size='large' onClick={() => handleGuardar()}>
          GUARDARR
        </Button>
      </Box>
    </form>
  )
}
