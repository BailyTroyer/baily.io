import { JSXElementConstructor, ReactElement } from "react";

import { render as rtlRender } from "@testing-library/react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export type TestRenderOptions = {
  session?: Session;
};

const mockSession = {
  expires: "1",
  user: { email: "a", name: "Delta", image: "c" },
};

/**
 * Inject mocks + necessary boilerplate setup for tests.
 */
export const render = (
  children: ReactElement<any, string | JSXElementConstructor<any>>,
  options?: TestRenderOptions
) => {
  (useSession as jest.Mock).mockReturnValueOnce([
    options?.session || mockSession,
    false,
  ]);

  rtlRender(children);
};
