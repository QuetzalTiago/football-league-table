import React from "react";
import { render, screen } from "@testing-library/react";
import { NotFound } from "../../src/components/NotFound";
import "@testing-library/jest-dom";

describe("NotFound", () => {
  test("renders without crashing", () => {
    render(<NotFound />);
  });

  // When the NotFound component is rendered
  // Then the 404 image should be correctly displayed
  test("displays 404 image", () => {
    render(<NotFound />);
    // Check for 404 image
    expect(screen.getByAltText("Page not found")).toBeInTheDocument();
  });
});
