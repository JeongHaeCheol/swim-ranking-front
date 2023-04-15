import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import { AuthContext } from './AuthContext';

// ----------------------------------------------------------------------



export default function LoginForm() {
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
    return null;
  }



  const onLogin = (email, password) => {
    
    console.log(email);
  
    const data = {
      email,
      password,
    };
    axios.post('/auth/login', data).then(response => {
      const { accessToken } = response.data;
  
      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      setIsAuthenticated(true);
      // accessToken을 localStorage, cookie 등에 저장하지 않는다!
      navigate('/dashboard', { replace: true });
    }).catch(error => {
      console.log("login Error");
    });
  }
  


  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(event) => setEmail(event.target.value)} />

        <TextField
          name="password"
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={() => onLogin(email,password)}>
        Login
      </LoadingButton>
    </>
  );
}
