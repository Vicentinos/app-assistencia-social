import { SetAuthenticationFormState } from "./use-email-change-handler";
import { useCallback } from "react";
import { Props } from "../authentication-modal-presentation";

export const useFormSubmitHandler = (
  submitEmailLogin: Props["onSubmitEmailLogin"],
  email: string,
  setFormState: SetAuthenticationFormState
) =>
  useCallback(() => {
    setFormState((state) => ({ ...state, submitting: true }));
    submitEmailLogin(email).then(() => {
      setFormState((state) => ({
        ...state,
        submitting: false,
        submitted: true,
      }));
    });
  }, [submitEmailLogin, email]);
