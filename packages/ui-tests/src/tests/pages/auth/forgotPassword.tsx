import { vi } from "vitest";
import React, { type FC } from "react";
import type { ForgotPasswordPageProps } from "@refinedev/core";

import {
  fireEvent,
  mockAuthProvider,
  mockRouterProvider,
  render,
  TestWrapper,
  waitFor,
} from "@test";

export const pageForgotPasswordTests = (
  ForgotPasswordPage: FC<ForgotPasswordPageProps<any, any, any>>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Forgot Password Page", () => {
    it("should render card title", async () => {
      const { getByText } = render(<ForgotPasswordPage />, {
        wrapper: TestWrapper({}),
      });

      expect(getByText(/forgot your password?/i)).toBeInTheDocument();
    });

    it("should render email input", async () => {
      const { getByLabelText } = render(<ForgotPasswordPage />, {
        wrapper: TestWrapper({}),
      });

      expect(getByLabelText(/email/i)).toBeInTheDocument();
    });

    it("should login link", async () => {
      const { getByRole } = render(<ForgotPasswordPage />, {
        wrapper: TestWrapper({}),
      });

      expect(
        getByRole("link", {
          name: /sign in/i,
        }),
      ).toBeInTheDocument();
    });

    it("should not render login link when is false", async () => {
      const { queryByRole } = render(<ForgotPasswordPage loginLink={false} />, {
        wrapper: TestWrapper({}),
      });

      expect(
        queryByRole("link", {
          name: /sign in/i,
        }),
      ).not.toBeInTheDocument();
    });

    it("should render reset button", async () => {
      const { getByRole } = render(<ForgotPasswordPage />, {
        wrapper: TestWrapper({}),
      });

      expect(
        getByRole("button", {
          name: /send reset/i,
        }),
      ).toBeInTheDocument();
    });

    it("should render default <ThemedTitle> with icon", async () => {
      const { getByText, getByTestId } = render(<ForgotPasswordPage />, {
        wrapper: TestWrapper({}),
      });

      expect(getByText(/refine project/i)).toBeInTheDocument();
      expect(getByTestId("refine-logo")).toBeInTheDocument();
    });

    it("should render custom title", async () => {
      const { queryByText, queryByTestId } = render(
        <ForgotPasswordPage title="Custom Title" />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(queryByText(/custom title/i)).toBeInTheDocument();
      expect(queryByText(/refine project/i)).not.toBeInTheDocument();
      expect(queryByTestId("refine-logo")).not.toBeInTheDocument();
    });

    it("should not render title when is false", async () => {
      const { queryByText } = render(<ForgotPasswordPage title={false} />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByText(/refine project/i)).not.toBeInTheDocument();
    });

    it("should pass contentProps", async () => {
      const { getByTestId } = render(
        <ForgotPasswordPage contentProps={{ "data-testid": "test" }} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByTestId("test")).toBeInTheDocument();
    });

    it("should pass wrapperProps", async () => {
      const { getByTestId } = render(
        <ForgotPasswordPage wrapperProps={{ "data-testid": "test" }} />,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(getByTestId("test")).toBeInTheDocument();
    });

    it("should renderContent only", async () => {
      const { queryByText, queryByTestId, queryByRole, queryByLabelText } =
        render(
          <ForgotPasswordPage
            renderContent={() => <div data-testid="custom-content" />}
          />,
          {
            wrapper: TestWrapper({}),
          },
        );

      expect(queryByLabelText(/email/i)).not.toBeInTheDocument();
      expect(queryByText(/refine project/i)).not.toBeInTheDocument();
      expect(queryByTestId("refine-logo")).not.toBeInTheDocument();
      expect(
        queryByRole("button", {
          name: /reset/i,
        }),
      ).not.toBeInTheDocument();
      expect(queryByTestId("custom-content")).toBeInTheDocument();
    });

    it("should customizable with renderContent", async () => {
      const { queryByText, queryByTestId, queryByRole, queryByLabelText } =
        render(
          <ForgotPasswordPage
            renderContent={(content: any, title: any) => (
              <div>
                {title}
                <div data-testid="custom-content">
                  <div>Custom Content</div>
                </div>
                {content}
              </div>
            )}
          />,
          {
            wrapper: TestWrapper({}),
          },
        );

      expect(queryByText(/custom content/i)).toBeInTheDocument();
      expect(queryByTestId("custom-content")).toBeInTheDocument();
      expect(queryByLabelText(/email/i)).toBeInTheDocument();
      expect(queryByText(/refine project/i)).toBeInTheDocument();
      expect(queryByTestId("refine-logo")).toBeInTheDocument();
      expect(
        queryByRole("button", {
          name: /reset/i,
        }),
      ).toBeInTheDocument();
      expect(queryByTestId("custom-content")).toBeInTheDocument();
    });

    it("should run forgotPassword mutation when form is submitted", async () => {
      const forgotPasswordMock = vi.fn().mockResolvedValue({ success: true });

      const { getByLabelText, getByText } = render(<ForgotPasswordPage />, {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            forgotPassword: forgotPasswordMock,
          },
        }),
      });

      fireEvent.change(getByLabelText(/email/i), {
        target: { value: "demo@refine.dev" },
      });

      fireEvent.click(getByText(/send reset instructions/i));

      await waitFor(() => {
        expect(forgotPasswordMock).toHaveBeenCalledTimes(1);
      });

      expect(forgotPasswordMock).toHaveBeenCalledWith({
        email: "demo@refine.dev",
      });
    });

    it("should work with new router provider Link", async () => {
      vi.spyOn(console, "error").mockImplementation((message) => {
        console.warn(message);
      });

      const { getByText } = render(<ForgotPasswordPage />, {
        wrapper: TestWrapper({}),
      });

      const link = getByText(/sign in/i);

      expect(link).toBeInTheDocument();
      expect(link.getAttribute("href")).toBe("/login");
    });

    it("should should accept 'mutationVariables'", async () => {
      const forgotPasswordMock = vi.fn().mockResolvedValue({ success: true });

      const { getByRole, getByLabelText } = render(
        <ForgotPasswordPage
          mutationVariables={{
            foo: "bar",
            xyz: "abc",
          }}
        />,
        {
          wrapper: TestWrapper({
            authProvider: {
              ...mockAuthProvider,
              forgotPassword: forgotPasswordMock,
            },
          }),
        },
      );

      fireEvent.change(getByLabelText(/email/i), {
        target: { value: "demo@refine.dev" },
      });

      fireEvent.click(
        getByRole("button", {
          name: /reset/i,
        }),
      );

      await waitFor(() => {
        expect(forgotPasswordMock).toHaveBeenCalledWith({
          foo: "bar",
          xyz: "abc",
          email: "demo@refine.dev",
        });
      });
    });
  });
};
