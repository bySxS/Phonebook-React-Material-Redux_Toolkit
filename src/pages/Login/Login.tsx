import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Avatar, Box, Button, TextField, Typography
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDebounce } from 'hooks/useDebounce'
import { useNavigate } from 'react-router-dom'
import { validateUser } from 'utils/validators'
import { useAppActions } from 'hooks/useStore'

const Login = () => {
  const { login } = useAppActions()
  const navigate = useNavigate()
  const [formState, setFormState] = useState<{ email: string, password: string }>({
    email: '',
    password: ''
  })
  const formStateDebounce = useDebounce(formState)
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
  }>({})

  useEffect(() => {
    const result = validateUser(formState)
    setValidated(result.success)
    setErrors(result.errors)
  }, [formStateDebounce])


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!validated) {
      return false
    }
    event.preventDefault()
    console.log(formState)
    login()
    navigate('/')
  }

  const handleChangeInput =
    ({ target: { name, value }, currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev: any) => ({ ...prev, [name]: value }))
      currentTarget.checkValidity()
    }

  return (
    <>
      <Helmet titleTemplate={'Login'}>
        <title>Login</title>
        <meta charSet="utf-8" />
      </Helmet>
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
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '450px' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id={errors.email ? 'outlined-error-helper-text' : 'email'}
          error={!!errors.email}
          label={'Email Address'}
          helperText={errors.email ? errors.email : ''}
          name="email"
          value={formState.email}
          onChange={handleChangeInput}
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          type="password"
          id={errors.password ? 'outlined-error-helper-text2' : 'password'}
          error={!!errors.password}
          label={'Password'}
          helperText={errors.password ? errors.password : ''}
          value={formState.password}
          onChange={handleChangeInput}
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
          disabled={!validated}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        {/* <Grid container> */}
        {/*   <Grid item xs> */}
        {/*     <Link href="#" variant="body2"> */}
        {/*       Forgot password? */}
        {/*     </Link> */}
        {/*   </Grid> */}
        {/*   <Grid item> */}
        {/*     <Link href="#" variant="body2"> */}
        {/*       {"Don't have an account? Sign Up"} */}
        {/*     </Link> */}
        {/*   </Grid> */}
        {/* </Grid> */}
      </Box>
    </Box>
    </>
  )
}

export default Login
