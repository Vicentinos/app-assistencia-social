import React from "react";
import { Box, Dialog } from "@mui/material";

type Props = {
  dependencies: {
    authenticationService: {
      useLoginStatus: () => boolean;
    };
  };
};
export const AuthenticationModal: React.FC<Props> = (props) => {
  const loginStatus = props.dependencies.authenticationService.useLoginStatus();
  return (
    <Dialog open={loginStatus === false}>
      <Box role={"alertdialog"}></Box>
    </Dialog>
  );
};
