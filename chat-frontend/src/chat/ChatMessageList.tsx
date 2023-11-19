import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Alert, Box, InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import { ChatMessage } from "../types/chat.types";
import ChatMessageItem from "./ChatMessageItem";

export type ChatMessageListProps = {
  roomId: string
  username: string
  messages: ChatMessage[]
  handleSend: (newMessage: string) => void
  handleExit: () => void
  handleError: (errMessage: string) => void
}

export default function ChatMessageList(props: ChatMessageListProps) {
  const theme = useTheme();

  const handleSend = async (message: string) => {
    try {
      props.handleSend(message);
    } catch (err: any) {
      console.error('Can not send message', err);
      props.handleError(err.response?.data.message);
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        maxWidth: '600px',
        padding: theme.spacing(3)
      }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }}>
        <Box
          onClick={props.handleExit}
          sx={{
            position: 'absolute',
            alignSelf: 'center',
            cursor: 'pointer',
          }}>
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              color: 'green'
            }}
          >
            Exit
          </Typography>
        </Box>
        <Box sx={{
          width: '100%',
          textAlign: 'center',
          marginTop: theme.spacing(3),
          marginBottom: theme.spacing(3),
          flex: 1
        }}>
          <Typography
            sx={{
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            {props.roomId}
          </Typography>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2)
      }}>
        {props.messages.map((msg) => (
          <ChatMessageItem message={msg} username={props.username} />
        ))}
      </Box>

      <Formik
        initialValues={
          {
            message: ''
          }
        }
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSend(values.message)
            .finally(() => {
              resetForm();
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit
        }) => (
          <Form onSubmit={handleSubmit} noValidate autoComplete="off" style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <TextField
              id="message"
              placeholder="Message here..."
              defaultValue={values.message}
              value={values.message}
              onChange={handleChange}
              fullWidth
              sx={{
                backgroundColor: '#F6F6F6',
                borderRadius: 7
              }}
              InputProps={{
                sx: { borderRadius: 7 },
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      sx={{
                        display: 'flex',
                        color: 'white',
                        backgroundColor: '#5DB075',
                        width: '40px',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        marginRight: '-5px',
                      }}
                      onClick={() => handleSubmit()}
                    >
                      <ArrowUpwardIcon />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Form>
        )}
      </Formik>
    </Box>
  )
}
