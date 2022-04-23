import React from "react";
import { EmailAuthProvider, getAuth } from "firebase/auth";
import { Box } from "@mui/material";
import { StyledFirebaseAuth } from "react-firebaseui";

export const AuthBox: React.FC = () => {
  return (
    <Box role={"alertdialog"} id={"firebase-login-container"}>
      <StyledFirebaseAuth
        uiConfig={{
          signInOptions: [EmailAuthProvider.PROVIDER_ID],
        }}
        firebaseAuth={getAuth()}
      />
    </Box>
  );
};
export default AuthBox;
