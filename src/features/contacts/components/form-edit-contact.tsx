import React, { FC } from 'react'
import {
  Box, Button, Checkbox, FormControlLabel,
  TextField, Typography
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IContactForm, IContacts } from '../ts/сontacts-interface'
import { makeId } from '../utils/generate'

interface IFormEditContact {
  onClickChange: (contact: IContacts) => void
  contact?: IContacts
}

const FormEditContact: FC<IFormEditContact> = ({
  contact, onClickChange
}) => {
  const {
    register,
    formState: { errors, isValid }, handleSubmit
  } = useForm<IContactForm>({
    mode: 'onChange',
    defaultValues: {
      ...contact,
      firstName: contact?.name.first,
      lastName: contact?.name.last
    }
  })
  
  const onSubmit: SubmitHandler<IContactForm> = (data) => {
    onClickChange({
      ...data,
      id: data.id || makeId(),
      registered: data.registered || new Date().toUTCString(),
      name: {
        first: data.firstName,
        last: data.lastName
      }
    })
  }
  return (
    <Box
      sx={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        {contact ? 'Change contact' : 'Add contact'}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1, width: '450px' }}
      >
        <TextField
          margin="normal"
          fullWidth
          id={'age'}
          error={!!errors.age?.message}
          label={'Age'}
          {...register('age', {
            min: {
              value: 1,
              message: 'Min value 1'
            },
            max: {
              value: 120,
              message: 'Max value 120'
            },
          })}
          type={'number'}
          helperText={errors.age?.message || ''}
          name="age"
          autoComplete="age"
          autoFocus
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          id={'firstName'}
          error={!!errors.firstName?.message}
          label={'First Name'}
          {...register('firstName', {
            required: {
              value: true,
              message: 'required field'
            }
          })}
          helperText={errors.firstName?.message || ''}
          name="firstName"
          autoComplete="firstName"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id={'lastName'}
          error={!!errors.lastName?.message}
          label={'Last Name'}
          {...register('lastName', {
            required: {
              value: true,
              message: 'required field'
            }
          })}
          helperText={errors.lastName?.message || ''}
          name="lastName"
          autoComplete="lastName"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          type="text"
          id={'company'}
          error={!!errors.company?.message}
          label={'Company'}
          helperText={errors.company?.message || ''}
          {...register('company')}
        />
        <TextField
          margin="normal"
          fullWidth
          id={'email'}
          error={!!errors.email?.message}
          label={'Email Address'}
          {...register('email', {
            required: {
              value: true,
              message: 'required field'
            },
            pattern: {
              value: /^([a-zA-Z\d_.]{1,40}@[a-zA-Z_]+?\.[a-zA-Z]{2,6})$/,
              message: 'Please enter a correct e-mail'
            }
          })}
          helperText={errors.email?.message || ''}
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id={'phone'}
          error={!!errors.phone?.message}
          label={'Phone'}
          {...register('phone', {
            required: {
              value: true,
              message: 'required field'
            },
            pattern: {
              value: /^\+?\d?\s?[-(]?\d{3}\)\s?-?\d{3}-?\d{2}-?\d{2,3}$/,
              message: 'Please enter a correct phone number, example: +3 (805) 01234567'
            }
          })}
          helperText={errors.phone?.message || ''}
          name="phone"
          type={'tel'}
          autoComplete="phone"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          id={'address'}
          error={!!errors.address?.message}
          label={'Address'}
          {...register('address')}
          helperText={errors.address?.message || ''}
          name="address"
          autoComplete="address"
          autoFocus
        />
        <FormControlLabel
          control={<Checkbox
            defaultChecked={contact?.isActive}
            {...register('isActive', {
            required: false
          })} />}
          label="isActive"
          className={'w-full text-left'}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isValid}
          sx={{ mt: 3, mb: 2 }}
        >
          Save
        </Button>
       
      </Box>
    </Box>
  )
}

export default FormEditContact