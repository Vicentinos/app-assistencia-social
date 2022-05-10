import React, { PropsWithChildren } from "react";
import { AuthProvider, DatabaseProvider, useFirebaseApp } from "reactfire";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { connectAuthEmulator, getAuth } from "firebase/auth";

export const FirebaseSetup: React.FC<
  PropsWithChildren<Record<string, unknown>>
> = (props) => {
  const app = useFirebaseApp();
  const database = getDatabase(app);
  const auth = getAuth(app);
  if (process.env.NODE_ENV !== "production" && !auth.emulatorConfig) {
    connectDatabaseEmulator(database, "localhost", 9000);
    connectAuthEmulator(auth, "http://localhost:9099");
  }
  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={database}>{props.children}</DatabaseProvider>
    </AuthProvider>
  );
};
