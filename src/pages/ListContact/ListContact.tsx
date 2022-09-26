import React, { lazy, useEffect } from 'react'
import {
  List, ListItemButton, ListItemIcon,
  ListItemText, ListSubheader
} from '@mui/material'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { Helmet } from 'react-helmet-async'
import { useAppActions } from 'hooks/useStore'
import { useContacts } from 'features/contacts/hooks/useContacts'

export const ListContactsLazy = lazy(() => import('pages/ListContact/ListContact'))

const ListContact = () => {
  const { fetchPhoneBookAsync } = useAppActions()
  const { contacts } = useContacts()
  useEffect(() => {
    fetchPhoneBookAsync()
  }, [])
  return (
    <>
      <Helmet title={'List contacts'}>
        <meta charSet="utf-8" />
      </Helmet>
      <div className={'flex flex-col items-center'}>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper'
      }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            List contacts
          </ListSubheader>
        }
      >
        {contacts.map((contact) => (
        <ListItemButton key={contact.id}>
          <ListItemIcon>
            <PermContactCalendarIcon />
          </ListItemIcon>
          <ListItemText primary={`${contact.name.first} ${contact.name.last}`} />
        </ListItemButton>
          ))}
      </List>
      </div>
    </>
  )
}

export default ListContact
