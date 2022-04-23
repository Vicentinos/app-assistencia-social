import { getAuth } from "firebase/auth";
import React, { FC } from "react";
import ReactDOM from "react-dom";
import { AuthenticationModal } from "./auth/authentication-modal";
import { useFirebaseInit } from "./config/firebase-auto";

const Main: FC = () => {
  const firebaseInitialized = useFirebaseInit();
  return (
    <>
      {firebaseInitialized && (
        <AuthenticationModal isLoggedIn={!!getAuth().currentUser} />
      )}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
