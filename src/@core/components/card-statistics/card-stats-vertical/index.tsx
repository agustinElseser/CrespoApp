// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'

// ** Types Imports
import { CardStatsVerticalProps } from 'src/@core/components/card-statistics/types'

const Avatar = styled(MuiAvatar)<AvatarProps>(({ theme }) => ({
  width: 44,
  height: 44,
  boxShadow: theme.shadows[3],
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

const CardStatsVertical = (props: any) => {
  // ** Props
  const { title, subtitle, icon, stats, trendNumber, color = 'primary', trend = 'positive' } = props

  return (
    <Card
      sx={{
        backgroundColor: 'transparent !important',
        boxShadow: theme => `${theme.shadows[0]} !important`,
        border: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', mb: 5.5, alignItems: 'center', justifyContent: 'center' }}>
          <Avatar variant='rounded' sx={{ color: `${color}.main` }}>
            {icon}
          </Avatar>
        </Box>
        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{title}</Typography>
        <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', mb: 1.5, alignItems: 'flex-start' }}>
          <Typography variant='h6' sx={{ mr: 1, fontWeight: 600, lineHeight: 1.05 }}>
            {getShortNumber(parseFloat(stats))}
          </Typography>
          <Typography
            component='sup'
            variant='caption'
            sx={{ color: trend === 'positive' ? 'success.main' : 'error.main' }}
          >
            {trendNumber}
          </Typography>
        </Box>
        <Typography variant='caption'>{subtitle}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
