import {
  Box,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Button,
  Divider,
  Alert,
} from '@mui/material';
import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from 'src/redux/api/Auth/authApi';

const SigninForumComponent: FC = () => {
  const initialValues: FormikValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 8 characters long')
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    // )
  });

  const navigate = useNavigate();

  const [login, { isSuccess, isError }] = useLoginMutation();
  const onSubmitHandler = async (values: FormikValues) => {
    await login({
      email: values.email,
      password: values.password
    })
      .unwrap()
      .then((payload) => {
        localStorage.setItem('token', JSON.stringify(payload.token));
        localStorage.setItem('user', JSON.stringify(payload.user));
      });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboards/feeds');
    }
  }, [isSuccess]);

  return (
    <Box
      sx={{
        border: 1,
        padding: 2,
        borderColor: '#cccccc',
        width: '350px',
        marginTop: 5
      }}
    >
      <Grid container direction="column" justifyContent="flex-start">
        <Typography variant="h4" component="h1" style={{ fontStyle: 'italic' }}>
          Sign-In
        </Typography>
        <Formik
          onSubmit={onSubmitHandler}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}>
              <InputLabel
                sx={{
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  marginTop: 1,
                  color: '#000000'
                }}
                htmlFor="email"
              >
                Your email
              </InputLabel>
              <TextField
                sx={{
                  width: '100%'
                }}
                type="email"
                name="email"
                id="email"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={!!touched.email && !!errors.email}
                helperText={
                  touched.email && errors.email
                    ? JSON.stringify(errors.email)
                    : ''
                }
                variant="outlined"
                size="small"
              />

              <InputLabel
                sx={{
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  marginTop: 1,
                  color: '#000000'
                }}
                htmlFor="password"
              >
                Password
              </InputLabel>
              <TextField
                sx={{
                  width: '100%'
                }}
                type="password"
                name="password"
                id="password"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={!!touched.email && !!errors.password}
                helperText={
                  touched.password && errors.password
                    ? JSON.stringify(errors.password)
                    : ''
                }
                variant="outlined"
                size="small"
              />
              {isError && (
                <Alert severity="error" sx={{ margin: '5px 0' }}>
                  Invalid credentials. Please check your email or password
                </Alert>
              )}
              <Button
                id="signin-btn"
                variant="contained"
                style={{
                  width: '100%',
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                  marginTop: '16px',
                  height: '31px',
                  backgroundColor: '#B1EB4E',
                  color: 'black',
                  borderColor: '#a88734 #9c7e31 #846a29',
                  textTransform: 'none'
                }}
                type="submit"
              >
                Sign-In
              </Button>
            </form>
          )}
        </Formik>
      </Grid>

      <div style={{ marginTop: '16px' }}>
        <Divider>
          <small style={{ color: '767676' }}>New to ContinuousNet?</small>
        </Divider>
        <Link
          to="/register"
          style={{
            fontStyle: 'italic',
            fontWeight: 'bold',
            textDecoration: 'none',
            color: '#0000ee'
          }}
        >
          <Button
            variant="contained"
            style={{
              width: '100%',
              fontStyle: 'italic',
              fontWeight: 'bold',
              marginTop: '16px',
              height: '31px',
              backgroundColor: '#f1f1f1',
              color: 'black',
              textTransform: 'none'
            }}
          >
            Register
          </Button>
        </Link>
      </div>
    </Box>
  );
};

export default SigninForumComponent;
