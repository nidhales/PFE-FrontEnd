import { useState, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  List,
  Divider,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  lighten,
  styled
} from '@mui/material';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Label from 'src/components/Label';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { ChatMessage } from 'src/content/pages/Components/chat';
import axios from 'axios';
import { EditTabProps } from '../Users/settings/Edit.interfaces';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
          background-color: ${theme.colors.success.lighter};
          color: ${theme.colors.success.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
          margin-left: auto;
          margin-right: auto;
    `
);

const MeetingBox = styled(Box)(
  ({ theme }) => `
          background-color: ${lighten(theme.colors.alpha.black[10], 0.5)};
          margin: ${theme.spacing(2)} 0;
          border-radius: ${theme.general.borderRadius};
          padding: ${theme.spacing(2)};
    `
);

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `
);

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `
);

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }

        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: ${theme.spacing(3)};
                font-size: ${theme.typography.pxToRem(16)};
                color: ${theme.colors.alpha.black[50]};

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: ${theme.colors.alpha.black[100]};
            }
        }
  `
);

function SidebarContent({ parsedUser }: EditTabProps) {
  const [state, setState] = useState({
    invisible: true
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  const [currentTab, setCurrentTab] = useState<string>('all');

  const tabs = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread' },
    { value: 'archived', label: 'Archived' }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  useEffect(() => {
    fetchChatMessages();
  }, []);

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get<ChatMessage[]>(
        `http://localhost:3000/chat/6489b414b4cfa14b403df4cf/648a58d1f7a89cb075c8dcc6`
      );
      setMessages(response.data);
    } catch (error) {
      console.log('Error fetching chat messages:', error);
    }
  };
  return (
    <RootWrapper>
      <Box display="flex" alignItems="flex-start">
        <Avatar variant="rounded">
          <img
            src={parsedUser.image}
            style={{
              borderRadius: '50%',
              width: '50px',
              height: '50px'
            }}
          />{' '}
        </Avatar>{' '}
        <Box
          sx={{
            ml: 1.5,
            flex: 1
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex">
              <Typography variant="h5" noWrap>
                {`${user?.FirstName} ${user?.LastName}`}
              </Typography>
            </Box>
            <IconButton
              // sx={{
              //   p: 1
              // }}
              size="small"
              color="primary"
            >
              <SettingsTwoToneIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <TextField
        sx={{
          mt: 2,
          mb: 1
        }}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          )
        }}
        placeholder="Search..."
      />

      <Typography
        sx={{
          mb: 1,
          mt: 2
        }}
        variant="h3"
      >
        Chats
      </Typography>

      <TabsContainerWrapper>
        <Tabs
          onChange={handleTabsChange}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </TabsContainerWrapper>

      <Box mt={2}>
        {currentTab === 'all' && (
          <List disablePadding component="div">
            <ListItemWrapper selected>
              <ListItemAvatar>
                <Avatar src="/static/images/avatars/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  mr: 1
                }}
                primaryTypographyProps={{
                  color: 'textPrimary',
                  variant: 'h5',
                  noWrap: true
                }}
                secondaryTypographyProps={{
                  color: 'textSecondary',
                  noWrap: true
                }}
                primary="Zain Baptista"
                secondary="Hey there, how are you today? Is it ok if I call you?"
              />
              {/* <Label color="primary">
                <b>2</b>
              </Label> */}
            </ListItemWrapper>
          </List>
        )}
        {currentTab === 'unread' && (
          <List disablePadding component="div">
            <ListItemWrapper>
              <ListItemAvatar>
                <Avatar src="/static/images/avatars/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  mr: 1
                }}
                primaryTypographyProps={{
                  color: 'textPrimary',
                  variant: 'h5',
                  noWrap: true
                }}
                secondaryTypographyProps={{
                  color: 'textSecondary',
                  noWrap: true
                }}
                primary="Zain Baptista"
                secondary="Hey there, how are you today? Is it ok if I call you?"
              />
              <Label color="primary">
                <b>2</b>
              </Label>
            </ListItemWrapper>
            <ListItemWrapper>
              <ListItemAvatar>
                <Avatar src="/static/images/avatars/4.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  mr: 1
                }}
                primaryTypographyProps={{
                  color: 'textPrimary',
                  variant: 'h5',
                  noWrap: true
                }}
                secondaryTypographyProps={{
                  color: 'textSecondary',
                  noWrap: true
                }}
                primary="Adison Press"
                secondary="I recently did some buying on Amazon and now I'm stuck"
              />
              <Label color="primary">
                <b>8</b>
              </Label>
            </ListItemWrapper>
          </List>
        )}
        {currentTab === 'archived' && (
          <Box pb={3}>
            <Divider
              sx={{
                mb: 3
              }}
            />
            <AvatarSuccess>
              <CheckTwoToneIcon />
            </AvatarSuccess>
            <Typography
              sx={{
                mt: 2,
                textAlign: 'center'
              }}
              variant="subtitle2"
            >
              Hurray! There are no archived chats!
            </Typography>
            <Divider
              sx={{
                mt: 3
              }}
            />
          </Box>
        )}
      </Box>
    </RootWrapper>
  );
}

export default SidebarContent;
