import { useState, createContext, useEffect } from 'react'
import { useFetchWithFile } from 'src/hooks/useFetchWithFile'
import axios from 'axios'
import { useFetch } from 'src/hooks/useFetch'
import toast from 'react-hot-toast'

export type ClaimContext = {
  activeStep: number
  query: IQuery
  files: any[]
  data: any
  uploading: boolean
  error: boolean
  setActiveStep: (number: number) => void
  handleQuery: (name: keyof IQuery, value: IQuery[keyof IQuery]) => void
  setData: any
  handleFinished: (value: any) => void
  setError: (boolean: boolean) => void
  //handleUploadImage: (value: any) => void;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ClaimContext = createContext<ClaimContext>({} as ClaimContext)

interface Idata {
  id: string
  nombre: string
}
export interface IQuery {
  nombre: string
  dni: number
  telefono: number
  correo: string
  tipo_reclamo: Idata
  barrio: Idata
  calle: Idata
  altura: number
  entre_calle1: Idata
  entre_calle2: Idata
  calle_interseccion: Idata
  descripcion: string
}

interface IChildren {
  children: JSX.Element | JSX.Element[]
  close: () => void
}

export interface IuploadedFiles {
  [key: string]: { status: boolean; msg: string }
}

export const SpeechProvider = ({ children, close }: IChildren) => {
  // ** Hoks
  const { fetch, loading, data: dataUP } = useFetch()

  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)
  const [query, setQuery] = useState<IQuery>(null)
  const [error, setError] = useState(true)
  const [image, setImages] = useState<any[]>([])
  const [data, setData] = useState<any[]>()
  const [files, setFiles] = useState<any[]>([])
  const [uploading, setUploading] = useState<boolean>(false)

  // ** Functions

  const handleQuery = (name: keyof IQuery, value: IQuery[keyof IQuery]) => {
    setQuery(prevQuery => {
      return { ...prevQuery, [name]: value }
    })
  }

  // const handleUploadImage = async (newImage) => {

  //   if (newImage) {
  //     setQuery((prevQuery) => ({
  //       ...prevQuery,
  //       image: prevQuery.image && prevQuery.image.length >= 1 ? [...prevQuery.image, newImage] : [newImage],
  //     }));

  //     console.log(query, "query después de agregar imagen");
  //   }
  // };

  const handleFinished = async () => {
    console.log(query)
    fetch('usuario-reclamo', {
      method: 'POST',
      data: query
    })
    toast.success('Reclamo creado.', {
      duration: 5000
    })
    close()
  }

  return (
    <ClaimContext.Provider
      value={{
        //* Valores
        activeStep,
        query,
        files,
        data,
        uploading,
        error,

        //* Metodos
        setActiveStep,
        handleQuery,
        setData,
        handleFinished,
        setError
      }}
    >
      {children}
    </ClaimContext.Provider>
  )
}
