import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { AuthenticationModal } from "./authentication-modal";

describe("AuthenticationModal component", () => {
  it("should not display anything when user is logged-in", () => {
    const authenticationService = {
      useLoginStatus: () => true,
    };
    render(
      <AuthenticationModal
        dependencies={{
          authenticationService,
        }}
      />
    );
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });
  it("should display an alertdialog when user is NOT logged-in", () => {
    const authenticationService = {
      useLoginStatus: () => false,
    };
    render(
      <AuthenticationModal
        dependencies={{
          authenticationService,
        }}
      />
    );
    expect(screen.queryByRole("alertdialog")).toBeInTheDocument();
  });
});
