import { useSigninCheck, useUser } from "reactfire";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

import React from "react";
import { AccountMenu } from "./account-menu/container/account-menu-container";
import { UnauthorizedUserDirection } from "./unauthorized-user-direction";
import { useIsAdmin } from "./hooks/use-is-admin";
import { Outlet } from "react-router-dom";

export const AuthenticatedLayout = () => {
  const { data: signInCheckResult } = useSigninCheck();
  const user = useUser();
  const isAdmin = useIsAdmin(user);

  if (!signInCheckResult.signedIn) return null;
  return (
    <>
      <AppBar position={"static"}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Aplicativo Vicentino
          </Typography>
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Container maxWidth={"lg"} sx={{ py: 2 }}>
        {isAdmin ? (
          <Outlet />
        ) : (
          <UnauthorizedUserDirection email={signInCheckResult.user.email} />
        )}
      </Container>
    </>
  );
};
