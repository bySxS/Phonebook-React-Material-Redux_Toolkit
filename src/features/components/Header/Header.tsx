import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <ContactPhoneIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          <nav>
          <NavLink className={styles.link} to={'/'}>Contacts</NavLink>
          <NavLink className={styles.link} to={'/login'}>Login</NavLink>
          </nav>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header