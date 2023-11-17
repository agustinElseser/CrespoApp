import { Box } from '@mui/system'
import { Menu, Switch, Tooltip, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { MouseEvent, useEffect, useState } from 'react'
import { useFetch } from 'src/hooks/useFetch'
import { Icon } from '@iconify/react'
import CreateForm, { IFormItem } from '../components/CreateForm'
import DeleteForm from '../components/DeleteForm'
import CustomChip from 'src/@core/components/mui/chip'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
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
}

const RowOptions = ({ row, item, handleItem, url }: IRowOptions) => {
  // ** States
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [type, setType] = useState<string>('')
  const { fetch: getAreas, data: dataAreas } = useFetch()

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
      name: 'username',
      value: row.username,
      label: 'Email',
      validation: yup
        .string()
        .required('correo es un campo requerido.')
        .email('Debe ingresar un correo electrónico válido.')
    },
    {
      name: 'rol',
      label: 'Rol',
      value: row.rol,
      select: true,
      options: [
        { id: 'EMPLEADO', nombre: 'EMPLEADO' },
        { id: 'CAPATAZ', nombre: 'CAPATAZ' },
        { id: 'JEFE', nombre: 'JEFE' }
      ],
      validation: yup.string()
    },
    {
      name: 'areas',
      label: 'Area',
      value: row.areas,
      select: true,
      multiple: true,
      options: dataAreas.data
    }
  ]
  useEffect(() => {
    if (openDialog) {
      getAreas('area')
    }
  }, [openDialog])

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Ver detalle'>
          <IconButton color='info' onClick={() => handleOpenDialog('additional')}>
            <Icon icon='mdi:file-eye' fontSize={26} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Editar'>
          <IconButton color='info' onClick={() => handleOpenDialog('edit')}>
            <Icon icon='mdi:file-document-edit' fontSize={26} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Eliminar'>
          <IconButton color='error' onClick={() => handleOpenDialog('delete')}>
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
      {openDialog && type === 'additional' && (
        <AdditionalData
          open={openDialog && type === 'additional'}
          type='DATALLE'
          title={row.rol}
          handleCloseDialog={handleCloseDialog}
          id={row.id}
          url={url}
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

const RowOptionsResponsive = ({ row, item, handleItem, url }: IRowOptions) => {
  // ** States
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [type, setType] = useState<string>('')
  const { fetch: getAreas, data: dataAreas } = useFetch()
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
      name: 'username',
      value: row.username,
      label: 'Email',
      validation: yup
        .string()
        .required('correo es un campo requerido.')
        .email('Debe ingresar un correo electrónico válido.')
    },
    {
      name: 'rol',
      label: 'Rol',
      value: row.rol,
      select: true,
      options: [
        { id: 'EMPLEADO', nombre: 'EMPLEADO' },
        { id: 'CAPATAZ', nombre: 'CAPATAZ' },
        { id: 'JEFE', nombre: 'JEFE' }
      ],
      validation: yup.string()
    },
    {
      name: 'areas',
      label: 'Area',
      value: row.areas,
      select: true,
      multiple: true,
      options: dataAreas.data
    }
  ]
  useEffect(() => {
    if (openDialog) {
      getAreas('area')
    }
  }, [openDialog])

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
            <IconButton color='info' onClick={() => handleOpenDialog('additional')}>
              <Icon icon='mdi:file-eye' fontSize={26} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Editar'>
            <IconButton color='info' onClick={() => handleOpenDialog('edit')}>
              <Icon icon='mdi:file-document-edit' fontSize={26} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Eliminar'>
            <IconButton color='error' onClick={() => handleOpenDialog('delete')}>
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
      {openDialog && type === 'additional' && (
        <AdditionalData
          open={openDialog && type === 'additional'}
          type='DATALLE'
          title={row.rol}
          handleCloseDialog={handleCloseDialog}
          id={row.id}
          url={url}
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

export const TableAdminUsers: any = (handleItem, item, url) => {
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
      flex: 0.7,
      field: 'nombre',
      sortable: false,
      headerName: 'Nombre',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.username}
          </Typography>
        )
      }
    },

    {
      width: 200,
      field: 'rol',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      headerName: 'rol',
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <CustomChip
              key={row.rol}
              size='small'
              skin='light'
              label={row.rol}
              color='warning'
              sx={{ textTransform: 'capitalize', border: '1px solid' }}
            />
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'area',
      sortable: false,
      headerName: 'Area',
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {row.areas?.map(
              (area, index) =>
                area.length > 0 && (
                  <CustomChip
                    key={area}
                    skin='light'
                    size='small'
                    label={area}
                    color='success'
                    sx={{ textTransform: 'capitalize', border: '1px solid' }}
                  />
                )
            )}
          </Box>
        )
      }
    },

    {
      flex: 0.3,
      minWidth: 190,
      field: 'fecha_editado',
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
            <Switch size='small' color='info' checked={row.activo} onClick={() => handleActive(row.id, row.activo)} />
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
        <RowOptions row={row} id={row.id} handleItem={handleItem} item={item} url={url} />
      )
    }
  ]

  return tableConfig
}
export const TableAdminUsersResponsive: any = (handleItem, item, url) => {
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
            {row.username}
          </Typography>
        )
      }
    },

    {
      width: 100,
      field: 'rol',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      headerName: 'rol',
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <CustomChip
              key={row.rol}
              size='small'
              skin='light'
              label={row.rol}
              color='warning'
              sx={{ textTransform: 'capitalize', border: '1px solid' }}
            />
          </Box>
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
            <Switch size='small' color='info' checked={row.activo} onClick={() => handleActive(row.id, row.activo)} />
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
        <RowOptionsResponsive row={row} id={row.id} handleItem={handleItem} item={item} url={url} />
      )
    }
  ]

  return tableConfig
}
