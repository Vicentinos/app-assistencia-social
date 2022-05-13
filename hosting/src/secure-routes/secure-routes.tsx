import { useSigninCheck, useUser } from "reactfire";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

import React from "react";
import { AccountMenu } from "./account-menu/container/account-menu-container";
import { UnauthorizedUserDirection } from "./unauthorized-user-direction";
import { useElementHeight } from "../shared/use-element-height";
import { useIsAdmin } from "./hooks/use-is-admin";

/**
 * The Secure Routes component should be included high up in the application tree
 * as it will be used to display the proper route when the user **is authenticated**.
 *
 * @component
 */
export const SecureRoutes = () => {
  const { data: signInCheckResult } = useSigninCheck();
  const user = useUser();
  const isAdmin = useIsAdmin(user);
  const { setElementRef: setAppBarRef, elementHeight: appBarHeight } =
    useElementHeight();
  if (!signInCheckResult.signedIn) return null;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar ref={setAppBarRef} position={"static"}>
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
        {isAdmin ? null : (
          <UnauthorizedUserDirection email={signInCheckResult.user.email} />
        )}
      </Container>
    </Box>
  );
};
