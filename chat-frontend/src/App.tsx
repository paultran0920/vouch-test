import axios from 'axios';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MainLayout from './chat/MainLayout';
import { AppContext, ContextDataType, defaultContext } from './context/app-context';
import { ChatJoinEventBody, ChatMessage, ChatNewMessageEventBody, ChatTopic } from './types/chat.types';
import { Alert, Box, Snackbar, ThemeProvider } from '@mui/material';
import { CustomizedTheme } from './app.theme';

const SERVER_URL = 'http://localhost:13001';
const socket = io(SERVER_URL);

function App() {
  const [contextData, setContextData] =
    useState<ContextDataType>(defaultContext);

  const updateMessages = (newMessage: ChatMessage) => {
    const messages = contextData.messages || [];
    const newMessages = [...messages, newMessage];
    console.info('Messages: ', newMessages)
    setContextData({
      ...contextData,
      messages: newMessages
    });
  }

  useEffect(() => {
    console.info('App refresshing ...');
    socket.on(ChatTopic.ChatNewMessage, updateMessages);

    socket.on(ChatTopic.ChatUserJoined, (userData) => {
      console.log(`${userData.username} joined the room`);
    });

    socket.on(ChatTopic.ChatError, (err) => {
      console.error('Something wrong.', err);
      <Alert severity="error">Opps!. Something wrong with your application.</Alert>
    });
  }, [updateMessages]);

  const handleJoin = async (userInfo: ChatJoinEventBody) => {
    try {
      console.info('Check to join room.');
      await axios.post(`${SERVER_URL}/chat/join`, userInfo);
      console.info('Check to join room - Done');
    } catch (error) {
      throw error;
    }
    console.info('Sending new user event');
    socket.emit(ChatTopic.ChatNewUser, userInfo, (messages) => {
      console.info('Message list: ', messages);
      setContextData({
        ...contextData,
        username: userInfo.username,
        roomId: userInfo.roomId,
        joined: true,
        messages
      });
    });
    console.info('Sending new user event - Done');
  };

  const handleExit = () => {
    setContextData({
      ...contextData,
      username: '',
      roomId: '',
      joined: false
    });
  }

  const handleSend = (message: string) => {
    const newMessage: ChatNewMessageEventBody = {
      username: contextData.username || '',
      roomId: contextData.roomId,
      text: message
    }
    console.info('Sending new message event.');
    socket.emit(ChatTopic.ChatNewMessage, newMessage);
    console.info('Sending new message event - Done.');
  };

  return (
    <ThemeProvider theme={CustomizedTheme}>
      <AppContext.Provider
        value={{ contextData: contextData, setContextData: setContextData }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <MainLayout
            handleSend={handleSend}
            handleJoin={handleJoin}
            handleExit={handleExit}
          />
        </Box>
      </AppContext.Provider>
    </ThemeProvider>
  )
}

export default App;
