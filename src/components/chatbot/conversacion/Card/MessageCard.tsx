import { Alert, Button, Card, CardActions, CardContent, FormControl, Grid, MenuItem, Stack, TextField } from '@mui/material'
import React from 'react'
import Icon from 'src/@core/components/icon'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import EditorControlled from 'src/views/forms/form-elements/editor/EditorControlled';
import EditorUncontrolled from 'src/views/forms/form-elements/editor/EditorUncontrolled';
import RichTextEditor from '../Editor/RickTextEditor';

const MessageCard = () => {
  const [close, setClose] = React.useState(true)
  const [addWord, setAddWord]= React.useState(false)
  const [match, setMatch] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setMatch(event.target.value);
  };
  
  return (
    <>
    <Card variant='elevation' sx={{ display: 'flex', my:5 }} style={{alignItems:'center'}} >
    <CardContent sx={{ flex: '1 0 auto' }}>
    <p>
      Agregar una nueva palabra clave
    </p>
    </CardContent>
    <CardActions style={{alignSelf:'center'}}>
        <Button variant='contained' color='primary' size='small' onClick={()=>setAddWord(true)}>
            <Icon icon='mdi:plus'/>
        </Button>
    </CardActions>
    </Card>
   { addWord && <Card variant='elevation' sx={{  my:5, width:'100%'}} style={{alignItems:'center'}} >
    <CardContent sx={{ flex: '1 0 auto',  width:'100%' }}>
    <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue={'Titulo para identificar tus palabras claves'}
                    fullWidth
                    variant='outlined'
                />
                 {close &&<Stack  sx={{ width: '100%', mt:5 }} spacing={2}>
                 <Alert variant="outlined" severity="info" color='warning' onClose={() => {setClose(false)}} >
                 <span style={{color:'black'}}>Si ya creaste un botón en la conversación, el chatbot responderá correctamente cuando tu visitante presione esa opción o la escriba. No es necesario que crees una palabra clave igual.
                 Aquí puedes crear respuestas a <strong>palabras o frases que no sean parte de la conversación que hayas configurado.</strong></span>
                </Alert>

                 </Stack>}
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:5}}>
                            <Grid item xs={6}>
                            <div>
                              <p><strong>Si el cliente escribe:</strong></p>
                              <TextField
                              sx={{mt:5}}
                              hiddenLabel
                              id="filled-hidden-label-small"
                              defaultValue={'presupuesto'}
                              fullWidth
                              variant='outlined'
                              />
                               <TextField
                               sx={{mt:5}}
                              hiddenLabel
                              id="filled-hidden-label-small"
                              defaultValue={'precio'}
                              fullWidth
                              variant='outlined'
                              /> <TextField
                              sx={{mt:5}}
                              hiddenLabel
                              id="filled-hidden-label-small"
                              defaultValue={'Frase o palabras claves'}
                              fullWidth
                              variant='outlined'
                              />
                              <Button  sx={{mt:5}} variant='text' color='primary' size='medium' startIcon={<Icon icon='mdi:plus'/>} >
                                  Agregar palabras claves relacionadas
                              </Button>
                            </div>
                            </Grid>
                            <Grid item xs={6}>
                            <div> 
                               <p><strong>Tipo de concordancia:</strong></p>
                               <FormControl sx={{ mt:5}} fullWidth>
                                <Select
                                  value={match}
                                  onChange={handleChange}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                  variant='outlined'
                                  fullWidth
                                  defaultValue='Contiene'
                                >
                                  <MenuItem value="">
                                   Contiene
                                  </MenuItem>
                                  <MenuItem value={'Contiene'}>Contiene</MenuItem>
                                  <MenuItem value={'Exacta'}>Exacta</MenuItem>
                                  
                                </Select>
                              
                                </FormControl>
                                <FormControl sx={{ mt:5 }}fullWidth >
                                <Select
                                  value={match}
                                  onChange={handleChange}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                  variant='outlined'
                                  fullWidth
                                  defaultValue='Contiene'
                                >
                                   <MenuItem value="">
                                   Contiene
                                  </MenuItem>
                                  <MenuItem value={'Contiene'}>Contiene</MenuItem>
                                  <MenuItem value={'Exacta'}>Exacta</MenuItem>
                                  
                                </Select>
                              
                                </FormControl>
                                <FormControl sx={{ mt:5}} fullWidth>
                                <Select
                                  value={match}
                                  onChange={handleChange}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                  variant='outlined'
                                  fullWidth
                                  defaultValue='Exacta'
                                >
                                  <MenuItem value="">
                                   Exacta
                                  </MenuItem>
                                  <MenuItem value={'Contiene'}>Contiene</MenuItem>
                                  <MenuItem value={'Exacta'}>Exacta</MenuItem>
                                  
                                </Select>
                              
                                </FormControl>
                              </div>
                          
                            </Grid>
                            <Grid item>
                            <p><strong>Entonces el bot responderá:</strong></p>
                            <RichTextEditor/>
                            </Grid>
                           
                          
                        </Grid>

    </CardContent>
    <CardActions style={{alignSelf:'flex-end'}}>
      <Button variant='contained' size='medium' color='primary' onClick={()=>setAddWord(false)} >Guardar</Button>
    </CardActions>
    </Card>
    }
    </>
  )
}

export default MessageCard