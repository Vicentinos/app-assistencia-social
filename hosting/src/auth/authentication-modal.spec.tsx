import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import {
  AuthenticationModal,
  Props as AuthModalProps,
} from "./authentication-modal";

describe("AuthenticationModal component", () => {
  let props: AuthModalProps;
  beforeEach(() => {
    props = {
      isLoggedIn: false,
      onSubmitEmailLogin: jest.fn(),
    };
  });
  it("should not display anything when user is logged-in", () => {
    props.isLoggedIn = true;
    render(<AuthenticationModal {...props} />);
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });
  it("should display an alertdialog when user is NOT logged-in", () => {
    render(<AuthenticationModal {...props} />);
    expect(screen.queryByRole("alertdialog")).toBeInTheDocument();
  });
});
