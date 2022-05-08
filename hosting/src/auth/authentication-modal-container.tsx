import { AuthenticationModalPresentation } from "./authentication-modal-presentation";
import React from "react";
import { useAuthenticationModalLogic } from "./hooks/use-authentication-modal-logic";

export const AuthenticationModal = () => {
  const logic = useAuthenticationModalLogic();
  return (
    <AuthenticationModalPresentation
      isLoggedIn={logic.signedIn}
      onSubmitEmailLogin={logic.onSubmitEmailLogin}
    />
  );
};
