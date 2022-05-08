import { useState } from "react";

export type AuthenticationFormState = {
  email: string;
  submitting: boolean;
  submitted: boolean;
};
export const useAuthenticationFormState = () =>
  useState<AuthenticationFormState>({
    email: "",
    submitting: false,
    submitted: false,
  });
