import { styled } from '@mui/material/styles'
import { Box } from '@mui/system'
import { Menu, Switch, Tooltip, Typography } from '@mui/material'
import * as yup from 'yup'
import IconButton from '@mui/material/IconButton'
import { useState, MouseEvent } from 'react'
import { Icon } from '@iconify/react'
import CustomChip from 'src/@core/components/mui/chip'
import ViewDetail from '../../admin/components/ViewDetail'
import CreateForm, { IFormItem } from '../../admin/components/CreateForm'
import DeleteForm from '../../admin/components/DeleteForm'

interface CellType {
  row: any
}

interface IRowOptions {
  row: any
  keyOfActivate: string
  handleItem: any
}

const RowOptions = ({ keyOfActivate, row, handleItem }: IRowOptions) => {
  // ** Hooks
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // ** States
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [type, setType] = useState<string>('')
  const rowOptionsOpen = Boolean(anchorEl)

  // ** Functions

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleCloseDialog = () => {
    handleItem()
    setOpenDialog(false)
    handleRowOptionsClose()
  }
  const handleOpenDialog = (type: string) => {
    setType(type)
    setOpenDialog(true)
  }

  const inputs: IFormItem[] = [
    {
      name: 'nombre',
      label: 'Estado',
      select: true,
      options: [
        { id: 'INICIADO', nombre: 'INICIADO' },
        { id: 'RESUELTO', nombre: 'RESUELTO' },
        { id: 'RECHAZADO', nombre: 'RECHAZADO' }
      ],
      validation: yup.string().required('Este campo es requerido.')
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      placeholder: 'Ingrese detalles del estado actual...',
      multiline: true,
      validation: yup.string().required('Este campo es requerido.')
    }
  ]

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Ver detalle'>
          <IconButton color='info' onClick={() => handleOpenDialog('view-detail')}>
            <Icon icon='mdi:file-eye' fontSize={26} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Dar seguimiento'>
          <IconButton color='info' onClick={() => handleOpenDialog('follow')}>
            {/* <Icon icon='mdi:clipboard-edit' fontSize={26} /> */}
            <Icon icon='mdi:receipt-text-edit' fontSize={26} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Eliminar'>
          <IconButton color='error' onClick={() => handleOpenDialog('delete')}>
            <Icon icon='mdi:delete-alert' fontSize={26} />
          </IconButton>
        </Tooltip>
      </Box>
      <ViewDetail
        handleCloseDialog={handleCloseDialog}
        keyOfActivate={keyOfActivate}
        row={row}
        data={row}
        open={openDialog}
        type={type}
        ignore={['id', 'status', 'Seguimiento']}
        title={'Detalle'}
        url='reclamos'
      />
      <CreateForm
        open={openDialog && type === 'follow'}
        type='EDITAR'
        title='Seguimiento'
        handleCloseDialog={handleCloseDialog}
        inputs={inputs}
        url='reclamos'
        id={row.id}
      />
      <DeleteForm
        open={openDialog && type === 'delete'}
        type='ELIMINAR'
        title='Reclamo'
        handleCloseDialog={handleCloseDialog}
        url={''}
      />
    </>
  )
}

const RowOptionsMenu = ({ keyOfActivate, row, handleItem }: IRowOptions) => {
  // ** Hooks
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // ** States
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [type, setType] = useState<string>('')
  const rowOptionsOpen = Boolean(anchorEl)

  // ** Functions

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    handleRowOptionsClose()
  }
  const handleOpenDialog = (type: string) => {
    setType(type)
    setOpenDialog(true)
    setAnchorEl(null)
  }

  const inputs: IFormItem[] = [
    {
      name: 'status',
      label: 'Estado',
      select: true,
      options: [{ id: '1', nombre: 'EN REVISIÓN' }]
    },
    {
      name: 'observacion',
      label: 'Descripción',
      placeholder: 'Ingrese detalles del estado actual...',
      multiline: true,
      validation: yup.string().required('Este campo es requerido.')
    }
  ]

  return (
    <>
      <IconButton
        sx={{ minWidth: '3rem', p: 0, height: '2.5rem' }}
        aria-controls='simple-menu'
        aria-haspopup='true'
        color='secondary'
        onClick={handleRowOptionsClick}
      >
        <Icon icon='mdi:dots-horizontal-circle' fontSize={22} />
      </IconButton>
      <Menu keepMounted id='simple-menu' anchorEl={anchorEl} onClose={handleRowOptionsClose} open={Boolean(anchorEl)}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Ver detalle'>
            <IconButton color='info' onClick={() => handleOpenDialog('view-detail')}>
              <Icon icon='mdi:file-eye' fontSize={26} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Dar seguimiento'>
            <IconButton color='info' onClick={() => handleOpenDialog('follow')}>
              {/* <Icon icon='mdi:clipboard-edit' fontSize={26} /> */}
              <Icon icon='mdi:receipt-text-edit' fontSize={26} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Eliminar'>
            <IconButton color='error' onClick={() => handleOpenDialog('delete')}>
              <Icon icon='mdi:delete-alert' fontSize={26} />
            </IconButton>
          </Tooltip>
        </Box>
      </Menu>

      <ViewDetail
        handleCloseDialog={handleCloseDialog}
        keyOfActivate={keyOfActivate}
        row={row}
        data={row}
        open={openDialog}
        type={type}
        ignore={['id', 'status', 'Seguimiento']}
        title={'Detalle'}
        url='reclamos'
      />
      <CreateForm
        open={openDialog && type === 'follow'}
        type='AGREGAR'
        title='Seguimiento'
        handleCloseDialog={handleCloseDialog}
        inputs={inputs}
        url=''
      />
      <DeleteForm
        open={openDialog && type === 'delete'}
        type='ELIMINAR'
        title='Reclamo'
        handleCloseDialog={handleCloseDialog}
        url={''}
      />
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

export const tableClaimsAdmin: any = handleItem => {
  return [
    {
      width: 120,
      field: 'id',
      sortable: false,
      headerName: 'Nº',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.id}
          </Typography>
        )
      }
    },
    {
      minWidth: 120,
      flex: 1,
      field: 'date',
      sortable: false,
      headerName: 'FECHA ALTA',
      renderCell: ({ row }: CellType) => {
        const date = new Date(row.date)
        const dateFormat = date.toLocaleString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        })

        return (
          <Typography noWrap variant='body2'>
            {row.fecha_creado}
          </Typography>
        )
      }
    },
    {
      minWidth: 140,
      flex: 1,
      field: 'calles',
      headerName: 'Calle',
      sortable: false,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.calle.nombre} {row.altura}
          </Typography>
        )
      }
    },
    {
      minWidth: 140,
      flex: 1,
      field: 'calle',
      headerName: 'Entre calles',
      sortable: false,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.entre_calle1.nombre} y {row.entre_calle2.nombre}
          </Typography>
        )
      }
    },
    {
      minWidth: 140,
      flex: 1,
      field: 'tipo_reclamo',
      headerName: 'Tipo',
      sortable: false,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.tipo_reclamo.nombre}
          </Typography>
        )
      }
    },

    {
      width: 140,
      flex: 0.5,
      field: 'estado',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      headerName: 'ESTADO',
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.estado.toUpperCase()}
            color={
              row.estado === 'ENVIADO'
                ? 'info'
                : row.estado === 'INICIADO'
                ? 'warning'
                : row.estado === 'RESUELTO'
                ? 'success'
                : 'error'
            }
            sx={{ textTransform: 'capitalize', border: '1px solid' }}
          />
        )
      }
    },
    {
      minWidth: 150,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      field: 'actions',
      headerName: 'ACCIONES',
      renderCell: ({ row }: CellType) => <RowOptions keyOfActivate={'enabled'} row={row} handleItem={handleItem} />
    }
  ]
}

export const tableClaimsAdminResponsive: any = handleItem => {
  return [
    {
      width: 120,
      field: 'id',
      sortable: false,
      headerName: 'Nº',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.id}
          </Typography>
        )
      }
    },
    {
      flex: 1,
      field: 'tipo_reclamo',
      headerName: 'TIPO',
      sortable: false,
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.tipo_reclamo.nombre}
          </Typography>
        )
      }
    },
    {
      flex: 0.5,
      field: 'fecha_editado',
      sortable: false,
      headerName: 'FECHA',
      renderCell: ({ row }: CellType) => {
        const date = new Date(row.date)
        const dateFormat = date.toLocaleString('es-ES', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        })

        return (
          <Typography noWrap variant='body2'>
            {row.fecha_editado}
          </Typography>
        )
      }
    },
    {
      width: 90,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      field: 'status',
      headerName: 'ESTADO',
      renderCell: ({ row }: CellType) => {
        return (
          <>
            <IconButton
              color={
                row.estado === 'ENVIADO'
                  ? 'info'
                  : row.estado === 'INICIADO'
                  ? 'warning'
                  : row.estado === 'RESUELTO'
                  ? 'success'
                  : 'error'
              }
            >
              {row.estado === 'ENVIADO' ? (
                <Icon icon='mdi:help-box-outline' fontSize={27} />
              ) : row.estado === 'INICIADO' ? (
                <Icon icon='mdi:alert-box-outline' fontSize={27} />
              ) : row.estado === 'RESUELTO' ? (
                <Icon icon='mdi:checkbox-marked-outline' fontSize={27} />
              ) : (
                <Icon icon='mdi:close-box-outline' fontSize={27} />
              )}
            </IconButton>
            <RowOptionsMenu keyOfActivate={'enabled'} row={row} handleItem={handleItem} />
          </>
        )
      }
    }
  ]
}
