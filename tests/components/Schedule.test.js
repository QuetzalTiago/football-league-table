import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Schedule } from "../../src/components/Schedule";
import { createMatch } from "../../src/utils/testHelpers";
import "@testing-library/jest-dom";

// Setting up test data

const matchDate = 1651744228685;

const testData = [
  createMatch("Team A", "Team B", 3, 1, true, matchDate, "Stadium A"),
  createMatch("Team C", "Team D", 0, 0, false, matchDate, "Stadium B"),
];

jest.mock("../../src/utils/time", () => ({
  formatTimestamp: jest.fn(() => ({
    date: "testDate",
    time: "testTime",
  })),
}));

describe("Schedule", () => {
  test("renders without crashing", () => {
    render(<Schedule matches={testData} />);
  });

  // Given a set of match data
  // When the Schedule component is rendered with this data
  // Then the match details should be correctly displayed in the component
  test("displays correct match details", async () => {
    render(<Schedule matches={testData} />);

    // Check for home and away teams
    expect(screen.getByText("Team A")).toBeInTheDocument();
    expect(screen.getByText("Team B")).toBeInTheDocument();

    // Check for match score
    expect(screen.getByText("3 : 1")).toBeInTheDocument();

    // Check for stadium
    expect(screen.getByText("Stadium A")).toBeInTheDocument();

    // Check for date/time - formatted date/time depends on formatTimestamp function
    // Assuming it's 'DD.MM.YYYY' for date and 'HH:mm' for time
    const dates = await screen.findAllByText("testDate");

    dates.forEach((date) => {
      expect(date).not.toBeNull();
    });

    const times = await screen.findAllByText("testTime");
    times.forEach((time) => {
      expect(time).not.toBeNull();
    });
  });

  // Given a set of match data
  // When the Schedule component is rendered with this data
  // And some matches haven't been played yet
  // Then these matches should display "- : -" as their score
  test("displays correct details for upcoming matches", async () => {
    render(<Schedule matches={testData} />);

    // Check for home and away teams
    expect(screen.getByText("Team C")).toBeInTheDocument();
    expect(screen.getByText("Team D")).toBeInTheDocument();

    // Check for match score
    expect(screen.getByText("- : -")).toBeInTheDocument();

    // Check for stadium
    expect(screen.getByText("Stadium B")).toBeInTheDocument();
  });
});
