import { useContext, useState } from "react";
import ChatMessageList from "./ChatMessageList";
import JoinRoom from "./JoinRoom";
import { AppContext } from "../context/app-context";
import { ChatJoinEventBody } from "../types/chat.types";
import { Alert, Snackbar } from "@mui/material";

export type MainLayoutProps = {
  handleSend: (newMessage: string) => void
  handleJoin: (userInfo: ChatJoinEventBody) => Promise<void>
  handleExit: () => void
}

export default function MainLayout(props: MainLayoutProps) {
  const { contextData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  }

  const handleError = (message: string) => {
    setOpen(true);
    setErrorMessage(message);
  }

  const renderError = () => {
    return (
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    );
  }

  if (contextData.joined) {
    return (
      <>
        <ChatMessageList
          roomId={contextData.roomId || ''}
          username={contextData.username || ''}
          messages={contextData.messages || []}
          handleSend={props.handleSend}
          handleExit={props.handleExit}
          handleError={handleError}
        />
        {renderError()}
      </>
    )
  } else {
    return (
      <>
        <JoinRoom
          handleJoin={props.handleJoin}
          handleError={handleError}
        />
        {renderError()}
      </>
    )
  }
}
