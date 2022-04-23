import React, { Suspense } from "react";
import { Dialog } from "@mui/material";

export type Props = {
  isLoggedIn: boolean;
};
const LazyAuthBox = React.lazy(() => import("./auth-box"));
export const AuthenticationModal: React.FC<Props> = (props) => {
  return (
    <Dialog open={!props.isLoggedIn}>
      <Suspense>
        <LazyAuthBox />
      </Suspense>
    </Dialog>
  );
};
