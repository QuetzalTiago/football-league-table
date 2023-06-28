import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../src/components/Header";
import "@testing-library/jest-dom";

describe("Header", () => {
  test("renders without crashing", () => {
    render(<Header />);
  });

  // Scenario: Verifying correct rendering of logo and navigation links
  // Given no props
  // When the Header component is rendered
  // Then the logo and navigation links should be correctly displayed
  test("displays logo and navigation links", () => {
    render(<Header />);

    // Check for logo
    expect(screen.getByAltText("logo")).toBeInTheDocument();

    // Check for Schedule navigation link
    const scheduleLink = screen.getByText("Schedule");
    expect(scheduleLink).toBeInTheDocument();

    // Check for Leaderboard navigation link
    const leaderboardLink = screen.getByText("Leaderboard");
    expect(leaderboardLink).toBeInTheDocument();
  });
});
