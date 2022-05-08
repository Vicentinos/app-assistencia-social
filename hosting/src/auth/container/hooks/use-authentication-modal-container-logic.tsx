import { useAuth, useSigninCheck } from "reactfire";
import { useSubmitEmailLoginHandler } from "./use-submit-email-login-handler";
import { useSignInWithEmailLink } from "./use-sign-in-with-email-link";

export const useAuthenticationModalContainerLogic: () => {
  signedIn: boolean;
  onSubmitEmailLogin: (email: string) => Promise<void>;
} = () => {
  const {
    data: { signedIn },
  } = useSigninCheck();
  const auth = useAuth();
  const onSubmitEmailLogin = useSubmitEmailLoginHandler(auth);
  useSignInWithEmailLink(auth);
  return { signedIn, onSubmitEmailLogin };
};
