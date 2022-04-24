import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
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
  it("should login using email only", async () => {
    const user = userEvent.setup();
    props.onSubmitEmailLogin.mockResolvedValue(/* void */);

    render(<AuthenticationModal {...props} />);
    const emailInput = screen.getByLabelText("Email");
    const submitLoginButton = screen.getByText(
      "Enviar link mágico para o meu email"
    );

    expect(
      screen.getByText("Entre utilizando seu email abaixo:")
    ).toBeVisible();
    expect(emailInput).toBeVisible();
    expect(
      screen.getByText(
        "Nós enviaremos um link mágico para o seu email. Clique no link para entrar automaticamente!"
      )
    ).toBeVisible();
    expect(submitLoginButton).not.toBeVisible(); // submit button only becomes visible once the user inputs a valid email

    await user.type(emailInput, "some-email@email");
    expect(submitLoginButton).not.toBeVisible();
    await user.type(emailInput, ".com");
    expect(submitLoginButton).toBeVisible();
    expect(submitLoginButton).not.toHaveAttribute("aria-busy", "true");

    await user.click(submitLoginButton);
    expect(submitLoginButton).toHaveAttribute("aria-busy", "true");
    expect(submitLoginButton).toBeDisabled();
    expect(emailInput).toBeDisabled();

    expect(props.onSubmitEmailLogin).toHaveBeenCalledTimes(1);
    expect(props.onSubmitEmailLogin).toHaveBeenCalledWith(
      "some-email@email.com"
    );
  });
});
