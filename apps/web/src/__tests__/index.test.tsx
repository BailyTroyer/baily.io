import { render, screen } from "@testing-library/react";

import Index from "../pages/index";

describe("Index", () => {
  it("renders a heading", () => {
    render(<Index />);

    expect(screen.getByText(/Web/)).toBeInTheDocument();
  });
});
