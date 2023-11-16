import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { useTheme } from '@mui/material/styles'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useFetch } from 'src/hooks/useFetch'
import { AxiosResponse } from 'axios'
import { useAuth } from 'src/hooks/useAuth'
import CreateForm, { IFormItem } from '../admin/components/CreateForm'
import { validate } from 'uuid'
import * as yup from 'yup'
import EditProfile from '../admin/components/EditProfile'

interface FetchData {
  fetch: (url: string, config?: object, setPage?: any) => Promise<AxiosResponse<any, any>>
  data: any
}
export default function UserInfo() {
  // ** Hooks
  const theme = useTheme()
  const { fetch, data } = useFetch() as FetchData
  const { user } = useAuth()

  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const dataTable = {
    email: data?.data?.username,
    nombre: data?.data?.nombre,
    apellido: data?.data?.apellido,
    dni: data?.data?.dni,
    dirección: data?.data?.direccion,
    teléfono: data?.data?.telefono
  }

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const inputs: IFormItem[] = [
    {
      name: 'username',
      label: 'Email',
      value: data?.data?.username,
      validation: yup.string().required('*Username es un campo requerido.').email('*Debe ingresar un email válido.')
    },
    {
      name: 'direccion',
      label: 'Dirección',
      value: data?.data?.direccion
    },
    {
      name: 'telefono',
      label: 'Teléfono',
      value: data?.data?.telefono
    }
  ]

  useEffect(() => {
    fetch('usuario')
  }, [openEdit])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ minHeight: 600 }}>
            <CardContent
              sx={{
                minHeight: 600,

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <Box
                sx={{
                  pt: 15,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}
              >
                <CustomAvatar
                  src={'/images/clientGeneral.png'}
                  variant='rounded'
                  alt={'foto de perfil'}
                  sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
                />

                <Typography variant='h6' sx={{ textTransform: 'capitalize', mb: 4 }}>
                  {user?.username?.toLocaleUpperCase()}
                </Typography>
              </Box>
              <Divider />
              <Typography variant='body1' fontWeight={900}>
                Detalles de usuario
              </Typography>

              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',

                  gap: 2,
                  mt: 2
                }}
              >
                {dataTable &&
                  Object.entries(dataTable).map(([key, value]: any) => {
                    if (key !== 'clientes' && key !== 'rol' && key !== 'estado') {
                      return (
                        <Box key={key} sx={{ display: 'flex' }}>
                          <Typography variant='body2' component={'span'} sx={{ color: 'black', minWidth: '25%' }}>
                            {key.toLocaleUpperCase()}
                          </Typography>
                          <Typography
                            variant='body2'
                            component={'span'}
                            sx={{ borderBottom: `1px solid #3a35411f`, minWidth: '65%', flex: 1 }}
                          >
                            {typeof value === 'object' ? JSON.stringify(value) : value}
                          </Typography>
                        </Box>
                      )
                    }

                    return null
                  })}
              </Box>
              <Button variant='contained' onClick={handleEditClickOpen} sx={{ width: 180, alignSelf: 'center', mt: 8 }}>
                Editar perfil
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {openEdit && (
        <EditProfile
          open={openEdit}
          type='EDITAR'
          title='Perfil'
          handleCloseDialog={handleEditClose}
          inputs={inputs}
          url={'usuario/actualizar'}
        />
      )}
    </>
  )
}
