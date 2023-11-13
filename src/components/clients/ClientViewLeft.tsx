// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'

import Divider from '@mui/material/Divider'

import Typography from '@mui/material/Typography'

import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'

import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Icon Imports

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

const statusColors: any = {
  0: 'error',
  1: 'info'
}

const ClientViewLeft = ({ dataClient, cardInfo }: any) => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  if (dataClient) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CustomAvatar
                src={'/images/clientGeneral.png'}
                variant='rounded'
                alt={'avatar cliente'}
                sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
              />

              <Typography variant='h6' sx={{ textTransform: 'capitalize', mb: 4 }}>
                {dataClient.razon_social}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={dataClient.status ? 'Activo' : 'Inactivo'}
                color={statusColors[dataClient.status]}
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Detalles de cliente</Typography>
              <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
              {cardInfo.map((card: any) => {
                return (
                  <Box key={card.label} sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{card.label}</Typography>

                      <Typography variant='body2'>{dataClient[card.field]}</Typography>
                    </Box>
                  </Box>
                )
              })}
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
              <Button color='error' variant='outlined' onClick={() => setSuspendDialogOpen(true)}>
                Suspend
              </Button>
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
              aria-describedby='user-view-edit-description'
            >
              <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Edit User Information
              </DialogTitle>
              <DialogContent></DialogContent>

              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button variant='contained' sx={{ mr: 1 }} onClick={handleEditClose}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default ClientViewLeft
