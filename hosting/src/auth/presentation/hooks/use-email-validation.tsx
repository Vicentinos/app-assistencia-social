import { useMemo } from "react";

export const useEmailValidation = (email: string) =>
  useMemo(() => {
    const emailRegex =
      // eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }, [email]);
