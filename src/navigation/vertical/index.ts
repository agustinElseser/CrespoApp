// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'MIS RECLAMOS',
      icon: 'mdi:file-document-alert',
      path: '/mis-reclamos',
      subject: 'mis-reclamos'
    },
    {
      subject: 'mis-reclamos',
      sectionTitle: 'Trámites online'
    },
    {
      title: 'ECO BOLETA',
      icon: 'mdi:recycle',
      path: '/administracion/calles',
      subject: 'mis-reclamos',
      disabled: true,
      badgeContent: 'Próx.',
      badgeColor: 'error'
    },
    {
      title: 'PAGAR BOLETA',
      icon: 'mdi:credit-card-plus',
      path: '/administracion/calles',
      subject: 'mis-reclamos',
      disabled: true,
      badgeContent: 'Próx.',
      badgeColor: 'error'
    },
    {
      title: 'LICENCIA DE CONDUCIR',
      icon: 'mdi:card-account-details',
      path: '/administracion/calles',
      subject: 'mis-reclamos',
      disabled: true,
      badgeContent: 'Próx.',
      badgeColor: 'error'
    },
    {
      title: 'GUÍA DE TRÁMITES',
      icon: 'mdi:list-box',
      path: '/administracion/calles',
      subject: 'mis-reclamos',
      disabled: true,
      badgeContent: 'Próx.',
      badgeColor: 'error'
    },
    {
      title: 'RECLAMOS',
      icon: 'mdi:file-document-alert',
      path: '/reclamos',
      subject: 'admin'
    },
    {
      subject: 'admin',
      sectionTitle: 'Panel administración'
    },

    {
      title: 'CALLES',
      icon: 'mdi:road-variant',
      path: '/administracion/calles',
      subject: 'admin'
    },
    {
      title: 'BARRIOS',
      icon: 'mdi:home-group',
      path: '/administracion/barrios',
      subject: 'admin'
    },
    {
      title: 'AREAS',
      icon: 'mdi:order-bool-descending-variant',
      path: '/administracion/areas',
      subject: 'capataz'
    },
    {
      title: 'TIPOS DE RECLAMOS',
      icon: 'mdi:comment-alert',
      path: '/administracion/tipos-de-reclamos',
      subject: 'capataz'
    },
    {
      title: 'USUARIOS',
      icon: 'mdi:account-supervisor',
      path: '/administracion/usuarios',
      subject: 'super-admin'
    }
  ]
}

export default navigation
