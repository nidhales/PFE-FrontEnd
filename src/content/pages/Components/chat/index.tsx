import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  Card,
  InputBase,
  styled,
  Button
} from '@mui/material';
import { formatDistance, subHours } from 'date-fns';
import { theme } from 'src/shared/utils/theme';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

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

const Input = styled('input')({
  display: 'none'
});
const MessageInputWrapper = styled(InputBase)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(18)};
    padding: ${theme.spacing(1)};
    width: 100%;
`
);
export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
}

export interface ChatProps {
  senderId: string;
  receiverId: string;
}

const Chat: React.FC<ChatProps> = ({ senderId, receiverId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
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
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  const sendMessage = async () => {
    try {
      const messageData = {
        senderId,
        receiverId,
        message: newMessage
      };
      await axios.post('http://localhost:3000/chat', messageData);
      setNewMessage('');
      fetchChatMessages();
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };
  const bottomRef = useRef(null);

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
        <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"></div>
        <div className="list-group list-group-flush border-bottom scrollarea">
          {messages.map((message) => {
            return (
              <div
                className="list-group-item list-group-item-action py-3 lh-tight"
                key={message.id}
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
                      <small>
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </small>
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
            src="/static/images/avatars/avatarNidhal.png"
          />
          <MessageInputWrapper
            placeholder="Write your message here..."
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button
            startIcon={<SendTwoToneIcon />}
            variant="contained"
            onClick={sendMessage}
          >
            Send
          </Button>{' '}
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
};

export default Chat;
