import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from '@mui/material'
import { useFetch } from 'src/hooks/useFetch'
import { IQueryFilter } from 'src/views/components/SearchFilter'
import TableHeaders from 'src/views/components/TableHeaders'
import dayjs from 'dayjs'
import { TableCreate } from 'src/views/admin/tables/tableCreate'
import CreateForm, { IFormItem } from 'src/views/admin/components/CreateForm'
import { useAuth } from 'src/hooks/useAuth'
import * as yup from 'yup'
import { tableAdminUsers } from 'src/views/admin/tables/tableAdminUsers'

const initialFilter = {
  desde: dayjs().startOf('month').startOf('day'),
  hasta: dayjs(),
  filtrar: '',
  inactivos: true
}

export default function UserList() {
  // ** State
  const [type, setType] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)
  const [filter, setFilter] = useState<IQueryFilter>(initialFilter)
  //const [data, setData] = useState<IAudiosSA[]>()

  //** Hooks
  const { fetch, data, loading } = useFetch()
  const { fetch: getAreas, data: dataAreas } = useFetch()
  const theme = useTheme()
  const { user } = useAuth()

  // ** Functions
  const handleClose = () => setOpen(false)

  const toggleModal = (type: string) => {
    setType(type)
    setOpen(!open)
  }

  const handleFilter = (name: keyof IQueryFilter, value: IQueryFilter[keyof IQueryFilter]) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }))
  }

  const handleItem = () => getData('admin')

  const getData = url => fetch(url)

  useEffect(() => {
    if (filter.inactivos) {
      getData('admin/todas')
    } else {
      getData('admin')
    }
    setFilter({ ...filter, filtrar: '' })
  }, [open, filter?.desde, filter?.hasta, pageSize, currentPage, filter?.value, filter?.filtrar, filter.inactivos])

  const inputs: IFormItem[] = [
    {
      name: 'username',
      label: 'Email',
      validation: yup
        .string()
        .required('correo es un campo requerido.')
        .email('Debe ingresar un correo electrónico válido.')
    },
    {
      name: 'password',
      label: 'Contraseña'
    },
    {
      name: 'rol',
      label: 'Rol',
      select: true,
      options: [
        { id: 'EMPLEADO', nombre: 'EMPLEADO' },
        { id: 'CAPATAZ', nombre: 'CAPATAZ' },
        { id: 'JEFE', nombre: 'JEFE' }
      ],
      validation: 'none'
    },
    {
      name: 'areas',
      label: 'Area',
      select: true,
      options: dataAreas.data,
      validation: 'none'
    }
  ]

  const tableConfig = tableAdminUsers(handleItem, 'usuario', 'admin')

  useEffect(() => {
    if (open) {
      getAreas('area')
    }
  }, [open])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeaders
              buttonsTitle={['usuario']}
              buttons={[2, 6, 1, 4, 7, 5]}
              handleFilter={handleFilter}
              toggle={toggleModal}
              filter={filter}
            />
            <DataGrid
              rows={data?.data ?? []}
              columns={tableConfig}
              autoHeight
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
              hideFooterSelectedRowCount
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={(newPageSize: number) => {
                setPageSize(newPageSize)
                setCurrentPage(0)
              }}
              page={currentPage}
              pageSize={pageSize}
              onPageChange={(params: number) => setCurrentPage(params)}
              loading={loading}
              localeText={{
                MuiTablePagination: {
                  labelDisplayedRows: ({ from, to, count }) => `${from} - ${to} de ${count}`,
                  labelRowsPerPage: 'Filas por página'
                }
              }}
              components={{
                NoRowsOverlay: () => <div style={{ textAlign: 'center', padding: '40px' }}>No hay data disponible</div>
              }}
            />
          </Card>
        </Grid>
      </Grid>
      {open && type === 'usuario' && (
        <CreateForm
          open={open && type === 'usuario'}
          type='AGREGAR'
          title='usuario'
          handleCloseDialog={handleClose}
          inputs={inputs}
          url={'admin'}
        />
      )}
    </>
  )
}
