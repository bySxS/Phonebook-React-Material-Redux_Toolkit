import { Typography } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { useAppSelector } from 'hooks/use-store'
import { useParams } from 'react-router-dom'
import LoaderText from 'shared/loader-text'
import { useContacts } from '../hooks/use-сontacts'
import { IContacts } from '../ts/сontacts-interface'

interface OneContactProps {
  children: JSX.Element
}

const OneContact: FC<OneContactProps> = ({ children}) => {
  const { contactById, isLoading, status, error, fetchContacts } = useContacts()
  const { id } = useParams()
  const contact: IContacts = useAppSelector(contactById(id || ''))
  useEffect(() => {
    if (!contact?.phone && status !== 'idle' && !error && !isLoading) {
      fetchContacts()
    }
  }, [contact, fetchContacts, isLoading, status, error])
  
  if (isLoading) {
    return <LoaderText />
  }
  
  if (error) {
    return (
      <Typography gutterBottom sx={{ color: 'red' }} variant="h5" component="h2">
        {error}
      </Typography>
    )
  }
  
  if (!contact?.phone) {
    return (
      <Typography gutterBottom variant="h5" component="h2">
        No contact:(
      </Typography>
    ) // or redirect to page 404
  }
  return children
}

export default OneContact