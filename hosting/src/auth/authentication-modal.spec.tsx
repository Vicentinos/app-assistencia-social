import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import {
  AuthenticationModal,
  Props as AuthModalProps,
} from "./authentication-modal";
import { MockedObject } from "ts-jest";

describe("AuthenticationModal component", () => {
  let props: MockedObject<AuthModalProps>;
  beforeEach(() => {
    props = {
      isLoggedIn: false,
      onSubmitEmailLogin: jest.fn(),
      onVerifyEmail: jest.fn(),
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
  it("should call the onSubmitEmailLogin method when user tries to log in while being registered", async () => {
    const user = userEvent.setup();
    props.onVerifyEmail.mockImplementation(async () => ({
      isRegistered: true,
    }));
    render(<AuthenticationModal {...props} />);
    const passwordInput = screen.getByLabelText("Senha");
    const emailInput = screen.getByLabelText("Email");
    const verifyEmailButton = screen.getByText("Continuar");
    const submitLoginButton = screen.getByText("Enviar");

    expect(emailInput).toBeVisible();
    expect(verifyEmailButton).toBeVisible();
    expect(passwordInput).not.toBeVisible();
    expect(submitLoginButton).not.toBeVisible();
    expect(verifyEmailButton).not.toHaveAttribute("aria-busy", true);

    await user.type(emailInput, "some-email@email.com");
    await user.click(verifyEmailButton);
    expect(verifyEmailButton).toHaveAttribute("aria-busy", true);
    expect(verifyEmailButton).toBeDisabled();
    expect(emailInput).toBeDisabled();
    await waitFor(() => {
      expect(passwordInput).toBeVisible();
      expect(submitLoginButton).toBeVisible();
      expect(submitLoginButton).not.toHaveAttribute("aria-busy", true);
      expect(verifyEmailButton).not.toBeVisible();
    });
    await user.type(passwordInput, "some-password");
    await user.click(submitLoginButton);
    expect(passwordInput).toBeDisabled();
    expect(submitLoginButton).toBeDisabled();
    expect(submitLoginButton).toHaveAttribute("aria-busy", true);
    expect(props.onSubmitEmailLogin).toHaveBeenCalledTimes(1);
    expect(props.onSubmitEmailLogin).toHaveBeenCalledWith(
      "some-email@email.com",
      "some-password"
    );
  });
});
