import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import React, { useEffect } from 'react'
import {
 List, ListItemButton, ListItemIcon,
  ListItemText, ListSubheader,
} from '@mui/material'
import { useContacts } from 'features/contacts/hooks/use-сontacts'

const ListContacts = () => {
  const { fetchContacts, contacts, isLoading } = useContacts()
  useEffect(() => {
    if (contacts.length === 0 && !isLoading) {
      fetchContacts()
    }
  }, [isLoading, contacts, fetchContacts])
  
  return (
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
            <ListSubheader component="div" sx={{ fontSize: '20px' }} id="nested-list-subheader">
              List contacts
            </ListSubheader>
          }
        >
          {contacts.map((contact, i, all) => (
              <span key={contact.id}>
              {(i === 0 || (i > 0 && contact.name.first[0] !== all[i-1]?.name?.first[0])) &&
                <ListSubheader component="div" sx={{ fontSize: '16px' }} id="nested-list-subheader">
                  {contact.name.first[0]}
                </ListSubheader>
              }
              <ListItemButton>
                <ListItemIcon>
                  <PermContactCalendarIcon/>
                </ListItemIcon>
                <ListItemText
                  primary={`${contact.name.first} ${contact.name.last}`}
                />
              </ListItemButton>
              </span>
            )
          )}
        </List>
      </div>
  )
}

export default ListContacts
