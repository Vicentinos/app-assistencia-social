import React, { PropsWithChildren } from "react";
import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

export const FirebaseSetup: React.FC<
  PropsWithChildren<Record<string, unknown>>
> = (props) => {
  const app = useFirebaseApp();
  const firestoreInstance = getFirestore(app);

  const auth = getAuth(app);
  if (process.env.NODE_ENV !== "production" && !auth.emulatorConfig) {
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
