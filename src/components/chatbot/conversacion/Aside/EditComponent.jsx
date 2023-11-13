import { Box, Card, Divider, Switch, Tab, Tabs, TextField } from '@mui/material'
import React, { useState } from 'react'
import Icon from 'src/@core/components/icon'
import CustomTabPanel from '../CustomTab/CustomTabPanel';
import { generarID } from 'src/utils/mock/data';

const style={
    padding:' 0.5rem 2rem',
    borderRadius: '5px',
    border: '1px solid #80808059',
    marginTop: '5px'
}

const EditComponent = ({data, onClose}) => {

    const [checked, setChecked] = useState(true);
    const [value, setValue] = useState(0);
    const [newOption, setNewOption]= useState('')
    const [options, setOptions]= useState([])
     console.log(checked)
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
       const handleSwitchChange = (event) => {
        setChecked(!checked);
    };
    const addOption = () =>{
       if(newOption !== ''){
        setOptions([...options, {text:newOption, id:generarID()}])
        setNewOption('')
       }
    }
      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
      
  return (
    
    <div>
        <div>
            <Divider/>
               <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span>
              <h3>Estas editando <span style={{color:'#9155FD'}}>{data.title}</span></h3>
                </span> 
                <Icon icon='mdi:close' onClick={onClose}/>
               </div>
            <Divider/>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Configuracion General" {...a11yProps(0)} style={{textTransform:'capitalize'}} />
                    <Tab label="Avanzado" {...a11yProps(1)} style={{textTransform:'capitalize'}} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Card variant="elevation" style={{width:'100%', padding:'.5rem',  marginBottom:20, borderTop:'30px solid #28243d'}}>
                    <h4>TITULO</h4>
                <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue={data.title}
                    fullWidth
                    variant='outlined'
                />
                </Card>
                <Card variant="elevation" style={{width:'100%', padding:'.5rem',  marginBottom:20, borderTop:'30px solid #28243d'}}>
                    <h4>MENSAJE DEL BOT</h4>
                <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue={data.text}
                    fullWidth
                    multiline
                    variant='outlined'
                />
                </Card>
                <Card variant="elevation" style={{width:'100%', padding:'.5rem', marginBottom:20, borderTop:'30px solid #28243d'}}>
                    <h4>AGREGAR OPCION</h4>
                   <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <Switch checked={checked}
                        onChange={handleSwitchChange}
                        color='success'
                        />
                        <span>Respuesta del bot</span>
                   </div>
                     <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                     <Switch checked={!checked}
                    onChange={handleSwitchChange}
                    color='success'
                    />
                    <span>Agregar opción</span>
                   </div>
                  <div style={{display:'flex', justifyContent:'space-around', alignItems:'center',paddingLeft:'1rem'}}>
                    <Icon icon='mdi:plus' onClick={addOption}  /> 
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        defaultValue="Escriba la opción"
                        value={newOption}
                        style={{marginLeft:20}}
                        variant='outlined'
                        onChange={(e)=>setNewOption(e.target.value)}
                        disabled={checked}
                    />
                  </div>
                 {options.length > 0 &&  <div style={{padding:'.5rem', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    {options.length > 0 &&  options.map((e)=> <span style={style}  key={e.id}>{e.text}</span>)}
                  </div>}
                </Card>
                
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            <div style={{width:'100%', padding:'1.5rem', backgroundColor:'rgba(145, 85, 253, 0.14)', marginBottom:20}}>
                    <h4>Titulo</h4>
                <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue={data.title}
                    size="small"
                    variant='outlined'
                />
                </div>
                <div style={{width:'100%', padding:'1.5rem', backgroundColor:'rgba(145, 85, 253, 0.14)', marginBottom:20}}>
                    <h4>El bot responde</h4>
                <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue={data.text}
                    size="small"
                    variant='outlined'
                />
                </div>
                <div style={{width:'100%', padding:'1.5rem', backgroundColor:'rgba(145, 85, 253, 0.14)', marginBottom:20}}>
                    <h4>Agregar botón</h4>
                <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue="Nuevo botón"
                    size="small"
                    variant='outlined'
                    
                />
                </div>
            </CustomTabPanel>
        </div>
    </div>
  )
}

export default EditComponent