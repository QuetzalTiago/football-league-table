import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../src/components/Footer";
import "@testing-library/jest-dom";

describe("Footer", () => {
  test("renders without crashing", () => {
    render(<Footer version="1.0" />);
  });

  // Given a version prop
  // When the Footer component is rendered
  // Then the version should be correctly displayed
  test("displays API version", () => {
    const testVersion = "1.0";
    render(<Footer version={testVersion} />);

    // Check for API version
    const versionElement = screen.getByText(`API Version: ${testVersion}`);
    expect(versionElement).toBeInTheDocument();
  });
});
