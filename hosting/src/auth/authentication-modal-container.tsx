import { AuthenticationModalPresentation } from "./authentication-modal-presentation";
import React, { useCallback, useEffect } from "react";
import { useAuth, useSigninCheck } from "reactfire";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";

const LOCAL_STORAGE_KEY__LOGIN_EMAIL = "login-email";
export const AuthenticationModal = () => {
  const { data: signInCheckResult } = useSigninCheck();
  const auth = useAuth();
  const onSubmitEmailLogin = useCallback(
    async (email: string) => {
      return sendSignInLinkToEmail(auth, email, {
        url: window.location.toString(),
        handleCodeInApp: true,
      }).then(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY__LOGIN_EMAIL, email);
      });
    },
    [auth]
  );
  useEffect(() => {
    const loginEmail = localStorage.getItem(LOCAL_STORAGE_KEY__LOGIN_EMAIL);
    const emailLink = window.location.toString();
    if (loginEmail && isSignInWithEmailLink(auth, emailLink)) {
      const url = new URL(window.location.toString());
      url.searchParams.delete("mode");
      url.searchParams.delete("oobCode");
      url.searchParams.delete("apiKey");
      window.history.replaceState(undefined, "", url);
      signInWithEmailLink(auth, loginEmail, emailLink).then().catch();
    }
  }, []);
  return (
    <AuthenticationModalPresentation
      isLoggedIn={signInCheckResult.signedIn}
      onSubmitEmailLogin={onSubmitEmailLogin}
    />
  );
};
