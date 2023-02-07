import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "./LoginForm";

describe("Test Login Page", () => {
  it("should have username field and password field as well as login submit button", () => {
    render(<LoginForm />);

    const usernameField = screen.getByPlaceholderText(/username/i);
    const passwordField = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByText(/login/i);

    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should allow user to submit their credentials", () => {
    const submit = jest.fn();
    render(<LoginForm login={submit} />);

    const usernameField = screen.getByPlaceholderText(/username/i);
    const passwordField = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByText(/login/i);

    userEvent.type(usernameField, "testuser");
    userEvent.type(passwordField, "testsecure");
    userEvent.click(submitButton);

    expect(submit).toHaveBeenCalledWith({
      username: "testuser",
      password: "testsecure",
    });
  });
});
