import React from "react";
import { useFirebaseInitJson } from "./firebase/useFirebaseInitJson";
import { FirebaseAppProvider } from "reactfire";
import { FirebaseSetup } from "./firebase/setup";

export const SitewideProviders = (props: { children: React.ReactNode }) => {
  const initJson = useFirebaseInitJson();
  if (!initJson) return null;
  return (
    initJson && (
      <FirebaseAppProvider suspense firebaseConfig={initJson}>
        <FirebaseSetup>{props.children}</FirebaseSetup>
      </FirebaseAppProvider>
    )
  );
};
