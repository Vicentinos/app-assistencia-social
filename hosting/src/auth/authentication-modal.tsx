import React, { useState } from "react";
import { Box, Button, Dialog, TextField } from "@mui/material";

export type Props = {
  isLoggedIn: boolean;
  onSubmitEmailLogin: (email: string, password: string) => void;
};
export const AuthenticationModal: React.FC<Props> = (props) => {
  const [emailValue, setEmailValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  return (
    <Dialog open={!props.isLoggedIn}>
      <Box role={"alertdialog"}>
        <TextField
          label={"Email"}
          value={emailValue}
          onChange={(event) => {
            setEmailValue(event.target.value);
          }}
        />
        <TextField
          label={"Senha"}
          value={pwValue}
          onChange={(event) => {
            setPwValue(event.target.value);
          }}
        />
        <Button
          onClick={() => {
            props.onSubmitEmailLogin(emailValue, pwValue);
          }}
        >
          Enviar
        </Button>
      </Box>
    </Dialog>
  );
};
