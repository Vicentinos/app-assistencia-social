import { useAuth } from "reactfire";
import { useCallback } from "react";
import { signOut } from "firebase/auth";

export const useSignOutHandler = () => {
  const auth = useAuth();
  return useCallback(() => {
    return signOut(auth);
  }, [auth]);
};
