import React from "react";
import { AuthenticationModal } from "./auth/container/authentication-modal-container";
import { SitewideProviders } from "./sitewide-providers";
import { MainAppRouter } from "./secure-routes/router";

export const Main: React.FC = () => {
  return (
    <SitewideProviders>
      <AuthenticationModal />
      <MainAppRouter />
    </SitewideProviders>
  );
};
