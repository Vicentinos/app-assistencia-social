import React from "react";
import { useFirebaseInitJson } from "./firebase/useFirebaseInitJson";
import { FirebaseAppProvider } from "reactfire";
import { FirebaseSetup } from "./firebase/setup";
import { BrowserRouter } from "react-router-dom";

/**
 * The Sitewide Providers should be the topmost component as it is
 * the one responsible for providing all the "global" `React.Context`s
 *
 */
export const SitewideProviders: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const initJson = useFirebaseInitJson();
  if (!initJson) return null;
  return (
    initJson && (
      <FirebaseAppProvider suspense firebaseConfig={initJson}>
        <BrowserRouter>
          <FirebaseSetup>{props.children}</FirebaseSetup>
        </BrowserRouter>
      </FirebaseAppProvider>
    )
  );
};
