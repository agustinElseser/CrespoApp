import { styled } from '@mui/material/styles'
import { Box } from '@mui/system'
import { Switch, Typography } from '@mui/material'
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton color='warning' onClick={() => handleOpenDialog('view-detail')}>
          <Icon icon='mdi:file-eye' fontSize={26} />
        </IconButton>
        <IconButton color='success' onClick={() => handleOpenDialog('follow')}>
          <Icon icon='mdi:file-move' fontSize={26} />
        </IconButton>
        <IconButton color='error' onClick={() => handleOpenDialog('delete')}>
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
        ignore={['id', 'status']}
        title={'Detalle'}
      />
      <CreateForm
        open={openDialog && type === 'follow'}
        type='AGREGAR'
        title='Seguimiento'
        handleCloseDialog={handleCloseDialog}
        inputs={inputs}
        url='asd'
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

export const tableClaimsAdmin: any = [
  {
    width: 90,
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
          {row.date}
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
          {row.calle}
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
          {row.entre}
        </Typography>
      )
    }
  },
  {
    minWidth: 140,
    flex: 1,
    field: 'type',
    headerName: 'Tipo',
    sortable: false,
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.type}
        </Typography>
      )
    }
  },
  // {
  //   minWidth: 160,
  //   flex: 1,
  //   field: 'types',
  //   headerName: 'Observaciones',
  //   sortable: false,
  //   renderCell: ({ row }: CellType) => {
  //     return (
  //       <Typography noWrap variant='body2'>
  //         {row.observ}
  //       </Typography>
  //     )
  //   }
  // },
  {
    minWidth: 130,
    flex: 0.5,
    field: 'STT',
    align: 'status',
    sortable: false,
    headerName: 'ESTADO',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.status === 1 ? 'FINALIZADO' : row.status === 2 ? 'PENDIENTE' : 'RECHAZADA'}
          color={row.status === 1 ? 'success' : row.status === 2 ? 'warning' : 'error'}
          sx={{ textTransform: 'capitalize', border: '1px solid' }}
        />
      )
    }
  },
  // {
  //   minWidth: 150,
  //   flex: 1,
  //   field: 'dateEdit',
  //   sortable: false,
  //   headerName: 'FECHA MODIFICACIÓN',
  //   renderCell: ({ row }: CellType) => {
  //     const date = new Date(row.date)
  //     const dateFormat = date.toLocaleString('es-ES', {
  //       day: 'numeric',
  //       month: 'short',
  //       year: 'numeric',
  //       hour: 'numeric',
  //       minute: 'numeric'
  //     })

  //     return (
  //       <Typography noWrap variant='body2'>
  //         {row.date_edit}
  //       </Typography>
  //     )
  //   }
  // },
  // {
  //   minWidth: 130,
  //   flex: 1,
  //   field: 'types2',
  //   headerName: 'Creado por',
  //   sortable: false,
  //   renderCell: ({ row }: CellType) => {
  //     return (
  //       <Typography noWrap variant='body2'>
  //         {row.creador}
  //       </Typography>
  //     )
  //   }
  // },
  {
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: 'ACCIONES',
    renderCell: ({ row }: CellType) => <RowOptions keyOfActivate={'enabled'} row={row} />
  }
]
