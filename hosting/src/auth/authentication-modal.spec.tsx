import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  it("should call the onSubmitEmailLogin method when user tries to log in", async () => {
    const user = userEvent.setup();
    render(<AuthenticationModal {...props} />);
    await user.type(screen.getByLabelText("Email"), "some-email@email.com");
    await user.type(screen.getByLabelText("Senha"), "some-password");
    await user.click(screen.getByText("Enviar"));
    expect(props.onSubmitEmailLogin).toHaveBeenCalledTimes(1);
    expect(props.onSubmitEmailLogin).toHaveBeenCalledWith(
      "some-email@email.com",
      "some-password"
    );
  });
});
