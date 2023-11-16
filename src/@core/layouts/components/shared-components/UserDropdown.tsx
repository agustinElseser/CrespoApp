// ** React Imports
import { useState, SyntheticEvent } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'

import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

import { IconButton, useTheme } from '@mui/material'

interface Props {
  settings: Settings
}

// ** Styled Components

//**  icono del usuario
const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const { logout, user } = useAuth()
  const theme = useTheme()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  return (
    <>
      <Avatar
        alt={user?.username.charAt(0).toLocaleUpperCase()}
        onClick={handleDropdownOpen}
        sx={{ bgcolor: theme.palette.customColors.darkBg, width: 40, height: 40, cursor: 'pointer' }}
      >
        <IconButton sx={{ color: '' }}>
          <Icon icon='mdi:account' fontSize={30} />
        </IconButton>
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 250, mt: 3 }, '& .MuiMenu-list': { padding: '0px !important' } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 3, bgcolor: theme.palette.customColors.darkBg }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography variant='body2' sx={{ fontWeight: 600 }} color={'rgba(0, 0, 0, 0.7)'}>
                {user?.username.toLocaleUpperCase()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: '0 !important' }} />
        <MenuItem
          sx={{ py: 3, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
          onClick={() => handleDropdownClose('/perfil')}
        >
          <Icon icon='mdi:account-outline' />
          Perfil
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{ py: 3, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
        >
          <Icon icon='mdi:logout-variant' />
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  )
}

export default UserDropdown
