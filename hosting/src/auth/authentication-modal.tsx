import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export type Props = {
  isLoggedIn: boolean;
  onSubmitEmailLogin: (email: string) => Promise<void>;
};

const validateEmail = (email: string) => {
  const emailRegex =
    // eslint-disable-next-line
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const AuthenticationModal: React.FC<Props> = (props) => {
  const [formState, setFormState] = useState<{
    email: string;
    submitting: boolean;
    submitted: boolean;
  }>({
    email: "",
    submitting: false,
    submitted: false,
  });
  return (
    <Dialog open={!props.isLoggedIn}>
      <Box role={"alertdialog"} m={3}>
        <Stack spacing={1}>
          <Typography>Entre utilizando seu email abaixo:</Typography>
          <TextField
            label={"Email"}
            value={formState.email}
            disabled={formState.submitting}
            onChange={(event) => {
              setFormState((state) => ({
                ...state,
                email: event.target.value,
              }));
            }}
          />
          <Typography variant={"caption"}>
            Nós enviaremos um link mágico para o seu email. Clique no link para
            entrar automaticamente!
          </Typography>
          <Collapse in={validateEmail(formState.email)}>
            <Button
              onClick={() => {
                props.onSubmitEmailLogin(formState.email).then(() => {
                  setFormState((state) => ({
                    ...state,
                    submitting: false,
                    submitted: true,
                  }));
                });
                setFormState((state) => ({ ...state, submitting: true }));
              }}
              aria-busy={formState.submitting}
              disabled={formState.submitting}
            >
              Enviar link mágico para o meu email
            </Button>
          </Collapse>
        </Stack>
      </Box>
    </Dialog>
  );
};
