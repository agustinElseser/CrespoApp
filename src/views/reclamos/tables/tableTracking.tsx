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
import dayjs from 'dayjs'

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
        ignore={['id', 'status']}
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
        ignore={['id', 'status']}
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

export const tableTracking: any = [
  {
    width: 140,
    field: 'nombre',

    sortable: false,
    headerName: 'ESTADO',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.nombre}
          color={
            row.nombre === 'ENVIADO'
              ? 'info'
              : row.nombre === 'INICIADO'
              ? 'warning'
              : row.nombre === 'RESUELTO'
              ? 'success'
              : 'error'
          }
          sx={{ textTransform: 'capitalize', border: '1px solid' }}
        />
      )
    }
  },
  {
    width: 180,
    field: 'fecha_creado',
    sortable: false,
    headerName: 'FECHA',
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
    minWidth: 230,
    field: 'user',
    sortable: false,
    headerName: 'Usuario',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.id_usuario.username}
        </Typography>
      )
    }
  },
  {
    minWidth: 250,
    flex: 1,
    field: 'descripcion',
    sortable: false,
    headerName: 'Descripción',
    renderCell: ({ row }: CellType) => {
      return row.descripcion.length < 40 ? (
        <Typography noWrap variant='body2'>
          {row.descripcion}
        </Typography>
      ) : (
        <>
          <Tooltip title={row.descripcion}>
            <Typography noWrap variant='body2'>
              {row.descripcion.slice(0, 40)}
            </Typography>
          </Tooltip>
        </>
      )
    }
  }
]

export const tableTrackingResponsive: any = [
  {
    flex: 1,

    field: 'nombre',

    sortable: false,
    headerName: 'ESTADO',
    renderCell: ({ row }: CellType) => {
      const fecha = dayjs(row.fecha_editado)

      return (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <CustomChip
              skin='light'
              size='small'
              label={row.nombre}
              color={
                row.nombre === 'ENVIADO'
                  ? 'info'
                  : row.nombre === 'INICIADO'
                  ? 'warning'
                  : row.nombre === 'RESUELTO'
                  ? 'success'
                  : 'error'
              }
              sx={{ textTransform: 'capitalize', border: '1px solid' }}
            />
            <Typography noWrap variant='body2'>
              {fecha.format('DD/MM - HH:mm')}
            </Typography>
            <Typography noWrap variant='body2'>
              {row.id_usuario.username}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', mt: 3 }}>
            <Typography noWrap variant='body2'>
              {row.descripcion}
            </Typography>
          </Box>
        </Box>
      )
    }
  }
]
