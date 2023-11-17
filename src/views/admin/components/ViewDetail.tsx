import { useState, useRef, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Box, Divider, Theme, createStyles, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useAuth } from 'src/hooks/useAuth'
import { useFetch } from 'src/hooks/useFetch'
import { Icon } from '@iconify/react'
import { BoxScroll } from 'src/views/components/BoxScroll'
import CustomChip from 'src/@core/components/mui/chip'
import { DataGrid } from '@mui/x-data-grid'
import { tableTracking, tableTrackingResponsive } from 'src/views/reclamos/tables/tableTracking'

interface IProps {
  handleCloseDialog: () => void
  row: any
  keyOfActivate: string
  data: object
  open: boolean
  type: string
  ignore: string[]
  title: string
  url: string
}

export default function ViewDetail({ handleCloseDialog, row, open, type, data, ignore, title, url }: IProps) {
  const theme = useTheme()
  const { fetch, data: dataDetail } = useFetch()

  useEffect(() => {
    if (open && type === 'view-detail') {
      fetch(`${url}/${row.id}`)
    }
  }, [open && type === 'view-detail'])

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  if (open && type === 'view-detail') {
    return (
      <Dialog maxWidth={isSmallScreen ? 'xs' : 'xl'} onClose={handleCloseDialog} open={open && type === 'view-detail'}>
        <DialogTitle
          id='customized-dialog-title'
          sx={{
            p: 5,
            pt: 2,
            pb: 2,
            backgroundColor: theme.palette.primary.dark,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ color: 'rgba(0,0,0,0.7)', fontWeight: 600 }}>{title.toLocaleUpperCase()} </Typography>
          </Box>
          <IconButton
            aria-label='close'
            onClick={handleCloseDialog}
            sx={{ color: 'rgba(0,0,0,0.7)', justifySelf: 'end' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 3, p: 5, minWidth: isSmallScreen ? 300 : 400 }}>
          <BoxScroll
            className='containScroll'
            sx={{
              maxHeight: '700px',
              overflowY: 'auto',
              overflowX: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              pr: 3
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant='body1' sx={{ fontWeight: 600 }}>
                Información general
              </Typography>
              {dataDetail?.data &&
                Object.entries(dataDetail.data).map(([key, value]: any) => {
                  if (!ignore.includes(key)) {
                    return (
                      <Box key={key} sx={{ display: 'flex' }}>
                        <Typography variant='body2' component={'span'} sx={{ color: 'black', minWidth: '40%' }}>
                          {key.toLocaleUpperCase()}
                        </Typography>
                        <Typography
                          variant='body2'
                          component={'span'}
                          sx={{
                            borderBottom: `1px solid #3a35411f`,
                            minWidth: '50%',
                            flex: 1
                          }}
                        >
                          {typeof value === 'object' ? JSON.stringify(value) : value}
                        </Typography>
                      </Box>
                    )
                  }

                  return null
                })}
              {dataDetail?.data?.img && (
                <>
                  <Typography variant='body1' sx={{ fontWeight: 600, mt: 5 }}>
                    Imágenes
                  </Typography>

                  {dataDetail.data.img.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt={`Imagen ${index}`} style={{ maxWidth: 800 }} />
                  ))}
                </>
              )}
              {dataDetail && (
                <Box sx={{ width: 800, mt: 6 }}>
                  <Typography variant='body1' sx={{ fontWeight: 600 }}>
                    Seguimiento
                  </Typography>
                  <Divider sx={{ mb: '0px !important' }} />

                  <DataGrid
                    rows={dataDetail?.data?.Seguimiento ?? []}
                    columns={isSmallScreen ? tableTrackingResponsive : tableTracking}
                    rowHeight={75}
                    autoHeight
                    disableColumnMenu
                    disableColumnFilter
                    disableColumnSelector
                    hideFooterSelectedRowCount
                    hideFooterPagination
                  />
                </Box>
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                {/* {dataDetail.findedComplaints?.image
                  ? dataDetail.findedComplaints.image?.map((e, index) => {
                      return (
                        <img
                          key={index}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            maxWidth: '200px',
                            maxHeight: '200px'
                          }}
                          src={e}
                          alt=''
                        ></img>
                      )
                    })
                  : null} */}
              </div>
            </Box>
          </BoxScroll>
        </DialogContent>
      </Dialog>
    )
  } else {
    return null
  }
}
