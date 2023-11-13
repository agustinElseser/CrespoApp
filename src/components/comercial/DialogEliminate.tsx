import { LoadingButton } from '@mui/lab'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { useFetch } from 'src/hooks/useFetch'
import toast from 'react-hot-toast'
import FormClient from './FormClient'

const DialogEliminate = ({ handleCloseDialog, url, title, fetchData, type, id, row }: any) => {
  const { fetch, loading } = useFetch()

  const handleClick = () => {
    fetch(url, {
      method: 'Delete'
    })
      .then(() => {
        toast.success(`${title} se realizo con exito`)
        handleCloseDialog()
        fetchData()
      })
      .catch(e => {
        toast.error(`Error con ${title}, si el error persiste contactese con soporte`)
        console.error(e)
        handleCloseDialog()
      })
  }
  if (type === 'Editar' && url.includes('client')) {
    return <FormClient data={row} fetchData={fetchData} id={id} handleCloseDialog={handleCloseDialog} />
  }

  return (
    <>
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>¿Seguro de elimar?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancelar</Button>
        <LoadingButton
          size='small'
          onClick={handleClick}
          loading={loading}
          loadingIndicator='Loading…'
          variant='outlined'
        >
          Aceptar
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default DialogEliminate
