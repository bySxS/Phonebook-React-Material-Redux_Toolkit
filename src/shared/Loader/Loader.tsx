import React, { FC } from 'react'
import { Box, CircularProgress } from '@mui/material'

interface ILoaderProps {
  alwaysShow?: boolean
}

const Loader: FC<ILoaderProps> = ({ alwaysShow = false }) => {
  return (
    <div style={{ zIndex: 1000 }}>
      {(alwaysShow !== undefined && alwaysShow) &&
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
