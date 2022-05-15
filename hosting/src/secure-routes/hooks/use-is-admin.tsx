import { ObservableStatus } from "reactfire";
import { User } from "firebase/auth";
import useSWR from "swr";

export const useIsAdmin = (user: ObservableStatus<User | null>): boolean => {
  const { data: idTokenResult } = useSWR(
    user.data ? `idTokenResult/${user.data.uid}` : null,
    () =>
      user.data
        ?.getIdTokenResult(true)
        .finally(() => console.log("refetched id token"))
  );
  return Boolean(idTokenResult?.claims.admin);
};
