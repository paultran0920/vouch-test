import { Box } from "@mui/material";
import { ChatMessage } from "../types/chat.types";
import { useTheme } from "@mui/material";

export type ChatMessageItemProps = {
  username: string
  message: ChatMessage
}

export default function ChatMessageItem(props: ChatMessageItemProps) {
  const theme = useTheme();
  const isOwner = props.username === props.message.username;

  const renderUsername = () => {
    if (!isOwner) {
      return (
        <Box>
          {props.username}
        </Box>
      )
    }
  }

  const renderTriangular = () => {
    const boxWidth = '15px';

    if (isOwner) {
      return (
        <Box sx={{
          alignSelf: 'flex-end',
          borderTopWidth: boxWidth,
          borderTopStyle: 'solid',
          borderTopColor: '#5DB075',
          borderLeftWidth: boxWidth,
          borderLeftStyle: 'solid',
          borderLeftColor: 'transparent',
          marginTop: '-1px'
        }} />
      )
    } else {
      return (
        <Box sx={{
          width: '0px',
          borderTopWidth: boxWidth,
          borderTopStyle: 'solid',
          borderTopColor: '#F6F6F6',
          borderRightWidth: boxWidth,
          borderRightStyle: 'solid',
          borderRightColor: 'transparent',
          marginTop: '-1px'
        }} />
      )
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      justifyContent: !isOwner ? 'flex-start' : 'flex-end',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
      }}>
        {renderUsername()}
        <Box sx={{
          backgroundColor: isOwner ? '#5DB075' : '#F6F6F6',
          width: '100%',
          borderTopLeftRadius: theme.spacing(1),
          borderTopRightRadius: theme.spacing(1),
          borderBottomLeftRadius: isOwner ? theme.spacing(1) : '0px',
          borderBottomRightRadius: isOwner ? '0px' : theme.spacing(1)
        }}>
          <Box sx={{
            margin: 2,
            color: isOwner ? 'white' : 'inherit'
          }}>{props.message.text}</Box>
        </Box>
        {renderTriangular()}
      </Box>
    </Box>
  );
}
