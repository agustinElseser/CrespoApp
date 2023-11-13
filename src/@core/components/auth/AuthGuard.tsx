// ** React Imports
import { ReactNode, ReactElement, useEffect, useLayoutEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const { user, setUser, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    //PROTECCION DE RUTAS AL HACE F5, HAY QUE CAMBIAR EL ROLE DEL USER A DINAMICO
    const userString = localStorage.getItem('userData')
    if (userString) {
      const user = JSON.parse(userString)
      setUser({ ...user, role: 'admin' })
    }
  }, [setUser])

  useEffect(
    () => {
      if (router.asPath === '/reset-password/') {
        return
      }
      if (!router.isReady) {
        return
      }
      if (!loading && user === null && !router.isReady && router.asPath !== '/reset-password/') {
        router.push('/login')
      }
      if (user === null && !window.localStorage.getItem('userData')) {
        if (router.asPath !== '/' && router.asPath !== '/reset-password/') {
          router.replace('/login')
        } else {
          router.replace('/login')
        }
      }
      if (!window.localStorage.getItem('userData')) {
        router.push('/login')
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]
  )

  if (loading || user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
