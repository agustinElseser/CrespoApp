// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { alpha, styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)<AvatarProps>(({ theme }) => ({
  width: 38,
  height: 38,
  boxShadow: theme.shadows[3],
  marginRight: theme.spacing(2.75),
  backgroundColor: theme.palette.background.paper,
  '& svg': {
    fontSize: '1.75rem'
  }
}))

const getShortNumber = (n: number) => {
  if (n < 1e3) return n
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T'
}

const CardStatsHorizontal = (props: any) => {
  // ** Props
  const { title, icon, stats, trendNumber, color, trend } = props

  const theme = useTheme()

  return (
    <Card
      sx={{
        backgroundColor: 'transparent !important',
        boxShadow: `4px 4px 8px 3px ${alpha(theme.palette.grey[600], 0.15)}`,
        border: theme => `1px solid ${theme.palette.divider}`,
        flexGrow: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '10px',
          justifyContent: 'start',
          flex: 1
        }}
      >
        <CustomAvatar variant='rounded' color={color} sx={{ boxShadow: 5, mb: 1, width: 40, height: 40, mr: 2 }}>
          <Icon icon={icon} fontSize='1.8rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}>
          <Typography sx={{ whiteSpace: 'nowrap' }} variant='caption'>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}>
            <Typography variant='h6' fontWeight={900} sx={{ mr: 2 }}>
              {title === 'Tasa de apertura' ? stats : getShortNumber(parseFloat(stats))}
            </Typography>
            {trendNumber && (
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  icon={trend === 'positive' ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                  color={trend === 'positive' ? theme.palette.success.main : theme.palette.error.main}
                />
                <Typography
                  variant='caption'
                  sx={{ fontWeight: 600, color: trend === 'positive' ? 'success.main' : 'error.main', mr: 1 }}
                >
                  {trendNumber}%
                </Typography>
                <Typography variant='body2'>mes anterior</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default CardStatsHorizontal
