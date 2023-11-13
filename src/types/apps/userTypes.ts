// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UsersType = {
  id: number
  role: string
  email: string
  status: string
  avatar: string
  company: string
  country: string
  contact: string
  fullName: string
  username: string
  currentPlan: string
  avatarColor?: ThemeColor

}

export type ProjectListDataType = {
  id: number
  img: string
  hours: string
  totalTask: string
  projectType: string
  projectTitle: string
  progressValue: number
  progressColor: ThemeColor
}

export type UserData = {
  id: number
  nombre:string
  direccion: string
  telefono: string
  rut:string
  email: string
  username: string
  password: string
  avatar?: string | null
  clientes: Company[] | []
  id_cliente: number
  enabled: number
  system: number
  created_at: string
  estado: number
  rol:{id:number, nombre:string}
}

export type Company = {
  id: number
  nombre:string
}

export type Client = {
  id: number
  nombre: string
}
