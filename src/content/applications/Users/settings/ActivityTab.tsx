import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  IconButton,
  CardActions
} from '@mui/material';
import { styled } from '@mui/material/styles';

import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import Text from 'src/components/Text';
import { useState, useEffect } from 'react';
import {
  useGetAllErrorsQuery,
  useUpdateErrorMutation
} from 'src/redux/api/Errors/errorApi';
import { EditTabProps } from './Edit.interfaces';

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
     background: ${theme.colors.alpha.black[5]};
     padding: ${theme.spacing(3)};
`
);

function ActivityTab({ parsedUser }: EditTabProps) {
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
