/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    task(
      event: "getAuthUsers",
      arg: null,
      options?: Partial<Loggable & Timeoutable>
    ): Chainable<import("firebase-admin/auth").UserRecord[]>;
  }
}
