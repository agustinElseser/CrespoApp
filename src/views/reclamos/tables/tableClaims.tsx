import { styled } from '@mui/material/styles'
import { Box } from '@mui/system'
import { Button, Menu, Switch, Typography } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import IconButton from '@mui/material/IconButton'
import { useState, MouseEvent } from 'react'
import { Icon } from '@iconify/react'
import ViewDetail from 'src/views/admin/components/ViewDetail'
import dayjs from 'dayjs'
import DeleteForm from 'src/views/admin/components/DeleteForm'

interface CellType {
  row: any
}

interface IRowOptions {
  row: any
  keyOfActivate: string
}

const RowOptionsMenu = ({ keyOfActivate, row }: IRowOptions) => {
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
  }

  const handleClick = () => {
    console.log()
  }

  return (
    <>
      <IconButton
        sx={{ minWidth: '3rem', p: 0, height: '2.5rem' }}
        aria-controls='simple-menu'
        aria-haspopup='true'
        color='info'
        onClick={handleRowOptionsClick}
      >
        <Icon icon='mdi:dots-horizontal-circle' fontSize={26} />
      </IconButton>
      <Menu keepMounted id='simple-menu' anchorEl={anchorEl} onClose={handleRowOptionsClose} open={Boolean(anchorEl)}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color='info' onClick={() => handleOpenDialog('view-detail')}>
            <Icon icon='mdi:file-eye' fontSize={26} />
          </IconButton>
          <IconButton color='error' disabled={row.estado !== 'ENVIADO'} onClick={() => handleOpenDialog('delete')}>
            <Icon icon='mdi:delete-alert' fontSize={26} />
          </IconButton>
        </Box>
      </Menu>
      {openDialog && type === 'view-detail' && (
        <ViewDetail
          handleCloseDialog={handleCloseDialog}
          keyOfActivate={keyOfActivate}
          row={row}
          data={row}
          open={openDialog}
          type={type}
          ignore={['_id', 'status', 'img', 'Seguimiento']}
          title={`Detalle reclamo - ${row.tipo_reclamo.nombre}`}
          url='reclamos/mis-reclamos'
        />
      )}
      {openDialog && type === 'delete' && (
        <DeleteForm
          open={openDialog && type === 'delete'}
          type='ELIMINAR'
          title={'reclamo'}
          handleCloseDialog={handleCloseDialog}
          id={row.id}
          url={'reclamos/mis-reclamos'}
        />
      )}
    </>
  )
}

const RowOptions = ({ keyOfActivate, row }: IRowOptions) => {
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
  }

  const handleClick = () => {
    console.log()
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton color='info' onClick={() => handleOpenDialog('view-detail')}>
          <Icon icon='mdi:file-eye' fontSize={26} />
        </IconButton>
        <IconButton color='error' disabled={row.estado !== 'ENVIADO'} onClick={() => handleOpenDialog('delete')}>
          <Icon icon='mdi:delete-alert' fontSize={26} />
        </IconButton>
      </Box>

      {openDialog && type === 'view-detail' && (
        <ViewDetail
          handleCloseDialog={handleCloseDialog}
          keyOfActivate={keyOfActivate}
          row={row}
          data={row}
          open={openDialog}
          type={type}
          ignore={['_id', 'status', 'img', 'Seguimiento']}
          title={`Detalle reclamo - ${row.tipo_reclamo.nombre}`}
          url='reclamos/mis-reclamos'
        />
      )}
      {openDialog && type === 'delete' && (
        <DeleteForm
          open={openDialog && type === 'delete'}
          type='ELIMINAR'
          title={'reclamo'}
          handleCloseDialog={handleCloseDialog}
          id={row.id}
          url={'reclamos/mis-reclamos'}
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

export const tableClaims: any = [
  {
    flex: 0.7,
    width: 110,
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
    flex: 1,
    field: 'fecha_creado',
    sortable: false,
    headerName: 'FECHA ALTA',
    renderCell: ({ row }: CellType) => {
      const fecha = dayjs(row.fecha_creado)

      return (
        <Typography noWrap variant='body2'>
          {fecha.format('DD/MM/YY - HH:mm')}
        </Typography>
      )
    }
  },
  {
    width: 140,
    field: 'estado',
    sortable: false,
    align: 'center',
    headerAlign: 'center',
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
    flex: 1,
    field: 'fecha_editado',
    sortable: false,
    headerName: 'FECHA MODIFICACIÓN',
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
    minWidth: 150,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    field: 'actions',
    headerName: 'ACCIONES',
    renderCell: ({ row }: CellType) => <RowOptions keyOfActivate={'enabled'} row={row} />
  }
]

export const tableClaimsResponsive: any = [
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
    align: 'center',
    headerAlign: 'center',
    headerName: 'FECHA',
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
          <RowOptionsMenu keyOfActivate={'enabled'} row={row} />
        </>
      )
    }
  }
]
