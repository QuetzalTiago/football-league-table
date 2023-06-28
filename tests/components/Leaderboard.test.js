import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Leaderboard } from "../../src/components/Leaderboard";
import "@testing-library/jest-dom";

const testBoard = [
  {
    teamName: "Team A",
    matchesPlayed: 25,
    goalsFor: 15,
    goalsAgainst: 10,
    points: 20,
  },
  {
    teamName: "Team B",
    matchesPlayed: 9,
    goalsFor: 12,
    goalsAgainst: 8,
    points: 19,
  },
];

describe("Leaderboard", () => {
  test("renders without crashing", () => {
    render(<Leaderboard board={testBoard} />);
  });

  // Given a set of leaderboard data
  // When the Leaderboard component is rendered with this data
  // Then the leaderboard details should be correctly displayed in the component
  test("displays correct leaderboard details", () => {
    render(<Leaderboard board={testBoard} />);

    // Check for team names
    expect(screen.getByText("Team A")).toBeInTheDocument();
    expect(screen.getByText("Team B")).toBeInTheDocument();

    // Check for matches played
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();

    // Check for goals for
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();

    // Check for goals against
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();

    // Check for points
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("19")).toBeInTheDocument();
  });
});
