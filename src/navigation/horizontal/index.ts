// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return[ {
    title: 'Dashboard',
    icon: 'mdi:home-outline',
    path: "/dashboards/crm/"
  
  },{
    title: 'Comercial',

    icon: 'mdi:account-box-multiple',
    children:  [
      {
        title: 'Clientes',
        path: '/apps/comercial/clientes'
      },
      {
        title: 'Ubicaciones',
        path: '/apps/comercial/ubicaciones'
      },
      {
        title: 'Contacto',
        path:  '/apps/comercial/contacto'
      },
     
      {
        title: 'Servicios',
        
        children:  [
          {
            title: 'Mia',
            path: '/dashboards/analytics'
          },
          {
            title: 'ChatBot',
            path: '/dashboards/analytics'
          },
          {
            title: 'Mailing',
            icon: 'mdi:email-outline',
            path: '/dashboards/analytics'
          },
          {
            title: 'Sms',
            icon: 'mdi:message-outline',
            path: '/dashboards/analytics'
          },
          {
            title: 'Whatsapp Bot',
            path: '/dashboards/analytics'
          },
          {
            title: 'SA',
            path: '/dashboards/analytics'
          },
          {
            title: 'STT',
            path: '/dashboards/analytics'
          },
          {
            title: 'TTS',
            path: '/dashboards/analytics'
          },
          {
            title: 'TIC',
            path: '/dashboards/analytics'
          },
          {
            title: 'Soporte',
            path: '/dashboards/analytics'
          },
          {
            title: 'Url Corta',
            path: '/dashboards/analytics'
          },
          
        ]
      }
    ]
  },
  {
    title: 'Reportes',
    icon: 'mdi:file-document-outline',
    children:  [
      {
        title: 'Mia',      
        children:  [
          {
            title: 'Mia',
            path: '/dashboards/analytics'
          },
          {
            title: 'Nodos',
            path: '/dashboards/analytics'
          },
        ]
        },
      {
        title: 'Mailing',
        path: '/apps/user/list'
      },
      {
        title: 'ChatBot',
        path: '/apps/user/list'
      },
      {
        title: 'SMS',
        path: '/apps/user/list'
      },
      {
        title: 'SPEECH',
        path: '/apps/user/list'
      },
    ]
  },
  {
    title: 'Operaciones',
    icon: 'mdi:file-document-outline',
    children:  [
      {
        title: 'Servicios',
        children:[
          {
            title: 'Mia',
            path: '/dashboards/analytics'
          },
          {
            title: 'ChatBot',
            path: '/dashboards/analytics'
          },
          {
            title: 'Mailing',
            path: '/dashboards/analytics'
          },
          {
            title: 'Sms',
            path: '/dashboards/analytics'
          },
          {
            title: 'Whatsapp Bot',
            path: '/dashboards/analytics'
          },
          {
            title: 'SA',
            path: '/dashboards/analytics'
          },
          {
            title: 'STT',
            path: '/dashboards/analytics'
          },
          {
            title: 'TTS',
            path: '/dashboards/analytics'
          },
          {
            title: 'TIC',
            path: '/dashboards/analytics'
          },
          {
            title: 'Soporte',
            path: '/dashboards/analytics'
          },
          {
            title: 'Url Corta',
            path: '/dashboards/analytics'
          },
        ]
      },
      
    ]
  },
  {
    title: 'Logs',
    icon: 'mdi:file-document-outline',
    children:  [
      {
        title: 'Clientes',
        path: '/apps/logs/clients'
      },
      {
        title: 'Ubicaciones',
        path: '/apps/logs/branches'
      },
      {
        title: 'Contactos',
        path: '/apps/logs/contacts'
      },
      {
        title: 'Usuarios',
        path: '/apps/logs/users'
      },
      {
        title: 'Inicio de sesión de usuarios',
        path: '/apps/logs/user-login'
      },
    ]
  },
  {
    title: 'Usuarios',

    icon: 'mdi:account-circle-outline',
    children:  [
      {
        title: 'Intranet',
        path: '/apps/usuarios/intranet'
      },
      {
        title: 'Clientes',
        path: '/dashboards/analytics'
      },
      
    ]
  },
  {
    title: 'Configuraciones',
    icon: 'mdi:settings-outline',
    children:  [
      {
        title: 'Configuraciones subMenu',
        path: '/dashboards/analytics'
      },
      
    ]
  }]
}

export default navigation
