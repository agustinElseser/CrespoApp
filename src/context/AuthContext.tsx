// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType, Company } from './types'
import { toast } from 'react-hot-toast'
import { FormLogin } from 'src/pages/login'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  companyUser: () => Promise.resolve(),
  switchCompany: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  companies: null,
  setCompanies: () => null as Company[] | null
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [companies, setCompanies] = useState<Company[] | null>(null)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleLogin = (params: FormLogin, errorCallback?: ErrCallbackType) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/autenticacion/ingresar`, params)
      .then(response => {
        localStorage.setItem(authConfig.storageTokenKeyName, response.data.tokenAcceso)
        localStorage.setItem('userData', JSON.stringify(response.data.usuario))
        localStorage.setItem('timestamp', Date.now().toString())

        setUser({ ...response.data.user, role: 'admin' })
        //params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

        if (response.data.usuario.rol === 'CONTRIBUYENTE') {
          router.replace(`/mis-reclamos`)
        } else {
          router.replace(`/reclamos`)
        }
      })
      .catch(err => {
        console.log(err.response?.data?.message)
        if (err.response?.data?.message == 'Invalid credentials') {
          toast.error('Contraseña incorrecta.')
        } else {
          toast.error('No es posible ingresar. Contáctese con soporte.')
        }
        if (errorCallback) errorCallback(err)
      })
  }

  async function handleCompanyUser(username: string) {
    if (username.length < 4) {
      toast.error('El usuario tiene mínimo 4 caracteres.', {
        duration: 4000,
        style: {
          zIndex: 999999
        }
      })

      return
    }

    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/clients?username=${username}`)
      setCompanies(data)
    } catch (err: any) {
      toast.error(`${err.response.data.message}.`, {
        duration: 4000,
        style: {
          zIndex: 999999
        }
      })
    }
  }

  async function handleSwitchCompany(id: number | null) {
    const token = window.localStorage.getItem('accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/switch-account`,
        { id_cliente: id },
        config
      )
      window.localStorage.setItem(authConfig.storageTokenKeyName, data.authToken)
      window.localStorage.setItem('userData', JSON.stringify(data.user))
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me/client-logo`, {
          headers: {
            Authorization: `Bearer ${data.authToken}`
          }
        })
        .then(response => {
          const data = response.data
          localStorage.setItem('logo_cliente', data)
        })
        .catch(err => {
          console.error('Error al obtener el logo del cliente:', err)
        })
      setUser({ ...data.user, role: 'admin' }) // ver cambio de roles
      router.replace(`/dashboard`)
    } catch (err) {
      toast.error('No es posible cambiar de cuenta, contáctese con soporte.')
    }
  }

  function handleLogout() {
    setCompanies(null)
    setUser(null)
    localStorage.clear()
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    companyUser: handleCompanyUser,
    switchCompany: handleSwitchCompany,
    logout: handleLogout,
    setCompanies,
    companies
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
