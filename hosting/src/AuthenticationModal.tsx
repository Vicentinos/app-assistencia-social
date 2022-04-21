import React, {useState} from "react";
import {Box, Button, Dialog, Stack, TextField, Typography} from "@mui/material";
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import "./config/firebase.dev";

const auth = getAuth();
connectAuthEmulator(auth, "http://localhost:9099");

export const AuthenticationModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  return (<Dialog open={true}>
    <Box m={3}>
      <Stack spacing={1}>
        <Typography>Faça seu cadastro:</Typography>
        <TextField label={"E-mail"} type={"email"} value={email}
          onChange={(event) => setEmail(event.target.value)}/>
        <TextField label={"Senha"} type={"password"}
          onChange={(event) => setPw(event.target.value)}/>
        <Button onClick={() => {
          createUserWithEmailAndPassword(auth, email, pw)
              .then((credentials) => {
                console.log(credentials);
              });
        }}>Cadastrar</Button>
      </Stack>
    </Box>
  </Dialog>);
};
