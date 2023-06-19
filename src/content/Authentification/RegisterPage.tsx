import { ThemeProvider } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import AuthLayout from 'src/components/Authentification/AuthLayout';
import RegistrationForumComponent from 'src/components/Authentification/RegistrationForumComponent';
import { theme } from 'src/shared/utils/theme';

export const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>PartagiNet - Register</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <AuthLayout>
          <RegistrationForumComponent />
        </AuthLayout>
      </ThemeProvider>
    </>
  );
};
export default RegisterPage;
