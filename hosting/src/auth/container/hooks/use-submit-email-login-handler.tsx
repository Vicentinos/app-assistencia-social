import { Auth, sendSignInLinkToEmail } from "firebase/auth";
import { useCallback } from "react";

export const LOCAL_STORAGE_KEY__LOGIN_EMAIL = "login-email";
export const useSubmitEmailLoginHandler = (auth: Auth) =>
  useCallback(
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
