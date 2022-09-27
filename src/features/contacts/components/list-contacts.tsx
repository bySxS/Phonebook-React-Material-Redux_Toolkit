import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import React, { useEffect } from 'react'
import {
 List, ListItemButton, ListItemIcon,
  ListItemText, ListSubheader,
} from '@mui/material'
import { useContacts } from 'features/contacts/hooks/use-сontacts'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'router'

const ListContacts = () => {
  const navigate = useNavigate()
  const { fetchContacts, contacts, isLoading, deleteContact } = useContacts()
  useEffect(() => {
    if (contacts.length === 0 && !isLoading) {
      fetchContacts()
    }
  }, [isLoading, contacts, fetchContacts])
  const onDelete = (id: string, name: string) => {
    const result = confirm(`You are sure that you want to delete the contact - ${name}?`)
    if (result) {
      deleteContact(id)
    }
  }
  const onChange = (id: string) => {
    navigate(RoutePath.EDIT_CONTACT(id))
  }
  const onView = (id: string) => {
    navigate(RoutePath.VIEW_CONTACT(id))
  }
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
              <ListItemButton onClick={() => onView(contact.id)}>
                <ListItemIcon>
                  <PermContactCalendarIcon/>
                </ListItemIcon>
                <ListItemText>
                  {`${contact.name.first} ${contact.name.last}`}
                </ListItemText>
                <EditIcon
                  onClick={(e) => {
                    e.stopPropagation()
                    onChange(contact.id)
                  }}
                  className={'text-blue-700 hover:text-blue-400 mr-2'}
                />
                <DeleteIcon
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(contact.id, `${contact.name.first} ${contact.name.last}`)
                  }}
                  className={'text-red-700 hover:text-red-400'}
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
