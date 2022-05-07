import React from "react";
import { FirebaseAppProvider } from "reactfire";
import { FirebaseSetup } from "./firebase/setup";
import { AuthenticationModal } from "./auth/authentication-modal-container";
import { useFirebaseInitJson } from "./firebase/useFirebaseInitJson";

export const Main: React.FC = () => {
  const initJson = useFirebaseInitJson();
  return (
    <>
      {initJson && (
        <FirebaseAppProvider suspense firebaseConfig={initJson}>
          <FirebaseSetup>
            <AuthenticationModal />
          </FirebaseSetup>
        </FirebaseAppProvider>
      )}
    </>
  );
};
