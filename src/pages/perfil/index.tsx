import { Grid } from '@mui/material'
import UserInfo from 'src/views/perfil/UserInfo'
import UserSecurity from 'src/views/perfil/UserSecurity'

export default function UserView() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={5}>
        <UserInfo />
      </Grid>
      <Grid item xs={12} md={7} lg={7}>
        <UserSecurity />
      </Grid>
    </Grid>
  )
}

UserView.acl = {
  action: 'manage',
  subject: 'perfil'
}
