import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import {
  SignInPage,
  type AuthProvider,
  type AuthResponse,
} from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { authService } from '../../services/authService';
import { setAuthenticated } from './AuthSlice';


const providers: AuthProvider[] = [
  { id: 'credentials', name: 'Email and Password' },
];

export default function SignIn() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signIn = async (
    _: AuthProvider,
    formData: FormData,
  ): Promise<AuthResponse> => {
    try {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      const response = await authService.login(email, password);

      

      localStorage.setItem("accessToken", response.accessToken.token);


      dispatch(
        setAuthenticated({
          userId: response.userId,
          email: response.email,
          fullName: response.fullName,
          roles: response.roles,
        }),
      );


      navigate('/', { replace: true });

      return { type: 'success' };
    } catch {
      return {
        type: 'error',
        error: 'Email veya şifre hatalı',
      };
    }
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
  );
}
