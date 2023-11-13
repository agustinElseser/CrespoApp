import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

const UserRolChecker = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  let allowedPaths: string[] = []

  if (user?.rol === 'CONTRIBUYENTE') {
    allowedPaths = ['login', 'reset-password', 'mis-reclamos', 'perfil', '/']
  } else if (user?.rol === 'JEFE') {
    allowedPaths = [
      'login',
      'reset-password',
      'reclamos',
      'calles',
      'barrios',
      'areas',
      'usuarios',
      'tipos-de-reclamos',
      'perfil'
    ]
  } else {
    allowedPaths = ['login', 'reset-password', 'reclamos', 'calles', 'barrios', 'areas', 'tipos-de-reclamos']
  }

  useEffect(() => {
    const currentPath = router.asPath
    const isPathAllowed = allowedPaths.some(path => {
      const fullPath = `/${currentPath}/`
      const pathWithSlash = `/${path}/`

      return fullPath.includes(pathWithSlash)
    })

    console.log('path permitido', currentPath, allowedPaths, isPathAllowed)
    if (user) {
      if (!isPathAllowed) {
        setIsAuthorized(false)
        const url = user.rol === 'CONTRIBUYENTE' ? 'mis-reclamos' : 'reclamos'
        router.replace(url)
      } else {
        setIsAuthorized(true)
      }
    } else if (!isPathAllowed) {
      router.push('/login')
      setIsAuthorized(true)
    } else {
      setIsAuthorized(true)
    }
  }, [router.asPath])

  return !isAuthorized ? <Spinner /> : <>{children}</>
}

export default UserRolChecker
