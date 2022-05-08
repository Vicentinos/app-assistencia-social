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
import { useAuthenticationModalPresentationLogic } from "./hooks/use-authentication-modal-presentation-logic";

export type Props = {
  isLoggedIn: boolean;
  onSubmitEmailLogin: (email: string) => Promise<void>;
};

export const AuthenticationModalPresentation: React.FC<Props> = (props) => {
  const logic = useAuthenticationModalPresentationLogic(
    props.onSubmitEmailLogin
  );
  return (
    <Dialog open={!props.isLoggedIn}>
      <Box role={"alertdialog"} m={3}>
        <Collapse in={!logic.submitted}>
          <Stack spacing={1}>
            <Typography>Entre utilizando seu email abaixo:</Typography>
            <TextField
              label={"Email"}
              value={logic.email}
              disabled={logic.submitting}
              onChange={logic.onEmailChange}
            />
            <Typography variant={"caption"}>
              Nós enviaremos um link mágico para o seu email. Clique no link
              para entrar automaticamente!
            </Typography>
            <Collapse in={logic.isEmailValid}>
              <Button
                onClick={logic.onClickSubmit}
                aria-busy={logic.submitting}
                disabled={logic.submitting}
                fullWidth
                variant={"contained"}
              >
                Enviar link mágico para o meu email
              </Button>
            </Collapse>
          </Stack>
        </Collapse>
        <Collapse in={logic.submitted}>
          <Typography>
            Enviamos um link mágico para o email {logic.email}. Clique no link
            para entrar automaticamente no App Vicentino.
          </Typography>
        </Collapse>
      </Box>
    </Dialog>
  );
};
