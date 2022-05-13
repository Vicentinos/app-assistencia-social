import { ObservableStatus } from "reactfire";
import { User } from "firebase/auth";
import useSWR from "swr";

export const useIsAdmin = (user: ObservableStatus<User | null>): boolean => {
  const { data: idTokenResult } = useSWR(
    user.data ? `idTokenResult/${user.data.uid}` : null,
    () => user.data?.getIdTokenResult(true)
  );
  return Boolean(idTokenResult?.claims.admin);
};
