import React, { FC } from "react";
import ReactDOM from "react-dom";
import { AuthenticationModal } from "./auth/authentication-modal";

const Main: FC = () => {
  return (
    <>
      <AuthenticationModal
        isLoggedIn={false}
        onSubmitEmailLogin={(email: string, password: string) => {
          console.log(email, password);
        }}
      />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
