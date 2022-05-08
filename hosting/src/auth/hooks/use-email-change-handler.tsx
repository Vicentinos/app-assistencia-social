import React, { Dispatch, SetStateAction, useCallback } from "react";
import { AuthenticationFormState } from "./use-authentication-form-state";

export type SetAuthenticationFormState = Dispatch<
  SetStateAction<AuthenticationFormState>
>;
export const useEmailChangeHandler = (
  setFormState: SetAuthenticationFormState
) =>
  useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((state) => ({
      ...state,
      email: event.target.value,
    }));
  }, []);
