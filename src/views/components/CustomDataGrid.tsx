import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'

export const CustomDataGrid: any = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    justifyContent: 'center'
  },
  '& .MuiDataGrid-cell': {
    justifyContent: 'center'
  },
  '& .MuiDataGrid-footerContainer': {
    minHeight: '1px !important'
  },
  '& .MuiDataGrid-selectedRowCount ': {
    display: 'none !important'
  }
}))
