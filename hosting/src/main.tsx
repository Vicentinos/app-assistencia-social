import React from "react";
import { AuthenticationModal } from "./auth/container/authentication-modal-container";
import { SecureRoutes } from "./secure-routes/secure-routes";
import { SitewideProviders } from "./sitewide-providers";

export const Main: React.FC = () => {
  return (
    <SitewideProviders>
      <AuthenticationModal />
      <SecureRoutes />
    </SitewideProviders>
  );
};
