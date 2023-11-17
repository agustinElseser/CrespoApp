// ** React Imports
import { useContext } from 'react'

// **  Components
import { ClaimContext } from './context/ClaimContext'
import { UploadSummary } from './steps/UploadSummary'
import { DataUser } from './steps/DataUser'
import { DataClaims } from './steps/DataClaims'

export const GetStepContent = (handleClose: any) => {
  // ** Hooks
  const { activeStep } = useContext(ClaimContext)

  switch (activeStep) {
    case 0:
      return <DataUser />
    case 1:
      return <DataClaims />
    case 2:
      return <UploadSummary handleClose={handleClose} />

    default:
      return null
  }
}
