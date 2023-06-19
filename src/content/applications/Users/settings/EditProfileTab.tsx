import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import { useState } from 'react';
import {
  useUpdateUserMutation,
  useUserBadgeQuery
} from 'src/redux/api/Users/userApi';
import { EditTabProps } from './Edit.interfaces';
import CustomModal from 'src/components/CustomModal/CustomModal';

function EditProfileTab({ parsedUser }: EditTabProps) {
  console.log({ parsedUser });
  const { data } = useUserBadgeQuery({ id: parsedUser?.badges[0] });

  const [openUpdate, setOpenUpdate] = useState(false);
  const open: boolean = openUpdate;

  const [userId, setUserId] = useState<string>('');

  const handleOpenUpdate = (id: string) => {
    setOpenUpdate(true);
    setUserId(id);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const [updateUser, { isSuccess: updateUserSuccess }] =
    useUpdateUserMutation();
  const handleSubmitModal = async (formFields, userId: string) => {
    await updateUser({
      id: userId,
      FirstName: formFields.FirstName,
      LastName: formFields.LastName,
      PhoneNumber: formFields.PhoneNumber,
      email: formFields.email,
      password: formFields.password,
      image: formFields.image
    });
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Personal Details
                </Typography>
                <Typography variant="subtitle2">
                  Manage informations related to your personal details
                </Typography>
              </Box>
              <Button
                color="success"
                variant="text"
                onClick={() => handleOpenUpdate(parsedUser._id)}
                startIcon={<EditTwoToneIcon />}
              >
                Edit
              </Button>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={3}
                    mt={10}
                    textAlign={{ sm: 'right' }}
                  >
                    <Box pr={3} pb={2}>
                      Profile picture:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <img
                        src={parsedUser.image}
                        style={{
                          borderRadius: '50%',
                          width: '200px',
                          height: '200px'
                        }}
                      />{' '}
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      First Name:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>{parsedUser?.FirstName}</b>
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Last Name:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>{parsedUser?.LastName}</b>
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Phone Number:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                      <Text color="black">
                        <b>{parsedUser?.PhoneNumber}</b>
                      </Text>
                    </Box>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  User Status
                </Typography>
                <Typography variant="subtitle2">
                  Status related to your account
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Role:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>Developper</b>
                    </Text>
                  </Grid>
                  {/* <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                      <Box pr={3} pb={2}>
                        Timezone:
                      </Box>
                    </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>GMT +2</b>
                    </Text>
                  </Grid> */}
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Badge:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Label color="error">
                      <b>Beginner</b>
                    </Label>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Email Address
                </Typography>
                <Typography variant="subtitle2">
                  Manage details related to your associated email address
                </Typography>
              </Box>
              <Button
                color="success"
                variant="text"
                startIcon={<EditTwoToneIcon />}
              >
                Edit
              </Button>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2}>
                      Email ID:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <b>{parsedUser?.email}</b>
                    </Text>
                    <Box pl={1} component="span">
                      <Label color="success">Primary</Label>
                    </Box>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </Card>
          <CustomModal
            open={open}
            isSuccess={updateUserSuccess}
            onSubmit={handleSubmitModal}
            handleClose={handleCloseUpdate}
            fields={[
              {
                label: 'First Name',
                name: 'FirstName',
                type: 'text',
                required: true
              },
              {
                label: 'Last Name',
                name: 'LastName',
                type: 'text',
                required: true
              },
              {
                label: 'Phone Number',
                name: 'PhoneNumber',
                type: 'text',
                required: true
              },
              {
                label: 'email',
                name: 'email',
                type: 'text',
                required: true
              },
              {
                label: 'password',
                name: 'password',
                type: 'text',
                required: true
              },
              {
                label: 'picture',
                name: 'image',
                type: 'text',
                required: true
              }
            ]}
            action={'Update'}
            title={'Update User'}
            id={userId}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default EditProfileTab;
