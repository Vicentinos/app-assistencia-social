import { AuthenticationModalPresentation } from "../presentation/authentication-modal-presentation";
import React from "react";
import { useAuthenticationModalContainerLogic } from "./hooks/use-authentication-modal-container-logic";

/**
 * The Authentication Modal should be included high up in the application tree
 * as it will be displayed as an overlay when the user is unauthenticated.
 *
 * @component
 */
export const AuthenticationModal = () => {
  const logic = useAuthenticationModalContainerLogic();
  return (
    <AuthenticationModalPresentation
      isLoggedIn={logic.signedIn}
      onSubmitEmailLogin={logic.onSubmitEmailLogin}
    />
  );
};
