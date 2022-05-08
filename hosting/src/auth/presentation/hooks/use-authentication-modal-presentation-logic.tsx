import { useAuthenticationFormState } from "./use-authentication-form-state";
import { useEmailValidation } from "./use-email-validation";
import { useEmailChangeHandler } from "./use-email-change-handler";
import { useFormSubmitHandler } from "./use-form-submit-handler";
import { Props } from "../authentication-modal-presentation";
import React from "react";

export const useAuthenticationModalPresentationLogic: (
  onSubmitEmailLogin: Props["onSubmitEmailLogin"]
) => {
  submitting: boolean;
  submitted: boolean;
  isEmailValid: boolean;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: () => void;
  email: string;
} = (onSubmitEmailLogin) => {
  const [{ email, submitted, submitting }, setFormState] =
    useAuthenticationFormState();
  const isEmailValid = useEmailValidation(email);
  const onEmailChange = useEmailChangeHandler(setFormState);
  const onClickSubmit = useFormSubmitHandler(
    onSubmitEmailLogin,
    email,
    setFormState
  );
  return {
    email,
    submitted,
    submitting,
    isEmailValid,
    onEmailChange,
    onClickSubmit,
  };
};
