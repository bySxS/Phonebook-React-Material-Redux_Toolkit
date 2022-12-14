import React, { lazy, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Avatar, Box, Button, TextField, Typography
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from 'features/auth/hooks/use-auth'
import LoaderText from '../shared/loader-text'

export const LoginLazy = lazy(() => import('pages/login'))

interface IFormInputs {
  email: string
  password: string
}

const Login = () => {
  
  const {
    register, formState: { errors, isValid }, handleSubmit
  } = useForm<IFormInputs>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const { login, status, error, isLoading } = useAuth()
  const navigate = useNavigate()
  
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    login(data)
  }
  
  useEffect(() => {
    if (status === 'idle') {
      navigate('/')
    }
  }, [navigate, status])

  return (
    <>
      <Helmet title={'Login'}/>
    <Box
      sx={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1, width: '450px' }}
      >
        <TextField
          margin="normal"
          required
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
          type="password"
          id={'password'}
          error={!!errors.password?.message}
          label={'Password'}
          helperText={errors.password?.message || ''}
          {...register('password', {
            required: {
              value: true,
              message: 'required field'
            },
            pattern: {
              value: /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})$/,
              message: 'Password must be at least 8 characters, at least 1 number, 1 capital letter and 1 small letter'
            }
          })}
          autoComplete="current-password"
        />
        {/* <FormControlLabel */}
        {/*   control={<Checkbox value="remember" color="primary" />} */}
        {/*   label="Remember me" */}
        {/* /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isValid}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        {isLoading && <LoaderText />}
        {error &&
          <Typography sx={{ color: 'red' }} component="h2" variant="h5">
          {error}
        </Typography>
        }
      </Box>
    </Box>
    </>
  )
}

export default Login
