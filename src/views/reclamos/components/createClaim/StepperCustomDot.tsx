import { Icon } from '@iconify/react'
import MuiBox, { BoxProps } from '@mui/material/Box'
import { StepIconProps } from '@mui/material/StepIcon'
import { styled, useTheme } from '@mui/material/styles'
import UseBgColor from 'src/@core/hooks/useBgColor'

const Box = styled(MuiBox)<BoxProps>(() => ({
  width: 20,
  height: 20,
  borderWidth: 3,
  borderRadius: '50%',
  borderStyle: 'solid'
}))

const StepperCustomDot = (props: StepIconProps) => {
  // ** Props
  const { active, completed, error } = props

  // ** Hooks
  const theme = useTheme()
  const bgColors = UseBgColor()

  if (error) {
    return <Icon icon='mdi:alert' fontSize={20} color={theme.palette.error.main} transform='scale(1.2)' />
  } else if (completed) {
    return (
      <Icon icon='mdi:check-circle' fontSize={20} color={theme.palette.primary.contrastText} transform='scale(1.2)' />
    )
  } else {
    return (
      <Box
        sx={{
          borderColor: 'rgba(0, 0, 0, 0.2)',
          ...(active && {
            borderWidth: 4,
            borderColor: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.dark
          })
        }}
      />
    )
  }
}

export default StepperCustomDot
