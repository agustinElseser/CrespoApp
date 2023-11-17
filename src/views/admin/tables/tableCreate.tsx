import { Box } from '@mui/system'
import { Menu, Switch, Tooltip, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useEffect, useState } from 'react'
import { useFetch } from 'src/hooks/useFetch'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'
import CreateForm, { IFormItem } from 'src/views/admin/components/CreateForm'
import { Icon } from '@iconify/react'
import DeleteForm from 'src/views/admin/components/DeleteForm'
import AdditionalData from '../components/AdditionalData'

interface CellType {
  row: any
}

interface IRowOptions {
  id: string
  row: any
  handleItem: any
  item: string
  url: string
  rol: string
}

const RowOptions = ({ row, item, handleItem, url, rol }: IRowOptions) => {
  // ** States
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [type, setType] = useState<string>('')

  // ** Functions
  const handleCloseDialog = () => {
    setOpenDialog(false)
    handleItem()
  }

  const handleOpenDialog = (type: string) => {
    setType(type)
    setOpenDialog(true)
  }

  const inputs: IFormItem[] = [
    {
      name: 'nombre',
      label: item === 'calle' ? 'Nombre de la calle' : `Nombre del ${item}`,
      value: row.nombre
    }
  ]

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Ver detalle'>
          <IconButton color='info'>
            <Icon icon='mdi:file-eye' fontSize={26} onClick={() => handleOpenDialog('additional')} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Editar'>
          <IconButton color='info' onClick={() => handleOpenDialog('edit')}>
            <Icon icon='mdi:file-document-edit' fontSize={26} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Eliminar'>
          <IconButton color='error' onClick={() => handleOpenDialog('delete')} disabled={rol !== 'JEFE'}>
            <Icon icon='mdi:delete-alert' fontSize={26} />
          </IconButton>
        </Tooltip>
      </Box>
      {openDialog && type === 'edit' && (
        <CreateForm
          open={openDialog && type === 'edit'}
          type='EDITAR'
          title={item}
          handleCloseDialog={handleCloseDialog}
          inputs={inputs}
          url={url}
          id={row.id}
        />
      )}
      {openDialog && type === 'delete' && (
        <DeleteForm
          open={openDialog && type === 'delete'}
          type='ELIMINAR'
          title={item}
          handleCloseDialog={handleCloseDialog}
          id={row.id}
          url={url}
        />
      )}
      {openDialog && type === 'additional' && (
        <AdditionalData
          open={openDialog && type === 'additional'}
          type='DATALLE'
          title={row.nombre}
          handleCloseDialog={handleCloseDialog}
          id={row.id}
          url={url}
        />
      )}
    </>
  )
}

const RowOptionsResponsive = ({ row, item, handleItem, url, rol }: IRowOptions) => {
  // ** States
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [type, setType] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // ** Functions
  const handleCloseDialog = () => {
    setOpenDialog(false)
    handleRowOptionsClose()
  }
  const handleOpenDialog = (type: string) => {
    setType(type)
    setOpenDialog(true)
    setAnchorEl(null)
  }

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const inputs: IFormItem[] = [
    {
      name: 'nombre',
      label: item === 'calle' ? 'Nombre de la calle' : `Nombre del ${item}`,
      value: row.nombre
    }
  ]

  return (
    <>
      <IconButton
        sx={{ minWidth: '3rem', p: 0, height: '2.5rem' }}
        aria-controls='simple-menu'
        aria-haspopup='true'
        color='info'
        onClick={handleRowOptionsClick}
      >
        <Icon icon='mdi:dots-horizontal-circle' fontSize={22} />
      </IconButton>
      <Menu keepMounted id='simple-menu' anchorEl={anchorEl} onClose={handleRowOptionsClose} open={Boolean(anchorEl)}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Ver detalle'>
            <IconButton color='info'>
              <Icon icon='mdi:file-eye' fontSize={26} onClick={() => handleOpenDialog('additional')} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Editar'>
            <IconButton color='info' onClick={() => handleOpenDialog('edit')}>
              <Icon icon='mdi:file-document-edit' fontSize={26} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Eliminar'>
            <IconButton color='error' onClick={() => handleOpenDialog('delete')} disabled={rol !== 'JEFE'}>
              <Icon icon='mdi:delete-alert' fontSize={26} />
            </IconButton>
          </Tooltip>
        </Box>
      </Menu>
      {openDialog && type === 'edit' && (
        <CreateForm
          open={openDialog && type === 'edit'}
          type='EDITAR'
          title={item}
          handleCloseDialog={handleCloseDialog}
          inputs={inputs}
          url={url}
          id={row.id}
        />
      )}
      {openDialog && type === 'delete' && (
        <DeleteForm
          open={openDialog && type === 'delete'}
          type='ELIMINAR'
          title={item}
          handleCloseDialog={handleCloseDialog}
          id={row.id}
          url={url}
        />
      )}
      {openDialog && type === 'additional' && (
        <AdditionalData
          open={openDialog && type === 'additional'}
          type='DATALLE'
          title={item}
          handleCloseDialog={handleCloseDialog}
          id={row.id}
          url={url}
        />
      )}
    </>
  )
}
interface ColumnItem {
  minWidth?: number
  maxWidth?: number
  flex?: number
  field?: string
  align?: string
  headerName: string
  sortable?: boolean
  renderCell: ({ row }: CellType) => void
}

export const TableCreate: any = (handleItem, item, url, rol) => {
  const { fetch, data, loading } = useFetch()

  const handleActive = (id, status) => {
    fetch(`${url}/${id}`, {
      method: status === false ? 'POST' : 'PUT'
    })
      .then(data => {
        toast.success(data.data.msg, {
          duration: 5000
        })
        handleItem()
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

  const tableConfig = [
    {
      flex: 1,
      field: 'nombre',
      sortable: false,
      headerName: 'Nombre',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.nombre}
          </Typography>
        )
      }
    },
    {
      flex: 1,
      field: 'id_creador',
      sortable: false,
      headerName: 'Creado por',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.id_usuario.username}
          </Typography>
        )
      }
    },
    {
      flex: 1,
      field: 'fecha',
      sortable: false,
      headerName: 'Fecha',
      renderCell: ({ row }: CellType) => {
        const fecha = dayjs(row.fecha_editado)

        return (
          <Typography noWrap variant='body2'>
            {fecha.format('DD/MM/YY - HH:mm')}
          </Typography>
        )
      }
    },
    {
      flex: 0.3,
      field: 'activo',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      headerName: 'Activo',
      renderCell: ({ row }: CellType) => {
        return (
          <Tooltip title='Cambiar estado'>
            <Switch
              size='small'
              color='info'
              checked={row.activo}
              disabled={rol !== 'JEFE'}
              onClick={() => handleActive(row.id, row.activo)}
            />
          </Tooltip>
        )
      }
    },
    {
      minWidth: 150,
      sortable: false,
      field: 'actions',
      align: 'center',
      headerAlign: 'center',
      headerName: 'ACCIONES',
      renderCell: ({ row }: CellType) => (
        <RowOptions row={row} id={row.id} handleItem={handleItem} item={item} url={url} rol={rol} />
      )
    }
  ]

  return tableConfig
}
export const TableCreateResponsive: any = (handleItem, item, url, rol) => {
  const { fetch, data, loading } = useFetch()

  const handleActive = (id, status) => {
    fetch(`${url}/${id}`, {
      method: status === false ? 'POST' : 'PUT'
    })
      .then(data => {
        toast.success(data.data.msg, {
          duration: 5000
        })
        handleItem()
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

  const tableConfig = [
    {
      flex: 1,
      field: 'nombre',
      sortable: false,
      headerName: 'Nombre',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.nombre}
          </Typography>
        )
      }
    },
    {
      width: 75,
      field: 'fecha',
      sortable: false,
      headerName: 'Fecha',
      renderCell: ({ row }: CellType) => {
        const fecha = dayjs(row.fecha_editado)

        return (
          <Typography noWrap variant='body2'>
            {fecha.format('DD/MM')}
          </Typography>
        )
      }
    },
    {
      width: 70,
      field: 'activo',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      headerName: 'EST',
      renderCell: ({ row }: CellType) => {
        return (
          <Tooltip title='Cambiar estado'>
            <Switch
              size='small'
              color='info'
              checked={row.activo}
              disabled={rol !== 'JEFE'}
              onClick={() => handleActive(row.id, row.activo)}
            />
          </Tooltip>
        )
      }
    },
    {
      width: 70,
      sortable: false,
      field: 'actions',
      align: 'center',
      headerAlign: 'center',
      headerName: 'ACC',
      renderCell: ({ row }: CellType) => (
        <RowOptionsResponsive row={row} id={row.id} handleItem={handleItem} item={item} url={url} rol={rol} />
      )
    }
  ]

  return tableConfig
}

// export const tableCreateForRoles = (handleItem, item, url) => {
//   const tableConfig = [
//     {
//       flex: 1,
//       field: 'nombre',
//       sortable: false,
//       headerName: 'Nombre',
//       renderCell: ({ row }: CellType) => {
//         return (
//           <Typography noWrap variant='body2'>
//             {row.nombre}
//           </Typography>
//         )
//       }
//     },
//     {
//       flex: 1,
//       field: 'reclamos_asociados',
//       headerName: 'Reclamos Asociados',
//       sortable: false,
//       renderCell: ({ row }: CellType) => {
//         return (
//           <Typography noWrap variant='body2'>
//             {row.reclamos_asociados && row.reclamos_asociados.length >= 1
//               ? row.reclamos_asociados.map(e => e).join(', ')
//               : 'No hay reclamos asoc.'}
//           </Typography>
//         )
//       }
//     },
//     {
//       flex: 1,
//       field: 'id_creador',
//       sortable: false,
//       headerName: 'Creado por',
//       renderCell: ({ row }: CellType) => {
//         return (
//           <Typography noWrap variant='body2'>
//             {row.id_creador}
//           </Typography>
//         )
//       }
//     },
//     {
//       flex: 1,
//       field: 'fecha_edit',
//       sortable: false,
//       headerName: 'Fecha ',
//       renderCell: ({ row }: CellType) => {
//         return (
//           <Typography noWrap variant='body2'>
//             {row.fecha_editado}
//           </Typography>
//         )
//       }
//     },
//     {
//       minWidth: 150,
//       sortable: false,
//       field: 'actions',
//       headerName: 'ACCIONES',
//       renderCell: ({ row }: CellType) => (
//         <RowOptionsRol row={row} id={row.id} handleItem={handleItem} item={item} url={url} rol={rol} />
//       )
//     }
//   ]

//   return tableConfig
// }

const RowOptionsRol = ({ id, row, item, handleItem, url, rol }: IRowOptions) => {
  // ** States
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [type, setType] = useState<string>('')

  // ** Functions
  const handleCloseDialog = () => {
    setOpenDialog(false)
    handleItem()
  }

  const handleOpenDialog = (type: string) => {
    setType(type)
    setOpenDialog(true)
  }

  const { fetch: getClaimsType, data: ClaimsType } = useFetch()

  const inputs: IFormItem[] = [
    {
      name: 'nombre',
      label: 'Nombre del rol',
      value: row.nombre
    },
    {
      name: 'reclamos_asociados',
      label: 'Reclamos asosiados',
      select: true,
      multiple: true,
      options: ClaimsType.data,
      value: row.reclamos_asociados
    }
  ]

  useEffect(() => {
    if (openDialog) {
      getClaimsType('complaint-types')
    }
  }, [openDialog && type === 'edit'])

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton color='warning'>
          <Icon icon='mdi:file-eye' fontSize={26} />
        </IconButton>
        <IconButton color='info' onClick={() => handleOpenDialog('edit')}>
          <Icon icon='mdi:file-document-edit' fontSize={26} />
        </IconButton>
        <IconButton color='error' onClick={() => handleOpenDialog('delete')} disabled={rol !== 'JEFE'}>
          <Icon icon='mdi:delete-alert' fontSize={26} />
        </IconButton>
      </Box>
      {openDialog && type === 'edit' && (
        <CreateForm
          open={openDialog && type === 'edit'}
          type='EDITAR'
          title={item}
          handleCloseDialog={handleCloseDialog}
          inputs={inputs}
          url={url}
          id={row.id}
        />
      )}
      {openDialog && type === 'delete' && (
        <DeleteForm
          open={openDialog && type === 'delete'}
          type='ELIMINAR'
          title={item}
          handleCloseDialog={handleCloseDialog}
          id={row.id}
          url={url}
        />
      )}
    </>
  )
}
