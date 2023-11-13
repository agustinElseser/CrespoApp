import { Grid, Stack, Tooltip, Button, Typography, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import InfoIcon from '@mui/icons-material/Info'
import SearchIcon from '@mui/icons-material/Search'
import toast from 'react-hot-toast'

/* import { useFetch } from 'src/hooks/useFectch' */

/* let token: any
if (typeof window !== 'undefined') {
  token = window.localStorage.getItem('accessToken')
} */

const UploadFile = ({ file, setFile, maxSize, size: sizeFile, title, infoTitle, pixels, src }: any) => {
  const [isUploading, setIsUploading] = useState(false)

  const [imgToRender, setImgToRender] = useState<any>(null)

  const cleanFiles = () => {
    setFile(null)
  }
  const uploadFile = (e: any) => {
    setIsUploading(true)
    setFile(null)
    if (e.target.files && e.target.files.length) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        const img = new Image()
        img.src = reader.result as string
        img.onload = () => {
          const height = img.naturalHeight
          const width = img.naturalWidth
          const size = e.target.files[0]?.size / maxSize

          /*  if (height !== pixels || width !== pixels) {
            toast.error(`La imagen debe ser ${pixels}px por ${pixels}px`)
            setIsUploading(false)
          } else if (size && size > 1) {
            toast.error(`El archivo debe pesar hasta ${sizeFile}`)
            setIsUploading(false)
          } else { */
          setFile(e.target.files[0])
          setIsUploading(false)

          /*  } */
        }
      }
    }
  }

  return (
    <Grid item xs={12} sm={6}>
      <Stack spacing={2} direction='row'>
        {/* <label htmlFor={'contained-button-file'}> */}
        {/*  <Input
            disabled={isUploading}
            type='file'
            name='file'
            accept='image/*'
            id='contained-button-file'
            onChange={e => uploadFile(e)}
          /> */}
        {/*  </label> */}
        <Stack spacing={2}>
          <Card sx={{ width: '120px', height: file ? 'auto' : '120px', padding: '1rem' }}>
            <Stack spacing={3} alignItems={'center'} justifyContent='center'>
              {file || src ? (
                <img
                  width={120}
                  alt={'imagen'}
                  src={file ? URL.createObjectURL(file) : imgToRender ? imgToRender : ''}
                />
              ) : null}
            </Stack>
          </Card>

          <Stack direction='row' alignItems='center' spacing={1}>
            {file ? (
              <Tooltip title={'Eliminar imagen'}>
                <ClearIcon sx={{ cursor: 'pointer' }} onClick={cleanFiles} />
              </Tooltip>
            ) : null}
            <Tooltip title={file?.name || ''}>
              <Typography variant='body1' component='span'>
                {!file ? null : file.name.length > 15 ? file.name.slice(0, 15) + '...' : file.name}
              </Typography>
            </Tooltip>
          </Stack>
        </Stack>

        {/*  <input style={{ display: 'none' }} type='file' onChange={e => uploadFile(e)} name='file' accept='image/*' /> */}
        <Stack direction='row' alignItems='center' spacing={1}>
          <Tooltip title={infoTitle}>
            <InfoIcon />
          </Tooltip>
          <Button disabled={isUploading} component='label' size='small' variant='contained' startIcon={<SearchIcon />}>
            {title}
            <input accept='image/png' onChange={e => uploadFile(e)} type='file' hidden />
          </Button>
        </Stack>
      </Stack>
    </Grid>
  )
}

export default UploadFile
