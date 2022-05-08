import {
  Auth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useEffect } from "react";
import { LOCAL_STORAGE_KEY__LOGIN_EMAIL } from "./use-submit-email-login-handler";

export const useSignInWithEmailLink = (auth: Auth) => {
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
};
