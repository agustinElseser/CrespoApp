import { Button, Card, CardContent, Grid, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import Icon from 'src/@core/components/icon'
import { alpha } from '@mui/material/styles'
import { useRouter } from 'next/router'

const CardServiceChatbot = ({ item }: { item: any }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Grid item xs={2}>
      <Card
        sx={{
          backgroundColor: alpha(item.color, 0.2),
          boxShadow: `4px 4px 8px 3px ${alpha(theme.palette.grey[600], 0.15)}`,
          p: 2,
          position: 'relative'
        }}
      >
        <CardContent sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            sx={{
              width: '100px',
              position: 'absolute',
              top: 20,
              left: -30,
              background: theme.palette.primary.main,
              color: 'white',
              transform: 'rotate(-45deg)',
              display: 'flex',
              justifyContent: 'center',
              pl: 2
            }}
          >
            <Typography variant='body2' fontWeight={600} sx={{ color: 'white' }}>
              {item.entorno}
            </Typography>
          </Box>
          <IconButton onClick={handleClick} sx={{ position: 'absolute', top: 5, right: 5 }} color='primary'>
            <Icon icon='mdi:cog' fontSize={25} />
          </IconButton>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose()
                router.push(`chatbot/configuracion/general`)
              }}
            >
              General
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose()
                router.push(`chatbot/configuracion/conversacion`)
              }}
            >
              Conversacion
            </MenuItem>
          </Menu>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 5 }}>
            <Icon icon={item.icon} color={theme.palette.primary.main} fontSize={40} />
            <Typography variant='h6' fontWeight={900} sx={{ mt: 3 }}>
              {item.title.toUpperCase()}
            </Typography>
            <Typography variant='body2' fontWeight={500}>
              {item.subtitle}
            </Typography>
            <Button
              key={7}
              size='small'
              sx={{ width: '100%', mt: 2 }}
              variant='contained'
              onClick={() => router.push(`chatbot/detalle/${item.title}`)}
            >
              Ver detalle
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default CardServiceChatbot
