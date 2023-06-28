import {
  createMatch,
  createLeaderboardItem,
} from "../../src/utils/testHelpers";

describe("Factories", () => {
  describe("createMatch", () => {
    // Given input parameters for a match
    // When the createMatch function is called with these parameters
    // Then it should return an object with the expected structure and properties
    test("should return an object with the correct structure", () => {
      const match = createMatch(
        "Team A",
        "Team B",
        3,
        1,
        true,
        1651744228685,
        "Stadium A"
      );
      expect(match).toEqual({
        homeTeam: "Team A",
        awayTeam: "Team B",
        homeTeamScore: 3,
        awayTeamScore: 1,
        matchPlayed: true,
        matchDate: 1651744228685,
        stadium: "Stadium A",
      });
    });
  });

  describe("createLeaderboardItem", () => {
    // Given input parameters for a leaderboard item
    // When the createLeaderboardItem function is called with these parameters
    // Then it should return an object with the expected structure and properties
    test("should return an object with the correct structure", () => {
      const leaderboardItem = createLeaderboardItem("Team A", 10, 30, 15, 30);
      expect(leaderboardItem).toEqual({
        teamName: "Team A",
        matchesPlayed: 10,
        goalsFor: 30,
        goalsAgainst: 15,
        points: 30,
      });
    });
  });
});
