import React, { FC } from "react";
import { AuthenticationModal } from "./auth/authentication-modal";
import { createRoot } from "react-dom/client";

const Main: FC = () => {
  return (
    <>
      <AuthenticationModal
        isLoggedIn={false}
        onSubmitEmailLogin={(email, password) => console.log(email, password)}
        onVerifyEmail={() => ({ isRegistered: true })}
      />
    </>
  );
};
const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
