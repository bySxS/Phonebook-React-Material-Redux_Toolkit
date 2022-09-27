import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { NavLink } from 'react-router-dom'
import { useAuth } from 'features/auth/hooks/use-auth'
import { RoutePath } from 'router'
import styles from './header.module.scss'

const Header = () => {
  const { isAuth, logout, user } = useAuth()
  return (
    <AppBar position="relative">
      <Toolbar>
        <ContactPhoneIcon sx={{ mr: 2 }} />
        <Typography sx={{ width: '100%', display: 'flex' }} variant="h6" color="inherit" noWrap>
          <nav className={styles.menu}>
            <NavLink className={styles.link} to={'/'}>Contacts</NavLink>
          </nav>
          <nav className={styles.login}>
            {isAuth
            ? <>({user}) <NavLink className={styles.link} to={RoutePath.LOGIN} onClick={() => logout()}>Logout</NavLink></>
            : <NavLink className={styles.link} to={RoutePath.LOGIN}>Login</NavLink>
            }
          </nav>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header