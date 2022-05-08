import { AuthenticationModalPresentation } from "./authentication-modal-presentation";
import React from "react";
import { useAuth, useSigninCheck } from "reactfire";
import { useSubmitEmailLoginHandler } from "./hooks/use-submit-email-login-handler";
import { useSignInWithEmailLink } from "./hooks/use-sign-in-with-email-link";

export const AuthenticationModal = () => {
  const { data: signInCheckResult } = useSigninCheck();
  const auth = useAuth();
  const onSubmitEmailLogin: (email: string) => Promise<void> =
    useSubmitEmailLoginHandler(auth);
  useSignInWithEmailLink(auth);
  return (
    <AuthenticationModalPresentation
      isLoggedIn={signInCheckResult.signedIn}
      onSubmitEmailLogin={onSubmitEmailLogin}
    />
  );
};
