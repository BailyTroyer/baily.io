import { screen } from "@testing-library/react";

import { render } from "../__utils__/render";
import Index from "../pages/index";

describe("Index", () => {
  it("renders a heading", () => {
    render(<Index />);

    expect(screen.getByText(/Web/)).toBeInTheDocument();
  });
});
