import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Button,
  CircularProgress
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useGetAllUsersQuery } from 'src/redux/api/Users/userApi';

function Feed() {
  const { data: users, isLoading, error } = useGetAllUsersQuery();
  if (isLoading) return <CircularProgress color="primary" />;

  return (
    <Card>
      <CardHeader title="Followers Feed" />
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}>
          {users?.map((user) => (
            <Grid key={user.FirstName} item xs={12} sm={6} lg={4}>
              <Box p={3} display="flex" alignItems="flex-start">
                <Avatar src="/static/images/avatars/2.jpg" />
                <Box pl={2}>
                  <Typography gutterBottom variant="subtitle2">
                    {user.email}
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {user.FirstName}
                  </Typography>
                  <Button
                    color="success"
                    variant="outlined"
                    size="small"
                    startIcon={<AddTwoToneIcon />}
                  >
                    Follow
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}

export default Feed;
