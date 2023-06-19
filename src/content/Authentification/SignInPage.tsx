import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthLayout from 'src/components/Authentification/AuthLayout';
import SigninForumComponent from 'src/components/Authentification/SigninFrom.component';
import { theme } from 'src/shared/utils/theme';

export const SignInPage = () => {
  return (
    <>
      <Helmet>
        <title>PartagiNet - SignIn</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <AuthLayout>
          <SigninForumComponent />
        </AuthLayout>
      </ThemeProvider>
    </>
  );
};
export default SignInPage;
