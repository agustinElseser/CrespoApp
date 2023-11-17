import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { useMediaQuery, useTheme } from '@mui/material'
import { useFetch } from 'src/hooks/useFetch'
import { dataToExcel } from 'src/views/utils/dataToExcel'
import { IQueryFilter } from 'src/views/components/SearchFilter'
import TableHeaders from 'src/views/components/TableHeaders'
import { CumstomDialog } from 'src/views/components/CustomDialog'
import StepperCreateClaim from 'src/views/reclamos/components/createClaim/StepperCreateClaim'
import dayjs from 'dayjs'
import { ClaimProvider } from 'src/views/reclamos/components/createClaim/context/ClaimContext'
import { tableClaims, tableClaimsResponsive } from 'src/views/reclamos/tables/tableClaims'

const initialFilter = {
  desde: dayjs().startOf('month').startOf('day'),
  hasta: dayjs(),
  filtrar: '',
  activos: true
}
export default function MyClaimsList() {
  // ** State
  const [type, setType] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)
  const [filter, setFilter] = useState<IQueryFilter>(initialFilter)

  //** Hooks
  const { fetch, data, loading } = useFetch()

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
    dataToExcel(type === 'all' ? data : data?.slice(currentPage * pageSize, (currentPage + 1) * pageSize))
  }

  const getData = () => {
    fetch('reclamos/mis-reclamos')
  }

  useEffect(() => {
    getData()
  }, [open, filter?.desde, filter?.hasta, pageSize, currentPage, filter?.value])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeaders
              buttons={isSmallScreen ? [2, 3] : [2, 6, 1, 4, 5]}
              buttonsTitle={['nuevo reclamo']}
              handleFilter={handleFilter}
              toggle={toggleModal}
              handleDowload={handleDowload}
              filter={filter}
            />
            <DataGrid
              rows={data.data ?? []}
              columns={isSmallScreen ? tableClaimsResponsive : tableClaims}
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
      {open && type === 'nuevo reclamo' && (
        <CumstomDialog
          maxWidth={'lg'}
          open={open && type === 'nuevo reclamo'}
          disableEscapeKeyDown
          style={{ zIndex: 1000 }}
        >
          <ClaimProvider close={handleClose}>
            <StepperCreateClaim handleClose={handleClose} />
          </ClaimProvider>
        </CumstomDialog>
      )}
    </>
  )
}
MyClaimsList.acl = {
  action: 'manage',
  subject: 'mis-reclamos'
}
