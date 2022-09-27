import React, { FC } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useContacts } from 'features/contacts/hooks/use-сontacts'
import { useAuth } from '../features/auth/hooks/use-auth'

interface ILoaderProps {
  alwaysShow?: boolean
}

const Loader: FC<ILoaderProps> = ({ alwaysShow = false }) => {
  const { isLoading: isLoadContacts } = useContacts()
  const { isLoading: isLoadUser } = useAuth()
  
  return (
    <div style={{ zIndex: 1000 }}>
      {(alwaysShow || isLoadContacts || isLoadUser) &&
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            right: '60px',
            bottom: '20px'
          }}>
        <CircularProgress />
      </Box>
      }
    </div>
  )
}

export default Loader
