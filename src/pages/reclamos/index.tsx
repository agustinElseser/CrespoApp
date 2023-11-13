import { useState, useEffect, useMemo } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import StepperLoadAudio from 'src/views/apps/speech/uploadAudio/StepperLoadAudio'
import { Dialog, useTheme } from '@mui/material'
import { SpeechProvider } from 'src/views/apps/speech/uploadAudio/context/SpeechContext'
import StepperCreateAnalysis from 'src/views/apps/speech/createAnalysis/StepperCreateAnalysis'
import { AnalysisProvider } from 'src/views/apps/speech/createAnalysis/context/AnalysisContext'
import { ColumnsAudios } from 'src/views/apps/speech/tables/tableAudios'
import { useFetch } from 'src/hooks/useFetch'
import { dataToExcel } from 'src/views/utils/dataToExcel'
import { IQueryFilter } from 'src/views/components/SearchFilter'
import { applyFilter } from 'src/views/utils/applyFilter'
import TableHeaders from 'src/views/components/TableHeaders'
import { CumstomDialog } from 'src/views/components/CustomDialog'
import SendReport from 'src/views/components/SendReport'
import { tableClaimsAdmin } from 'src/views/reclamos/tables/tableClaimAdmin'
import dayjs, { Dayjs } from 'dayjs'

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

  //** Hooks
  const { fetch, data, loading } = useFetch()
  const theme = useTheme()

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

  const getAudios = () => {
    fetch('usuario-reclamo')
  }

  useEffect(() => {
    getAudios()
  }, [open, filter?.desde, filter?.hasta, pageSize, currentPage, filter?.value, filter?.filtrar])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeaders
              buttons={[6, 1, 2, 4, 7, 5]}
              handleFilter={handleFilter}
              toggle={toggleModal}
              handleDowload={handleDowload}
              filter={filter}
            />
            <DataGrid
              rows={data ?? []}
              columns={tableClaimsAdmin}
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
