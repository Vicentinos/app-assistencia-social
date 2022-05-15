import React, { PropsWithChildren, useEffect } from "react";
import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

const appCheckToken = import.meta.env.VITE_APP_CHECK_TOKEN || "";
export const FirebaseSetup: React.FC<
  PropsWithChildren<Record<string, unknown>>
> = (props) => {
  const app = useFirebaseApp();
  useEffect(() => {
    if (app && import.meta.env.VITE_ENV !== "local") {
      initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(appCheckToken),
        isTokenAutoRefreshEnabled: true,
      });
    }
  }, [app]);
  const firestoreInstance = getFirestore(app);

  const auth = getAuth(app);
  if (import.meta.env.VITE_ENV === "local" && !auth.emulatorConfig) {
    connectFirestoreEmulator(firestoreInstance, "localhost", 8088);
    connectAuthEmulator(auth, "http://localhost:9099");
  }
  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>
        {props.children}
      </FirestoreProvider>
    </AuthProvider>
  );
};
