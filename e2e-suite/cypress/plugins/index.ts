import "dotenv/config";
import { getAuth, UserRecord } from "firebase-admin/auth";
import { applicationDefault, initializeApp } from "firebase-admin/app";

initializeApp({
  credential: applicationDefault(),
});
const pluginConfig: Cypress.PluginConfig = (on) => {
  on("task", {
    getAuthUsers: async (): Promise<UserRecord[]> => {
      const result = await getAuth().getUsers([]);
      return result.users;
    },
  });
};
export default pluginConfig;
