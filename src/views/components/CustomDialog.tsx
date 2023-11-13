import { Dialog, styled } from '@mui/material'

export const CumstomDialog = styled(Dialog)({
  '& .MuiBackdrop-root': {
    overflow: 'hidden'
  },
  '& .MuiDialog-paper': {
    width: 1200,
    overflow: 'hidden',
    '&:not(.MuiDialog-paperFullScreen)': {
      overflow: 'hidden'
    }
  }
})
