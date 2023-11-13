import { IuploadedFiles } from '../context/ClaimContext'

interface IFile {
  id: string
  metadata: string
  audio: string
  status: number
}

interface ISummary {
  [audio: string]: string
}

export default function generateSummary(files: IFile[] | undefined, obj: IuploadedFiles): ISummary {
  const summary: ISummary = {}

  if (files === undefined) {
    for (const key in obj) {
      summary[key] = obj[key].msg
    }
  } else {
    for (const file of files) {
      const audio = file.metadata
      if (file.audio in obj) {
        summary[audio] = obj[file.id].msg
      } else {
        summary[audio] = 'Pendiente de carga'
      }
    }
  }

  return summary
}
