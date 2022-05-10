import React from "react";
import { AccountMenuPresentation } from "../presentation/account-menu-presentation";
import { useSignOutHandler } from "./hooks/use-sign-out-handler";

export const AccountMenu: React.FC = () => {
  const signOutHandler = useSignOutHandler();
  return <AccountMenuPresentation onSignOut={signOutHandler} />;
};
