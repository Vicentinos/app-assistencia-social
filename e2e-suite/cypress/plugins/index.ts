import "dotenv/config";
import { getAuth } from "firebase-admin/auth";
import { applicationDefault, initializeApp } from "firebase-admin/app";

initializeApp({
  credential: applicationDefault(),
  projectId: "app-assistencia-social-dev",
});
const pluginConfig: Cypress.PluginConfig = (on) => {
  on("task", {
    makeUserAdmin: async (email: string): Promise<null> => {
      const auth = getAuth();
      const user = await auth.getUserByEmail(email);
      await auth.setCustomUserClaims(user.uid, { admin: true });
      return null;
    },
  });
};
export default pluginConfig;
