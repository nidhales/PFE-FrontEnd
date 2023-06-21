import { useEffect, useRef, useState } from 'react';

import { Link, NavLink } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { EditTabProps } from 'src/content/applications/Users/settings/Edit.interfaces';
const UserBoxButton = styled(Button)(
  ({ theme }) => `
          padding-left: ${theme.spacing(1)};
          padding-right: ${theme.spacing(1)};
  `
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
          background: ${theme.colors.alpha.black};
          padding: ${theme.spacing(2)};
  `
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
          text-align: left;
          padding-left: ${theme.spacing(1)};
  `
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
          font-weight: ${theme.typography.fontWeightBold};
          color: ${theme.palette.primary};
          display: block;
  `
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
          color: ${theme.palette.primary}
  `
);

function HeaderUserbox({ parsedUser }: EditTabProps) {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  return (
    <>
      <UserBoxButton
        sx={{
          color: 'black'
        }}
        ref={ref}
        onClick={handleOpen}
      >
        <Avatar variant="rounded">
          <img
            src={parsedUser.image}
            style={{
              borderRadius: '50%',
              width: '50px',
              height: '50px'
            }}
          />{' '}
        </Avatar>
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {user?.FirstName} {user?.LastName}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              <b>{user?.role}</b>
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded">
            <img
              src={parsedUser.image}
              style={{
                borderRadius: '50%',
                width: '50px',
                height: '50px'
              }}
            />
          </Avatar>
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {' '}
              {user?.FirstName} {user?.LastName}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {' '}
              {user?.role}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button to="/dashboards/messenger" component={NavLink}>
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary="Messenger" />
          </ListItem>
          <ListItem
            button
            to="/management/profile/settings"
            component={NavLink}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="Account Settings" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Link to="/signin">
            <Button color="success" onClick={handleLogout} fullWidth>
              <LockOpenTwoToneIcon sx={{ mr: 1 }} />
              Sign out
            </Button>
          </Link>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
