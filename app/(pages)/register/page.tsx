'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useRouter } from 'next/navigation';
import axiosServices from '@/app/lib/axios/axiosServices';

interface RegisterFormInputs {
  email: string;
  password: string;
}

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data: RegisterFormInputs) => {
    try {
      const response = await axiosServices.register(data.email, data.password);
      
      console.log('Registration Successful:', response);

      router.push('/login');
    } catch (error) {
      console.error('Error during registration:', error);
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
        Register
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
          Register
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Link href="/login" color="primary">
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterPage;
