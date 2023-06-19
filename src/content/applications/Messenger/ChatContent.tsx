import {
  Box,
  Avatar,
  Typography,
  Card,
  styled,
  Divider,
  Button,
  IconButton,
  Input,
  Tooltip,
  InputBase
} from '@mui/material';

import {
  formatDistance,
  format,
  subDays,
  subHours,
  subMinutes
} from 'date-fns';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import { useEffect, useRef, useState } from 'react';
import Pusher from 'pusher-js';
import { theme } from 'src/shared/utils/theme';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
const DividerWrapper = styled(Divider)(
  ({ theme }) => `
      .MuiDivider-wrapper {
        border-radius: ${theme.general.borderRadiusSm};
        text-transform: none;
        background: ${theme.palette.background.default};
        font-size: ${theme.typography.pxToRem(13)};
        color: ${theme.colors.alpha.black[50]};
      }
`
);

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[10]};
      color: ${theme.colors.alpha.black[100]};
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 380px;
      display: inline-flex;
`
);
const MessageInputWrapper = styled(InputBase)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(18)};
    padding: ${theme.spacing(1)};
    width: 100%;
`
);

function ChatContent() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  const Input = styled('input')({
    display: 'none'
  });

  const [username, setUsername] = useState('username');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  let allMessages = [];

  useEffect(() => {
    console.log('Pusher logging enabled');

    const pusher = new Pusher('96292b410eff59663717', {
      cluster: 'eu'
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', function (data) {
      allMessages.push(data);
      setMessages(allMessages);
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [message]);

  const submit = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:3000/pusher/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        message
      })
    });

    setMessage('');
  };
  const bottomRef = useRef(null);

  return (
    //   <Box p={3}>
    //   <DividerWrapper>
    //     {format(subDays(new Date(), 3), 'MMMM dd yyyy')}
    //   </DividerWrapper>

    //   <Box
    //     display="flex"
    //     alignItems="flex-start"
    //     justifyContent="flex-start"
    //     py={3}
    //   >
    //     <Avatar
    //       variant="rounded"
    //       sx={{
    //         width: 50,
    //         height: 50
    //       }}
    //       alt="Zain Baptista"
    //       src="/static/images/avatars/2.jpg"
    //     />
    //     <Box
    //       display="flex"
    //       alignItems="flex-start"
    //       flexDirection="column"
    //       justifyContent="flex-start"
    //       ml={2}
    //     >
    //       <CardWrapperSecondary>
    //         {message.message}
    //       </CardWrapperSecondary>
    //       <Typography
    //         variant="subtitle1"
    //         sx={{
    //           pt: 1,
    //           display: 'flex',
    //           alignItems: 'center'
    //         }}
    //       >
    //         <ScheduleTwoToneIcon
    //           sx={{
    //             mr: 0.5
    //           }}
    //           fontSize="small"
    //         />
    //         {formatDistance(subHours(new Date(), 115), new Date(), {
    //           addSuffix: true
    //         })}
    //       </Typography>
    //     </Box>
    //   </Box>

    //   <Box
    //     display="flex"
    //     alignItems="flex-start"
    //     justifyContent="flex-end"
    //     py={3}
    //   >
    //     <Box
    //       display="flex"
    //       alignItems="flex-end"
    //       flexDirection="column"
    //       justifyContent="flex-end"
    //       mr={2}
    //     >
    //       <CardWrapperPrimary>
    //         Yes, I'll email them right now. I'll let you know once the remaining
    //         invoices are done.
    //       </CardWrapperPrimary>
    //       <Typography
    //         variant="subtitle1"
    //         sx={{
    //           pt: 1,
    //           display: 'flex',
    //           alignItems: 'center'
    //         }}
    //       >
    //         <ScheduleTwoToneIcon
    //           sx={{
    //             mr: 0.5
    //           }}
    //           fontSize="small"
    //         />
    //         {formatDistance(subHours(new Date(), 125), new Date(), {
    //           addSuffix: true
    //         })}
    //       </Typography>
    //     </Box>
    //     <Avatar
    //       variant="rounded"
    //       sx={{
    //         width: 50,
    //         height: 50
    //       }}
    //       alt={user.name}
    //       src={user.avatar}
    //     />
    //   </Box>
    //   <DividerWrapper>
    //     {format(subDays(new Date(), 5), 'MMMM dd yyyy')}
    //   </DividerWrapper>

    //   <Box
    //     display="flex"
    //     alignItems="flex-start"
    //     justifyContent="flex-end"
    //     py={3}
    //   >
    //     <Box
    //       display="flex"
    //       alignItems="flex-end"
    //       flexDirection="column"
    //       justifyContent="flex-end"
    //       mr={2}
    //     >
    //       <CardWrapperPrimary>Hey! Are you there?</CardWrapperPrimary>
    //       <CardWrapperPrimary
    //         sx={{
    //           mt: 2
    //         }}
    //       >
    //         Heeeelloooo????
    //       </CardWrapperPrimary>
    //       <Typography
    //         variant="subtitle1"
    //         sx={{
    //           pt: 1,
    //           display: 'flex',
    //           alignItems: 'center'
    //         }}
    //       >
    //         <ScheduleTwoToneIcon
    //           sx={{
    //             mr: 0.5
    //           }}
    //           fontSize="small"
    //         />
    //         {formatDistance(subHours(new Date(), 60), new Date(), {
    //           addSuffix: true
    //         })}
    //       </Typography>
    //     </Box>
    //     <Avatar
    //       variant="rounded"
    //       sx={{
    //         width: 50,
    //         height: 50
    //       }}
    //       alt={user.name}
    //       src={user.avatar}
    //     />
    //   </Box>
    //   <DividerWrapper>Today</DividerWrapper>
    //   <Box
    //     display="flex"
    //     alignItems="flex-start"
    //     justifyContent="flex-start"
    //     py={3}
    //   >
    //     <Avatar
    //       variant="rounded"
    //       sx={{
    //         width: 50,
    //         height: 50
    //       }}
    //       alt="Zain Baptista"
    //       src="/static/images/avatars/2.jpg"
    //     />
    //     <Box
    //       display="flex"
    //       alignItems="flex-start"
    //       flexDirection="column"
    //       justifyContent="flex-start"
    //       ml={2}
    //     >
    //       <CardWrapperSecondary>Hey there!</CardWrapperSecondary>
    //       <CardWrapperSecondary
    //         sx={{
    //           mt: 1
    //         }}
    //       >
    //         How are you? Is it ok if I call you?
    //       </CardWrapperSecondary>
    //       <Typography
    //         variant="subtitle1"
    //         sx={{
    //           pt: 1,
    //           display: 'flex',
    //           alignItems: 'center'
    //         }}
    //       >
    //         <ScheduleTwoToneIcon
    //           sx={{
    //             mr: 0.5
    //           }}
    //           fontSize="small"
    //         />
    //         {formatDistance(subMinutes(new Date(), 6), new Date(), {
    //           addSuffix: true
    //         })}
    //       </Typography>
    //     </Box>
    //   </Box>
    //   <Box
    //     display="flex"
    //     alignItems="flex-start"
    //     justifyContent="flex-end"
    //     py={3}
    //   >
    //     <Box
    //       display="flex"
    //       alignItems="flex-end"
    //       flexDirection="column"
    //       justifyContent="flex-end"
    //       mr={2}
    //     >
    //       <CardWrapperPrimary>
    //         Hello, I just got my Amazon order shipped and I’m very happy about
    //         that.
    //       </CardWrapperPrimary>
    //       <CardWrapperPrimary
    //         sx={{
    //           mt: 1
    //         }}
    //       >
    //         Can you confirm?
    //       </CardWrapperPrimary>
    //       <Typography
    //         variant="subtitle1"
    //         sx={{
    //           pt: 1,
    //           display: 'flex',
    //           alignItems: 'center'
    //         }}
    //       >
    //         <ScheduleTwoToneIcon
    //           sx={{
    //             mr: 0.5
    //           }}
    //           fontSize="small"
    //         />
    //         {formatDistance(subMinutes(new Date(), 8), new Date(), {
    //           addSuffix: true
    //         })}
    //       </Typography>
    //     </Box>
    //     <Avatar
    //       variant="rounded"
    //       sx={{
    //         width: 50,
    //         height: 50
    //       }}
    //       alt={user.name}
    //       src={user.avatar}
    //     />
    //   </Box>
    // </Box>

    <div className="container">
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
        <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"></div>
        <div className="list-group list-group-flush border-bottom scrollarea">
          {messages.map((message) => {
            return (
              <div
                className="list-group-item list-group-item-action py-3 lh-tight"
                key={message.username}
              >
                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="flex-end"
                  // py={3}
                >
                  <Box
                    display="flex"
                    alignItems="flex-end"
                    flexDirection="column"
                    justifyContent="flex-end"
                    mr={2}
                  >
                    <CardWrapperPrimary
                      sx={{
                        mt: 2
                      }}
                    >
                      {message.message}
                    </CardWrapperPrimary>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        pt: 1,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <ScheduleTwoToneIcon
                        sx={{
                          mr: 0.5
                        }}
                        fontSize="small"
                      />
                      {formatDistance(subHours(new Date(), 60), new Date(), {
                        addSuffix: true
                      })}
                    </Typography>
                  </Box>
                </Box>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>
      <Box
        sx={{
          background: '#f2f5f9',
          display: 'flex',
          alignItems: 'center',
          p: 2
        }}
        style={{
          position: 'sticky',
          bottom: '0px'
        }}
      >
        <Box flexGrow={1} display="flex" alignItems="center">
          <Avatar
            sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }}
            alt={user.name}
            src={user.avatar}
          />
          <form onSubmit={(e) => submit(e)}>
            <MessageInputWrapper
              placeholder="Write your message here..."
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
          <Box display="flex" alignItems="center">
            <Tooltip arrow placement="top" title="Choose an emoji">
              <IconButton
                sx={{ fontSize: theme.typography.pxToRem(16) }}
                color="primary"
              >
                😀
              </IconButton>
            </Tooltip>
            <Input id="messenger-upload-file" type="file" />
            <Tooltip arrow placement="top" title="Attach a file">
              <label htmlFor="messenger-upload-file">
                <IconButton sx={{ mx: 1 }} color="primary" component="span">
                  <AttachFileTwoToneIcon fontSize="small" />
                </IconButton>
              </label>
            </Tooltip>{' '}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ChatContent;
