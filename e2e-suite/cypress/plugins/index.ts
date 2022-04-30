/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.ts can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
import "dotenv/config";
import { getAuth } from "firebase-admin/auth";
import { applicationDefault, initializeApp } from "firebase-admin/app";

initializeApp({
  credential: applicationDefault(),
});
const pluginConfig: Cypress.PluginConfig = (on) => {
  on("task", {
    getUserCount: async (): Promise<number> => {
      const result = await getAuth().getUsers([]);
      return result.users.length;
    },
  });
};
export default pluginConfig;
