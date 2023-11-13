import { useState, useCallback } from 'react';
import axios from 'axios';

interface IPayload {
  [key: string]: any;
}
export const useFetchWithFile = () => {
  const [state, setState] = useState({ loading: false, data: [] });

  const token = window.localStorage.getItem('accessToken');

  const fetch = useCallback(async (url: string, payload:IPayload, config: any = { method: 'POST' }, setPage?: any) => {
    let responseError: any = undefined;
    let responseData: any;
    let responseHeaders: any;
    try {
      setState(prevState => ({
        ...prevState,
        error: undefined,
        loading: true
      }));

      const formData = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
      });
    
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        ...config.headers
      };
      
      config.data = formData;

      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api${url}`,
        headers,
        ...config
      });
      responseData = response.data;
      responseHeaders = response.headers;

      if (setPage) {
        setPage(0);
      }

      return response;
    } catch (error) {
      responseError = error;
      console.log('response',responseError)
      throw error;
    } finally {
      setState(prevState => ({
        ...prevState,
        loading: false,
        error: responseError,
        data: responseData,
        headers: responseHeaders
      }));
    }
  }, []); //eslint-disable-line

  return {
    ...state,
    fetch
  };
};
