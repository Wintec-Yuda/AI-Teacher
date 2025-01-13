'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Link, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useRouter } from 'next/navigation';
import axiosServices from '@/app/lib/axios/axiosServices';

interface RegisterFormInputs {
  name: string;
  role: 'student' | 'teacher';
  email: string;
  password: string;
}

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data: RegisterFormInputs) => {
    console.log('Register Data:', data);
    
    try {
      const response = await axiosServices.register( data.name, data.role, data.email, data.password);
      
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
        {/* Name Input */}
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          {...register('name', { required: 'Name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message}
          defaultValue=""  // Ensure the value is initialized as empty string
        />
        
        {/* Email Input */}
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
          defaultValue=""  // Ensure the value is initialized as empty string
        />
        
        {/* Password Input */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
          defaultValue=""  // Ensure the value is initialized as empty string
        />
        
        {/* Role Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            label="Role"
            {...register('role', { required: 'Role is required' })}
            error={!!errors.role}
            defaultValue="student"  // Default to "student"
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
          </Select>
          {errors.role && <Typography variant="body2" color="error">{errors.role?.message}</Typography>}
        </FormControl>

        {/* Register Button */}
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

      {/* Link to Login */}
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
