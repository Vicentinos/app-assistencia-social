/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    task(
      event: "getAuthUsers",
      arg: null,
      options?: Partial<Loggable & Timeoutable>
    ): Chainable<import("firebase-admin/auth").UserRecord[]>;

    getOobCodes(): Chainable<
      {
        email: string;
        oobCode: string;
        oobLink: string;
        requestType: string;
      }[]
    >;

    clearIndexedDB(): Promise<void>;
  }
}
