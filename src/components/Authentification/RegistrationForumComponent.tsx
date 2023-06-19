import {
  Box,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Button,
  Divider
} from '@mui/material';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import useInput from 'src/models/use-input';
import { validatePasswordLength } from 'src/shared/utils/validation/length';
import { useRegisterMutation } from 'src/redux/api/Auth/authApi';

const RegistrationForumComponent: FC = () => {
  const {
    text: confirmPassword,
    shouldDisplayError: confirmPasswordHasError,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler
  } = useInput(validatePasswordLength);

  const initialValues: FormikValues = {
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    email: '',
    password: ''
  };
  const validationSchema = Yup.object().shape({
    FirstName: Yup.string()
      .required('Name is required')
      .min(2, 'Namme must be at least 2 characters'),
    LastName: Yup.string()
      .required('Name is required')
      .min(2, 'Namme must be at least 2 characters'),
    PhoneNumber: Yup.string()
      .required('Name is required')
      .min(2, 'Namme must be at least 2 characters'),
    email: Yup.string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long')
  });

  const navigate = useNavigate();

  const [register, { isSuccess }] = useRegisterMutation();

  const onSubmitHandler = async (values: FormikValues) => {
    await register({
      FirstName: values.FirstName,
      LastName: values.LastName,
      PhoneNumber: values.PhoneNumber,
      email: values.email,
      password: values.password
    })
      .unwrap()
      .then((payload) => navigate('/'));
  };

  return (
    <Box
      sx={{
        border: 1,
        padding: 2,
        borderColor: '#cccccc',
        width: '350px',
        marginTop: 10
        // backgroundColor: '#D8EFE3'
      }}
    >
      <Grid container direction="column" justifyContent="flex-start">
        <Typography variant="h4" component="h1" style={{ fontStyle: 'italic' }}>
          Create account
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
                htmlFor="FirstName"
              >
                First Name
              </InputLabel>

              <TextField
                sx={{
                  width: '100%'
                }}
                type="text"
                name="FirstName"
                id="FirstName"
                variant="outlined"
                size="small"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.FirstName}
                error={!!(touched.name && errors.name)}
                helperText={
                  touched.name && errors.name ? JSON.stringify(errors.name) : ''
                }
              />

              <InputLabel
                sx={{
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  marginTop: 1,
                  color: '#000000'
                }}
                htmlFor="LastName"
              >
                Last Name
              </InputLabel>

              <TextField
                sx={{
                  width: '100%'
                }}
                type="text"
                name="LastName"
                id="LastName"
                variant="outlined"
                size="small"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.LastName}
                error={!!(touched.name && errors.name)}
                helperText={
                  touched.name && errors.name ? JSON.stringify(errors.name) : ''
                }
              />

              <InputLabel
                sx={{
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  marginTop: 1,
                  color: '#000000'
                }}
                htmlFor="PhoneNumber"
              >
                Phone Number
              </InputLabel>

              <TextField
                sx={{
                  width: '100%'
                }}
                type="text"
                name="PhoneNumber"
                id="PhoneNumber"
                variant="outlined"
                size="small"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.PhoneNumber}
                error={!!(touched.name && errors.name)}
                helperText={
                  touched.name && errors.name ? JSON.stringify(errors.name) : ''
                }
              />

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
                variant="outlined"
                size="small"
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
                variant="outlined"
                size="small"
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
              />

              <InputLabel
                sx={{
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  marginTop: 1,
                  color: '#000000'
                }}
                htmlFor="ConfirmPassword"
              >
                Re-enter Password
              </InputLabel>
              <TextField
                sx={{
                  width: '100%'
                }}
                value={confirmPassword}
                onChange={confirmPasswordChangeHandler}
                onBlur={confirmPasswordBlurHandler}
                error={
                  confirmPassword.length > 0 &&
                  values.password !== confirmPassword
                }
                helperText={
                  confirmPassword.length > 0 &&
                  values.password !== confirmPassword
                    ? 'Passwords must match'
                    : ''
                }
                type="password"
                name="ConfirmPassword"
                id="ConfirmPassword"
                variant="outlined"
                size="small"
              />
              <Button
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
                Register
              </Button>
            </form>
          )}
        </Formik>
      </Grid>

      <Divider sx={{ marginTop: '36px', marginBottom: '20px' }} />

      <div style={{ textAlign: 'center' }}>
        <small
          style={{
            fontStyle: 'italic',
            fontWeight: 'bold',
            textDecoration: 'none',
            textAlign: 'center'
          }}
        >
          Already have an account?{' '}
          <Link
            to="/signin"
            style={{
              fontStyle: 'italic',
              fontWeight: 'bold',
              textDecoration: 'none',
              color: '#B1EB4E'
            }}
          >
            Sign-In
          </Link>
        </small>
      </div>
    </Box>
  );
};

export default RegistrationForumComponent;
