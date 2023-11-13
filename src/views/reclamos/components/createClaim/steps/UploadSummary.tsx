// ** React Imports
import { useContext, useEffect, useState } from 'react'
import { useFetch } from 'src/hooks/useFetch'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Components
import { ClaimContext } from '../context/ClaimContext'

import { Box, CircularProgress, styled } from '@mui/material'

import { useForm } from 'react-hook-form'

import toast from 'react-hot-toast'
import generateSummary from '../utils/generateSummary'

interface IFormItem3 {
  images: string[]
}

export const UploadSummary = ({ handleClose }: any) => {
  // ** Hooks
  const { fetch, data } = useFetch()
  const { query, activeStep, setActiveStep, handleQuery, handleFinished } = useContext(ClaimContext)

  // **Functions
  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const items: IFormItem3[] = [
    {
      images: []
    }
  ]
  const {
    control: control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    mode: 'onChange'
  })

  const [formData, setFormData] = useState({ image: [] })
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target
    const file = event.target.files && event.target.files[0]
    try {
      if (file) {
        const result = await uploadFile(file)
        const reader = new FileReader()
        setFormData(prevFormData => ({
          ...prevFormData,
          image: [...prevFormData.image, result]
        }))
        //handleUploadImage(result)
        reader.readAsDataURL(file)
      }
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  const handleSend = async () => {
    await handleFinished(formData.image)
  }

  return (
    <Grid container spacing={5} sx={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className='block uppercase text-blueGray-600 text-xs font-bold mb-2'>Agrega imagenes *</label>
          <input
            className='appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline'
            type='file'
            name='image'
            onChange={e => handleImageChange(e)}
            placeholder='Sube tu foto de perfil'
          />
        </div>

        {formData
          ? formData.image.map((e, index) => (
              <div style={{ display: 'flex', flexDirection: 'row' }} key={index}>
                <img
                  style={{
                    maxHeight: '200px',
                    maxWidth: '300px',
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                  src={e}
                  alt='Imagen subida'
                />
              </div>
            ))
          : null}
        {/* <button
            onClick={() => handleFinish()}
            style={{ position: "absolute", bottom: "10px", right: "10px" }}
          >
            Finalizar
          </button> */}
        <Button size='small' onClick={() => handleSend()} variant='contained'>
          Finalizar
        </Button>
      </div>
    </Grid>
  )
}
