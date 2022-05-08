import React from "react";
import { FirebaseAppProvider } from "reactfire";
import { FirebaseSetup } from "./firebase/setup";
import { AuthenticationModal } from "./auth/container/authentication-modal-container";
import { useFirebaseInitJson } from "./firebase/useFirebaseInitJson";
import { SecureRoutes } from "./secure-routes";

export const Main: React.FC = () => {
  const initJson = useFirebaseInitJson();
  return (
    <>
      {initJson && (
        <FirebaseAppProvider suspense firebaseConfig={initJson}>
          <FirebaseSetup>
            <AuthenticationModal />
            <SecureRoutes />
          </FirebaseSetup>
        </FirebaseAppProvider>
      )}
    </>
  );
};
