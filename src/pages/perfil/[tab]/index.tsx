// ** Demo Components Imports

import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import UserInfo from 'src/views/apps/user/UserInfo'
import UserOptions from 'src/views/apps/user/UserOptions'

export default function UserView() {
  const { user } = useAuth()
  const router = useRouter()
  const { tab } = router.query

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserInfo idClient={user?.id} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserOptions tab={tab as string} />
      </Grid>
    </Grid>
  )
}

UserView.acl = {
  action: 'manage',
  subject: 'perfil'
}
