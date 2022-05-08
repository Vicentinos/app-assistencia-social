import { useSigninCheck } from "reactfire";
import { Box, Typography } from "@mui/material";
import React from "react";

export const SecureRoutes = () => {
  const { data: signInCheckResult } = useSigninCheck();
  if (!signInCheckResult.signedIn) return null;
  return (
    <Box>
      <Typography>
        Este é o primeiro acesso com o email {signInCheckResult.user.email}, que
        ainda não está associado a nenhuma conferência.
      </Typography>
      <Typography>
        Solicite acesso à pessoa na sua conferência responsável pelo Aplicativo
        Vicentino.
      </Typography>
    </Box>
  );
};
