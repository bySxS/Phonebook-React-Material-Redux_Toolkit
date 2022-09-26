import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { NavLink } from 'react-router-dom'
import { useAppActions, useAuth } from 'hooks/useStore'
import styles from './Header.module.scss'

const Header = () => {
  const { isAuth } = useAuth()
  const { logout } = useAppActions()
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
            ? <NavLink className={styles.link} to={'/'} onClick={() => logout()}>Logout</NavLink>
            : <NavLink className={styles.link} to={'/login'}>Login</NavLink>
            }
          </nav>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header