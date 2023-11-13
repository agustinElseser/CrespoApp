// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components

import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown, {
  NotificationsType
} from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { Button, Dialog } from '@mui/material'
import { useState } from 'react'

import { useAuth } from 'src/hooks/useAuth'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}
const notifications: NotificationsType[] = [
  {
    meta: 'Today',
    avatarAlt: 'Flora',
    title: 'Congratulation Flora! 🎉',
    avatarImg: '/images/avatars/4.png',
    subtitle: 'Won the monthly best seller badge'
  },
  {
    meta: 'Yesterday',
    avatarColor: 'primary',
    subtitle: '5 hours ago',
    avatarText: 'Robert Austin',
    title: 'New user registered.'
  },
  {
    meta: '11 Aug',
    avatarAlt: 'message',
    title: 'New message received 👋🏻',
    avatarImg: '/images/avatars/5.png',
    subtitle: 'You have 10 unread messages'
  },
  {
    meta: '25 May',
    title: 'Paypal',
    avatarAlt: 'paypal',
    subtitle: 'Received Payment',
    avatarImg: '/images/misc/paypal.png'
  },
  {
    meta: '19 Mar',
    avatarAlt: 'order',
    title: 'Received Order 📦',
    avatarImg: '/images/avatars/3.png',
    subtitle: 'New order received from John'
  },
  {
    meta: '27 Dec',
    avatarAlt: 'chart',
    subtitle: '25 hrs ago',
    avatarImg: '/images/misc/chart.png',
    title: 'Finance report has been generated'
  }
]

//** Bar navegacion completa

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hooks
  const { user } = useAuth()

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 100 }}>
        {hidden && !settings.navHidden ? (
          <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
              <Icon icon='mdi:menu' />
            </IconButton>
          </Box>
        ) : null}
        <Box sx={{ display: 'flex', gap: 5 }}>
          {/* <Button size='medium' color={'primary'} variant='outlined'>
            Consumo
            <Icon icon='mdi:currency-usd' fontSize={20} />
            {user?.id_cliente === 416 ? '120,000.20' : '87,020'}
          </Button> */}
          {/* {user?.id_cliente === 416 && (
            <Button size='medium' color={'error'} variant='contained' onClick={() => setOpen(!open)}>
              Cargar saldo
            </Button>
          )} */}
        </Box>
        <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {/* <NotificationDropdown settings={settings} notifications={notifications} /> */}
          <UserDropdown settings={settings} />
        </Box>
      </Box>
    </>
  )
}

export default AppBarContent
