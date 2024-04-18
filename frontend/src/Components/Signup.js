//Import Dependencies required For Signup

import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//Theme For Styling
const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
    
  //Setting Formdata in FormData State
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
       console.log(formData)
  };
          //Action On Clicking Signup Button
  const handleSubmit = async (e) => {
    e.preventDefault();
   
       setFormData(formData) ;
    try {
      const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      // Handle successful signup
      navigate('/signin')
      
    } catch (error) {
      // Handle error
      console.error('Signup failed:', error.message);
      
    }
        
  };
  return (
    <div style={{display:'flex' ,justifyContent:'center' }}>  
   <Card  
      sx={{
        padding: '16px',
        border: '1px solid black',
        maxWidth: '500px', 
        width: '100%', 
        borderRadius:'20px',
         margin:8 ,
         boxShadow: 3 ,
      }} >
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex:'1',
            padding:'4',
            borderBlockColor:'black'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
              autoComplete="given-name"
                name="firstname" // Update name attribute to match formData key
               required
                fullWidth
                 id="firstName"
                    label="First Name"
                 autoFocus
                   onChange={handleChange}
/>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                 required
                  fullWidth
                     id="lastName"
                    label="Last Name"
                    name="lastname" // Update name attribute to match formData key
                     autoComplete="family-name"
                      onChange={handleChange}
/>
              </Grid>
              <Grid item xs={12}>
              <TextField
  required
  fullWidth
  id="email"
  label="Email Address"
  name="email" // Update name attribute to match formData key
  autoComplete="email"
  onChange={handleChange}
/>
              </Grid>
              <Grid item xs={12}>
              <TextField
  required
  fullWidth
  name="password" // Update name attribute to match formData key
  label="Password"
  type="password"
  id="password"
  autoComplete="new-password"
  onChange={handleChange}
/>
              </Grid>  
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='secondary' 
              sx={{ mt: 3, mb: 2 ,borderRadius:2 }}
              onClick={handleSubmit}
              component={Link} to="/signin"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box> 
      </Container>
    </ThemeProvider>
  </Card>
  </div>
  );
}