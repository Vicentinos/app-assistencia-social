import React, { FC } from "react";
import ReactDOM from "react-dom";
import { AuthenticationModal } from "./auth/AuthenticationModal";

const Main: FC = () => {
  return <AuthenticationModal />;
};

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
