import { useCallback, useContext, useMemo, useState } from 'react'
import { Accept } from 'react-dropzone'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import { useDropzone } from 'react-dropzone'
import { Grid, ListItem, useMediaQuery, useTheme } from '@mui/material'
import { ClaimContext } from '../context/ClaimContext'

const baseStyle: React.CSSProperties = {
  display: 'flex',
  width: '100%',
  height: 100,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  borderWidth: 2,
  borderRadius: '10px',
  borderColor: '#d3d2d2',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
}

const activeStyle: React.CSSProperties = {
  borderColor: '#9155FD'
}

const acceptStyle: React.CSSProperties = {
  borderColor: '#9155FD'
}

const rejectStyle: React.CSSProperties = {
  borderColor: '#f3224b'
}

interface FileWithPreview extends File {
  preview: string
  progress: number
}

// ** Styled
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(15.75)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 160
  }
}))

// ** Archivos aceptados

const imgs: Accept = {
  'image/*': ['.jpg']
}

export default function DropzoneImg() {
  // ** Hooks
  const { query, image, handleQuery, setImages } = useContext(ClaimContext)

  // ** States
  const [files, setFiles] = useState<FileWithPreview[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const [file] = acceptedFiles

    const reader = new FileReader()
    reader.onload = () => {
      const fileContents = reader.result
      if (fileContents) {
        setImages([
          Object.assign(file, {
            id: file.name,
            preview: URL.createObjectURL(file)
          })
        ])
      }
    }
    reader.readAsText(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: imgs
  })

  const style = useMemo<React.CSSProperties>(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  )

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{ width: isSmallScreen ? '100%' : '60%' }}>
      <Box {...getRootProps({ style })} sx={{ display: 'flex' }}>
        <input {...getInputProps()} />

        <Box sx={{ fontSize: '0.9rem', color: 'black' }}>
          {isSmallScreen ? (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Icon icon='mdi:camera-plus' fontSize={15} />
              Tome una fotografía
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Icon icon='mdi:image-move' fontSize={15} />
              Arrastre una imagen
            </Box>
          )}
        </Box>
        <Box sx={{ fontSize: '0.7rem', color: 'grey' }}>
          {isSmallScreen ? 'o, seleccione una imagen de la biblioteca.' : 'o, haga click para explorar.'}
        </Box>
      </Box>

      {image?.length > 0 && (
        <Grid container sx={{ mt: 5 }}>
          {image?.map((file: any) => (
            <Grid item key={file.name} xs={12}>
              <ListItem
                key={file.name}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  border: '1px solid #d4d4d4',
                  borderRadius: '6px',
                  padding: '5px'
                }}
              >
                <Icon style={{ width: '2rem' }} color='warning' icon='mdi:file-image' />
                <Grid sx={{ padding: '0px', width: '100%' }}>
                  <Grid
                    item
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '0px',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography sx={{ fontSize: '0.8rem', color: 'black' }}>
                        {file.name.length > 25 ? `${file.name.slice(0, 25)}...` : file.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: 'black', ml: 2 }}>
                        {Math.round(file.size / 100) / 10 > 1000
                          ? `(${(Math.round(file.size / 100) / 10000).toFixed(1)} mb)`
                          : `(${(Math.round(file.size / 100) / 10).toFixed(1)} kb)`}
                      </Typography>
                    </Box>
                    <IconButton sx={{ padding: 0, justifySelf: 'end' }} onClick={() => handleQuery('img', undefined)}>
                      <Icon icon='mdi:close' fontSize={15} />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
