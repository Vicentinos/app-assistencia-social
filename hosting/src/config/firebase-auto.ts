import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { useState } from "react";
import { useFetch } from "use-http";

export const useFirebaseInit = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  if (getApps().length === 0) {
    const { data } = useFetch<FirebaseOptions>(
      "/__/firebase/init.json",
      {},
      []
    );
    if (data) {
      initializeApp(data);
      setIsInitialized(true);
    }
  }
  return isInitialized;
};
