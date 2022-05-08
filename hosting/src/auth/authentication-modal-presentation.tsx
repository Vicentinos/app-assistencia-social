import React from "react";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEmailValidation } from "./hooks/use-email-validation";
import { useAuthenticationFormState } from "./hooks/use-authentication-form-state";
import { useEmailChangeHandler } from "./hooks/use-email-change-handler";
import { useFormSubmitHandler } from "./hooks/use-form-submit-handler";

export type Props = {
  isLoggedIn: boolean;
  onSubmitEmailLogin: (email: string) => Promise<void>;
};

export const AuthenticationModalPresentation: React.FC<Props> = ({
  isLoggedIn,
  onSubmitEmailLogin,
}) => {
  const [{ email, submitted, submitting }, setFormState] =
    useAuthenticationFormState();
  const isEmailValid = useEmailValidation(email);
  const onEmailChange = useEmailChangeHandler(setFormState);
  const onClickSubmit = useFormSubmitHandler(
    onSubmitEmailLogin,
    email,
    setFormState
  );
  return (
    <Dialog open={!isLoggedIn}>
      <Box role={"alertdialog"} m={3}>
        <Collapse in={!submitted}>
          <Stack spacing={1}>
            <Typography>Entre utilizando seu email abaixo:</Typography>
            <TextField
              label={"Email"}
              value={email}
              disabled={submitting}
              onChange={onEmailChange}
            />
            <Typography variant={"caption"}>
              Nós enviaremos um link mágico para o seu email. Clique no link
              para entrar automaticamente!
            </Typography>
            <Collapse in={isEmailValid}>
              <Button
                onClick={onClickSubmit}
                aria-busy={submitting}
                disabled={submitting}
                fullWidth
                variant={"contained"}
              >
                Enviar link mágico para o meu email
              </Button>
            </Collapse>
          </Stack>
        </Collapse>
        <Collapse in={submitted}>
          <Typography>
            Enviamos um link mágico para o email {email}. Clique no link para
            entrar automaticamente no App Vicentino.
          </Typography>
        </Collapse>
      </Box>
    </Dialog>
  );
};
