// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'

import Icon from 'src/@core/components/icon'
import { DataGrid } from '@mui/x-data-grid'

interface Props {
  tabsInfo: any
}

// ** Styled Tab component
const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 40,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
      minWidth: 130
    }
  }
}))

const ClientViewRight = ({ tabsInfo }: Props) => {
  // ** State

  const [value, setValue] = useState<string>('0')
  const [pageSize, setPageSize] = useState<number>(10)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList variant='scrollable' scrollButtons='auto' onChange={handleChange}>
        {tabsInfo.map((tab: any, index: number) => (
          <Tab
            key={tab.label}
            value={index.toString()}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                <Icon fontSize={20} icon={tab.icon} />
                {tab.label}
              </Box>
            }
          />
        ))}
      </TabList>
      <Box sx={{ mt: 4 }}>
        <>
          {tabsInfo.map((tab: any, index: number) => (
            <TabPanel key={index + tab.label} value={index.toString()}>
              <div style={{ height: '75vh', width: '100%' }}>
                <DataGrid
                  autoHeight
                  rows={tab.data}
                  columns={tab.columns}
                  pageSize={pageSize}
                  disableSelectionOnClick
                  rowsPerPageOptions={[10, 25, 50]}
                  onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                />
              </div>
            </TabPanel>
          ))}
        </>
      </Box>
    </TabContext>
  )
}

export default ClientViewRight
