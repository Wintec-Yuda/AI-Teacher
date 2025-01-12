'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useRouter } from 'next/navigation';
import axiosServices from '@/app/lib/axios/axiosServices';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data: LoginFormInputs) => {
    try {
      const response = axiosServices.login(data.email, data.password);

      console.log('Login Successful:', response);

      router.push('/');
    } catch (error) {
      console.error('Error during login:', error);
    }

  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%', maxWidth: 400 }}
      >
        <TextField
          fullWidth
          label="email"
          type="email"
          variant="outlined"
          margin="normal"
          {...register('email', { required: 'email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link href="/register" color="primary">
          Register
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;
