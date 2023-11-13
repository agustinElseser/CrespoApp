// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'
import Icon from 'src/@core/components/icon'



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

const CardStatsHorizontal = (props: CardStatsHorizontalProps) => {
  // ** Props
  const { title, icon, stats, trendNumber, color = 'primary', trend = 'positive' } = props

  
  return (
    <Card
      sx={{
        backgroundColor: 'transparent !important',
        boxShadow: theme => `${theme.shadows[0]} !important`,
        border: theme => `1px solid ${theme.palette.divider}`,
       
      }}
    >
      <Box sx={{ display: 'flex',flexDirection:'row',alignItems: 'center',padding:'10px',justifyContent:'start' }}>
          <Avatar variant='rounded' sx={{ color: `${color}.main` }}>
            {icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ whiteSpace: 'nowrap', ml: 1 }} variant='caption'>
              {title}
            </Typography>
            <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant='h6' sx={{ ml: 1, fontWeight: 600, lineHeight: 1.05 }}>
                {getShortNumber(parseFloat(stats))}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box
                  component='span'
                  sx={{ display: 'inline-flex', color: trend === 'positive' ? 'success.main' : 'error.main' }}
                >
                  
                </Box>
                <Typography
                  variant='caption'
                  sx={{ fontWeight: 600, color: trend === 'positive' ? 'success.main' : 'error.main' }}
                >
                  {trendNumber}
                </Typography>
              </Box>
            </Box>
          </Box>
      </Box>
    </Card>
  )
}

export default CardStatsHorizontal
