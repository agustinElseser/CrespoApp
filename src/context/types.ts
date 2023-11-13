import { FormLogin } from 'src/pages/login'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email?: string
  password: string
  rememberMe?: boolean
  username: string
  id_cliente?: string | number
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type UserDataType = {
  username: string
  password: string
  dni: number
  telefono: string
  nombre: string
  apellido: string
  imagen?: string[]
  direccion: string
  descripcion: string
  rol: string
  areas?: string[]
  id: string
  url_token: string | null
  activo: boolean
}

export type Company = {
  id: number
  nombre: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: FormLogin, errorCallback?: ErrCallbackType) => void
  companyUser: (username: string, errorCallback?: ErrCallbackType) => void
  switchCompany: (id_cliente: number | null, errorCallback?: ErrCallbackType) => void
  companies: Company[] | null
  setCompanies: (companies: Company[] | null) => void
}
