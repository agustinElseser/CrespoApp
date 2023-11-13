import { Icon } from '@iconify/react'
import { IconButton, Stack, Tooltip, Typography } from '@mui/material'

type ContactType = {
  nombre: string
  apellido: string
  tipo: number
  email: string
  telefono_principal: string
  telefono_secundario: string
  descripcion: string
  id?: string
}

interface CellContactType {
  row: ContactType
}

export const columnsContacts = (removeField: any, editField: any, renderAction: boolean) => {
  return [
    {
      minWidth: 150,
      field: 'nombre',
      headerName: 'Nombre',
      renderCell: ({ row }: CellContactType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.nombre || '-'}
          </Typography>
        )
      }
    },
    {
      minWidth: 150,
      field: 'apellido',
      headerName: 'Apellido',
      renderCell: ({ row }: CellContactType) => {
        const { apellido } = row

        return (
          <Typography noWrap variant='body2'>
            {apellido || '-'}
          </Typography>
        )
      }
    },
    {
      minWidth: 150,
      field: 'tipo',
      headerName: 'Tipo de Contacto',
      renderCell: ({ row }: CellContactType) => {
        const { tipo } = row

        return (
          <Typography noWrap variant='body2'>
            {tipo === 1
              ? 'Administrativo'
              : tipo === 2
              ? 'Comercial'
              : tipo === 3
              ? 'Representante Legal'
              : tipo === 4
              ? 'Técnico'
              : 'Gerencia'}
          </Typography>
        )
      }
    },
    {
      minWidth: 120,
      headerName: 'Email',
      field: 'email',
      renderCell: ({ row }: CellContactType) => {
        return <Typography noWrap>{row.email || '-'}</Typography>
      }
    },

    /* {
    minWidth: 150,
    field: 'tipo',
    headerName: 'Tipo',
    renderCell: ({ row }: CellContactType) => {
      const { tipo } = row

      //gerencia o comercial es el tipo
      return (
        <Typography noWrap variant='body2'>
          {tipo}
        </Typography>
      )
    }
  }, */

    {
      minWidth: 120,
      headerName: 'Teléfono Principal',
      field: 'telefono_principal',
      renderCell: ({ row }: CellContactType) => {
        return <Typography noWrap>{row.telefono_principal || '-'}</Typography>
      }
    },
    {
      minWidth: 120,
      headerName: 'Telefono Secundario',
      field: 'telefono_secundario',
      renderCell: ({ row }: CellContactType) => {
        return <Typography noWrap>{row.telefono_secundario || '-'}</Typography>
      }
    },

    {
      minWidth: 120,
      headerName: 'Descripción',
      field: 'descripcion',
      renderCell: ({ row }: CellContactType) => {
        return <Typography noWrap>{row.descripcion || '-'}</Typography>
      }
    },
    {
      minWidth: 120,
      headerName: 'Accion',
      field: 'accion',
      renderCell: ({ row }: CellContactType) => {
        return (
          <>
            {renderAction ? (
              <Stack direction='row' spacing={2}>
                <Tooltip title='Editar campo'>
                  <IconButton disabled={!row.id} color='primary' aria-label='eliminar contacto'>
                    <Icon
                      icon={'material-symbols:edit'}
                      onClick={() => {
                        console.log(row)

                        if (row.id) {
                          editField(row.id)
                        }
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Eliminar campo'>
                  <IconButton disabled={!row.id} color='error' aria-label='eliminar contacto'>
                    <Icon
                      icon={'material-symbols:delete-outline-rounded'}
                      onClick={() => {
                        if (row.id) {
                          removeField(row.id)
                        }
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Stack>
            ) : null}
          </>
        )
      }
    }
  ]
}
