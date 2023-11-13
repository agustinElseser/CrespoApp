import { useState, useCallback } from 'react'
import axios from 'axios'

interface FetchState<T> {
  loading: boolean
  data: T | null
}

export const useFetch = () => {
  const [state, setState] = useState<FetchState<any>>({ loading: false, data: [] })

  const token = window.localStorage.getItem('accessToken')

  const fetch = useCallback(async (url: string, config: object = { method: 'GET' }, setPage?: any) => {
    let responseError: any = undefined
    let responseData: any
    let responseHeaders: any
    try {
      setState(prevState => ({
        ...prevState,
        error: undefined,
        loading: true
      }))

      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        ...config
      })
      responseData = response.data
      responseHeaders = response.headers
      if (setPage) {
        setPage(0)
      }

      return response
    } catch (error) {
      responseError = error
      throw error
    } finally {
      setState(prevState => ({
        ...prevState,
        loading: false,
        error: responseError,
        data: responseData,
        headers: responseHeaders
      }))
    }
  }, []) //eslint-disable-line

  return {
    ...state,
    fetch
  }
}
