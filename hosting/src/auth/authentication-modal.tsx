import React, { useState } from "react";
import { Box, Button, Collapse, Dialog, TextField } from "@mui/material";

export type Props = {
  onVerifyEmail: (email: string) => Promise<{ isRegistered: boolean }>;
  isLoggedIn: boolean;
  onSubmitEmailLogin: (email: string, password: string) => void;
};

const useFormState = () =>
  useState<{ email: string; password: string; isRegistered: boolean | null }>({
    email: "",
    password: "",
    isRegistered: null,
  });

export const AuthenticationModal: React.FC<Props> = (props) => {
  const [formState, setFormState] = useFormState();
  return (
    <Dialog open={!props.isLoggedIn}>
      <Box role={"alertdialog"} m={3}>
        <TextField
          label={"Email"}
          value={formState.email}
          onChange={(event) => {
            setFormState(() => ({
              email: event.target.value,
              password: "",
              isRegistered: null,
            }));
          }}
        />
        <Collapse in={Boolean(formState.isRegistered)}>
          <TextField
            label={"Senha"}
            value={formState.password}
            onChange={(event) => {
              setFormState((state) => ({
                ...state,
                password: event.target.value,
              }));
            }}
          />
        </Collapse>
        <Collapse in={formState.isRegistered === null}>
          <Button
            onClick={() => {
              props.onVerifyEmail(formState.email).then((result) => {
                if (result.isRegistered) {
                  setFormState((state) => ({ ...state, isRegistered: true }));
                }
              });
            }}
          >
            Continuar
          </Button>
        </Collapse>
        <Collapse in={Boolean(formState.isRegistered)}>
          <Button
            onClick={() => {
              props.onSubmitEmailLogin(formState.email, formState.password);
            }}
          >
            Enviar
          </Button>
        </Collapse>
      </Box>
    </Dialog>
  );
};
