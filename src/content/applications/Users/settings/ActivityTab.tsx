import {
  Box,
  CardMedia,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  IconButton,
  Button,
  CardActions,
  Link
} from '@mui/material';
import { styled } from '@mui/material/styles';

import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import Text from 'src/components/Text';
import { useState, useEffect } from 'react';
import {
  useGetAllErrorsQuery,
  useDeleteErrorMutation,
  useUpdateErrorMutation
} from 'src/redux/api/Errors/errorApi';

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
     background: ${theme.colors.alpha.black[5]};
     padding: ${theme.spacing(3)};
`
);

function ActivityTab() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);
  const { data: errors, isLoading, error } = useGetAllErrorsQuery();
  useUpdateErrorMutation();
  return (
    <>
      {errors?.map((error) => (
        <Card
          sx={{
            mt: 2
          }}
          key={error.id}
        >
          <CardHeader
            avatar={<Avatar src="/static/images/avatars/avatarNidhal.png" />}
            action={
              <IconButton color="success">
                <MoreHorizTwoToneIcon fontSize="medium" />
              </IconButton>
            }
            titleTypographyProps={{ variant: 'h4' }}
            subheaderTypographyProps={{ variant: 'subtitle2' }}
            title={`${user?.FirstName} ${user?.LastName}`}
          />
          <Box p={3}>
            <Typography variant="h2" sx={{ pb: 2 }}>
              {error.ErrorName}
            </Typography>
            <Typography variant="subtitle2">
              {error.ErrorDescription}
            </Typography>
          </Box>
          <Divider />
          <CardActionsWrapper
            sx={{
              display: { xs: 'block', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ mt: { xs: 2, md: 0 } }}>
              <Typography variant="subtitle2" component="span">
                <Text color="black">
                  <b>7</b>
                </Text>{' '}
                reactions •{' '}
                <Text color="black">
                  <b>{error.solutions.length}</b>
                </Text>{' '}
                comments
              </Typography>
            </Box>
          </CardActionsWrapper>
        </Card>
      ))}
    </>
  );
}

export default ActivityTab;
