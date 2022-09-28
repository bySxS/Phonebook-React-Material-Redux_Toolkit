import { Card, CardContent, Typography } from '@mui/material'
import React, { FC } from 'react'
import { IContacts } from '../ts/сontacts-interface'

interface ViewContactItemProps {
  contact: IContacts
}

const ViewContactItem: FC<ViewContactItemProps> = ({ contact }) => {
  
  if (!contact?.phone) {
    return (<p>No contact:(</p>)
  }
  
  return (
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderBottom: '1px solid #f2f2f2'
          }}
          >
            {/* <CardMedia */}
            {/*   component="img" */}
            {/*   sx={{ */}
            {/*     // 16:9 */}
            {/*     pt: '56.25%', */}
            {/*   }} */}
            {/*   image="https://source.unsplash.com/random" */}
            {/*   alt="random" */}
            {/* /> */}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h1">
                {contact.phone}
              </Typography>
              <Typography sx={{ textAlign: 'left'}}>
                <>
                <span className={'font-bold'}>Name: </span>{`${contact.name.first} ${contact.name.last}`}<br/>
                <span className={'font-bold'}>E-Mail: </span>{contact.email}<br/>
                <span className={'font-bold'}>Age: </span>{contact.age}<br/>
                <span className={'font-bold'}>Address: </span>{contact.address}<br/>
                <span className={'font-bold'}>Company: </span>{contact.company}<br/>
                <span className={'font-bold'}>Registered: </span>{contact.registered}<br/>
                <span className={'font-bold'}>isActive: </span>{contact.isActive ? 'yes' : 'no'}
                </>
              </Typography>
            </CardContent>
            {/* <CardActions> */}
            {/*   <Button size="small">Edit</Button> */}
            {/*   <Button size="small">Delete</Button> */}
            {/* </CardActions> */}
          </Card>
  )
}

export default ViewContactItem