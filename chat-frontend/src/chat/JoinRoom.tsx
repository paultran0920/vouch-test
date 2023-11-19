import { useState } from "react";
import { ChatJoinEventBody } from "../types/chat.types";
import { Alert, Box, TextField, Typography, useTheme } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Form, Formik, FormikErrors } from "formik";

export type JoinRoomProps = {
  handleJoin: (userInfo: ChatJoinEventBody) => Promise<void>
  handleError: (errMessage: string) => void
}

type FormProps = ChatJoinEventBody

export default function JoinRoom(props: JoinRoomProps) {
  const theme = useTheme();
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async (data: FormProps) => {
    const userInfo = {
      username: data.username,
      roomId: data.roomId
    }
    try {
      setIsJoining(true);
      await props.handleJoin(userInfo)
    } catch (err: any) {
      console.error('Can not join romm.', err);
      props.handleError(err.response?.data.message);
    } finally {
      setIsJoining(false);
    }
  }

  const validateField = (values: FormProps): FormikErrors<FormProps> => {
    const errors: FormikErrors<FormProps> = {};
    if (!values.username) {
      errors.username = 'Username is required';
    }

    if (!values.roomId) {
      errors.roomId = 'RoomID is required';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={
        {
          username: '',
          roomId: ''
        } as FormProps
      }
      validate={(values) => {
        const errors = validateField(values);
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleJoin(values)
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit} noValidate autoComplete="off" style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: theme.spacing(2),
        }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '100%',
              maxWidth: '600px',
              gap: theme.spacing(2)
            }}
          >
            <Box sx={{
              width: '100%',
              textAlign: 'center',
              marginTop: theme.spacing(3),
              marginBottom: theme.spacing(3),
            }}>
              <Typography
                sx={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                }}
              >
                Join Chatroom
              </Typography>
            </Box>

            <TextField
              id="username"
              placeholder="Username"
              defaultValue={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.username && touched.username)}
              helperText={errors.username}
              required={true}
              fullWidth
              disabled={isJoining}
              sx={{
                backgroundColor: '#F6F6F6',
                borderRadius: 2
              }}
              InputProps={{ sx: { borderRadius: 2 } }}
            />

            <TextField
              id="roomId"
              placeholder="RoomID"
              defaultValue={values.roomId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.roomId && touched.roomId)}
              helperText={errors.roomId}
              required={true}
              fullWidth
              disabled={isJoining}
              sx={{
                backgroundColor: '#F6F6F6',
                borderRadius: 2
              }}
              InputProps={{ sx: { borderRadius: 2 } }}
            />

            <Box sx={{
              marginTop: theme.spacing(20)
            }}>
              <LoadingButton
                color="lightgreen"
                loading={isSubmitting}
                loadingPosition="end"
                variant="contained"
                type="submit"
                fullWidth
                disabled={isSubmitting}
                size="large"
                sx={{
                  borderRadius: 5,
                  fontWeight: 'bold',
                }}
              >
                Join
              </LoadingButton></Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
