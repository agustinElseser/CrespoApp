import { useState, useEffect, useMemo } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { useMediaQuery, useTheme } from '@mui/material'

import { useFetch } from 'src/hooks/useFetch'
import { IQueryFilter } from 'src/views/components/SearchFilter'
import TableHeaders from 'src/views/components/TableHeaders'
import { tableClaimsAdmin, tableClaimsAdminResponsive } from 'src/views/reclamos/tables/tableClaimAdmin'
import dayjs, { Dayjs } from 'dayjs'
import { applyFilter } from 'src/utils/applyFilter'

const initialFilter = {
  desde: dayjs().startOf('month').startOf('day'),
  hasta: dayjs(),
  filtrar: '',
  activos: true
}
export default function AudioList() {
  // ** State
  const [type, setType] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)
  const [filter, setFilter] = useState<IQueryFilter>(initialFilter)
  const [data, setData] = useState<any[]>()

  //** Hooks
  const { fetch, data: dataGet, loading } = useFetch()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

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

  const handleDowload = type => {
    //dataToExcel(type === 'all' ? data : data?.slice(currentPage * pageSize, (currentPage + 1) * pageSize))
  }

  const handleItem = () => {
    if (filter.inactivos) {
      getData('reclamos/todas')
    } else {
      getData('reclamos')
    }
  }
  const getData = url => fetch(url)

  useEffect(() => {
    if (filter.inactivos) {
      getData('reclamos/todas')
    } else {
      getData('reclamos')
    }
    setFilter({ ...filter, filtrar: '' })
  }, [open, filter?.desde, filter?.hasta, pageSize, currentPage, filter?.value, filter?.filtrar, filter.inactivos])

  const filteredData = useMemo(() => {
    const dataToFilter = dataGet?.data

    if (dataToFilter) {
      const dataFilter = applyFilter(dataToFilter, filter)
      setData(dataFilter)

      return dataFilter
    }
  }, [filter, dataGet.data])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeaders
              buttons={isSmallScreen ? [10, 6, 3] : [10, 6, 1, 2, 4, 5]}
              handleFilter={handleFilter}
              toggle={toggleModal}
              handleDowload={handleDowload}
              filter={filter}
            />
            <DataGrid
              rows={data ?? []}
              columns={isSmallScreen ? tableClaimsAdminResponsive(handleItem) : tableClaimsAdmin(handleItem)}
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
    </>
  )
}
