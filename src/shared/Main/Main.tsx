import { Box, Container } from '@mui/material'
import React, { FC } from 'react'

interface IMainProps {
  children: React.ReactNode
}

const Main: FC<IMainProps> = ({ children }) => {
  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 0,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          {/* <Typography */}
          {/*   component="h1" */}
          {/*   variant="h2" */}
          {/*   align="center" */}
          {/*   color="text.primary" */}
          {/*   gutterBottom */}
          {/* > */}
          {/*   Contacts Phones */}
          {/* </Typography> */}
          {/* <Typography variant="h5" align="center" color="text.secondary" paragraph> */}

          {/* </Typography> */}
          {/* <Stack */}
          {/*   sx={{ pt: 4 }} */}
          {/*   direction="row" */}
          {/*   spacing={2} */}
          {/*   justifyContent="center" */}
          {/* > */}
          {/*   <Button variant="contained">Main call to action</Button> */}
          {/*   <Button variant="outlined">Secondary action</Button> */}
          {/* </Stack> */}
        </Container>
      </Box>
      <Container sx={{ py: 0 }} maxWidth="md">
        {children}
      </Container>
    </main>
  )
}

export default Main