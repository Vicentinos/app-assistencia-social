import React, { FC } from "react";
import { AuthenticationModal } from "./auth/authentication-modal";
import { createRoot } from "react-dom/client";

const Main: FC = () => {
  return (
    <>
      <AuthenticationModal
        isLoggedIn={false}
        onSubmitEmailLogin={async (email) => console.log(email)}
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
