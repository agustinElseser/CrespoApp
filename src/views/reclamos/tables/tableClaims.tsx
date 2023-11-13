import { styled } from '@mui/material/styles'
import { Box } from '@mui/system'
import { Switch, Typography } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import IconButton from '@mui/material/IconButton'
import { useState, MouseEvent } from 'react'
import { Icon } from '@iconify/react'
import ViewDetail from 'src/views/admin/components/ViewDetail'

interface CellType {
  row: any
}

interface IRowOptions {
  row: any
  keyOfActivate: string
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
        <IconButton color='error'>
          <Icon icon='mdi:delete-alert' fontSize={26} />
        </IconButton>
      </Box>
      <ViewDetail
        handleCloseDialog={handleCloseDialog}
        keyOfActivate={keyOfActivate}
        row={row}
        data={row}
        open={openDialog}
        type={type}
        ignore={['_id', 'status', 'id', 'image']}
        title={'Detalle'}
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
    flex: 0.5,
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
            row.estado.toLowerCase() === 'enviado'
              ? 'warning'
              : row.estado.toLowerCase() === 'finalizado'
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
    minWidth: 150,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    field: 'actions',
    headerName: 'ACCIONES',
    renderCell: ({ row }: CellType) => <RowOptions keyOfActivate={'enabled'} row={row} />
  }
]
