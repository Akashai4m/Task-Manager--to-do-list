//Import Dependencies required For Signin

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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//Theme For Styling
const defaultTheme = createTheme();

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  //Define Navigate For Routing
  const navigate = useNavigate();
     
  //Setting Formdata in FormData State
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };
      //Action On Clicking Signin Button
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signin', formData);

      // Store token in local storage
      localStorage.setItem('token', response.data.token);
             
      // Redirect to todo list page on successful signin
      navigate('/to-do-list');
    } catch (error) {
      console.error('Signin failed:', error);
      // Redirect to signup page on signin failure
       navigate('/');
    }
  };   

  return (
    <div style={{display:'flex' ,justifyContent:'center'}}><br/>
   <Card 
      sx={{
        padding: '16px',
        border: '1px solid black',
        maxWidth: '500px', 
        width: '100%', 
        borderRadius:'20px',
         margin:'32px' ,
         boxShadow: 3 ,
      }}>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='secondary'
              sx={{ mt: 3, mb: 2 ,borderRadius:2 }}
              component={Link} to="/to-do-list"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid sx={{display:'flex' ,justifyContent:'end'}} container>
             
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
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