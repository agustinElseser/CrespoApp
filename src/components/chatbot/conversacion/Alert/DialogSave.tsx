import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useContext } from 'react'
import {ChatConfigContext} from '../../../../context/ChatConfig'


const DialogSave = ({ handleCloseDialog, open }: any) => {
    const {setSave} = useContext(ChatConfigContext)

  const handleClick = () => {
   setSave(false)
   handleCloseDialog()
  }
  

  return (
    <Dialog maxWidth={'xs'} onClose={handleCloseDialog} open={open} fullWidth>
      <DialogTitle id='alert-dialog-title'>No has guardado tus cambios</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>¿Deseas guardarlos?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancelar</Button>
        <Button
          size='small'
          onClick={handleClick}
          variant='outlined'
        >
            Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogSave
