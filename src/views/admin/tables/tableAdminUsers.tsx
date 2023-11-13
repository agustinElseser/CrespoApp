import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { MouseEvent, useEffect, useState } from 'react'
import { useFetch } from 'src/hooks/useFetch'
import { Icon } from '@iconify/react'
import CreateForm, { IFormItem } from '../components/CreateForm'
import DeleteForm from '../components/DeleteForm'
import CustomChip from 'src/@core/components/mui/chip'

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
        <IconButton color='warning'>
          <Icon icon='mdi:file-eye' fontSize={26} />
        </IconButton>
        <IconButton color='info' onClick={() => handleOpenDialog('edit')}>
          <Icon icon='mdi:file-document-edit' fontSize={26} />
        </IconButton>
        <IconButton color='error' onClick={() => handleOpenDialog('delete')}>
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

export const tableAdminUsers = (handleItem, item, url) => {
  const tableConfig = [
    {
      flex: 0.7,
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
      width: 200,
      field: 'rol',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      headerName: 'rol',
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {row.rol.map((rol, index) => (
              <CustomChip
                key={rol}
                skin='light'
                size='small'
                label={rol}
                color={'info'}
                sx={{ textTransform: 'capitalize', border: '1px solid' }}
              />
            ))}
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
            {row.roles.map((rol, index) => (
              <CustomChip
                key={rol}
                skin='light'
                size='small'
                label={rol}
                color={'info'}
                sx={{ textTransform: 'capitalize', border: '1px solid' }}
              />
            ))}
          </Box>
        )
      }
    },

    {
      flex: 0.3,
      minWidth: 190,
      field: 'fecha',
      sortable: false,
      headerName: 'Fecha',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.fecha_edit}
          </Typography>
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
