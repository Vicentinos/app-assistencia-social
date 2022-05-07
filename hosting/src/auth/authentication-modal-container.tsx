import { AuthenticationModalPresentation } from "./authentication-modal-presentation";
import React, { useCallback } from "react";
import { useAuth, useSigninCheck } from "reactfire";
import { sendSignInLinkToEmail } from "firebase/auth";

export const AuthenticationModal = () => {
  const { data: signInCheckResult } = useSigninCheck();
  const auth = useAuth();
  const onSubmitEmailLogin = useCallback(
    async (email: string) => {
      return sendSignInLinkToEmail(auth, email, {
        url: window.location.toString(),
        handleCodeInApp: true,
      });
    },
    [auth]
  );
  return (
    <AuthenticationModalPresentation
      isLoggedIn={signInCheckResult.signedIn}
      onSubmitEmailLogin={onSubmitEmailLogin}
    />
  );
};
