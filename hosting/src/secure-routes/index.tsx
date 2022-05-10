import { useSigninCheck } from "reactfire";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

import React, { useLayoutEffect, useState } from "react";
import { AccountMenu } from "./account-menu/container/account-menu-container";

/**
 * The Secure Routes component should be included high up in the application tree
 * as it will be used to display the proper route when the user **is authenticated**.
 *
 * @component
 */
export const SecureRoutes = () => {
  const { data: signInCheckResult } = useSigninCheck();
  const [appBarElement, setAppBarElement] = useState<null | HTMLElement>(null);
  const [appBarHeight, setAppBarHeight] = useState(0);
  useLayoutEffect(() => {
    setAppBarHeight(appBarElement?.clientHeight || 0);
  }, [appBarElement]);
  if (!signInCheckResult.signedIn) return null;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar ref={setAppBarElement} position={"static"}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Aplicativo Vicentino
          </Typography>
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Container
        style={{ marginTop: `calc(${appBarHeight}px + 2em)` }}
        maxWidth={"md"}
      >
        <Typography>
          Este é o primeiro acesso com o email {signInCheckResult.user.email},
          que ainda não está associado a nenhuma conferência.
        </Typography>
        <Typography>
          Solicite acesso à pessoa na sua conferência responsável pelo
          Aplicativo Vicentino.
        </Typography>
      </Container>
    </Box>
  );
};
