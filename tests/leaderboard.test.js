/**
 *
 *  THIS IS A TESTING FILE. YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO TEST YOUR WORK.
 *  PLEASE DON´T CHANGE THE INTERFACE OF leagueService.js METHODS
 *
 */
import LeagueService from "../src/services/LeagueService";
import { createLeaderboardItem, createMatch } from "../src/utils/testHelpers";

describe("laderboard", () => {
  let leagueService;

  beforeEach(() => {
    leagueService = new LeagueService();
  });

  // Given that no matches have been played
  // When I view the leaderboard
  // Then the leaderboard should be empty
  test("No matches played", () => {
    // No matches added
    const leaderboard = leagueService.getLeaderboard();

    expect(leaderboard).toEqual([]);
  });

  // Given that matches have been played but no goals have been scored
  // When I view the leaderboard
  // Then the teams should be sorted alphabetically and have equal points
  test("Matches played but no goals", () => {
    leagueService.setMatches([
      createMatch("Brazil", "Argentina", 0, 0),
      createMatch("Brazil", "Uruguay", 0, 0),
      createMatch("Argentina", "Uruguay", 0, 0),
    ]);

    const leaderboard = leagueService.getLeaderboard();

    expect(leaderboard).toEqual([
      createLeaderboardItem("Argentina", 2, 0, 0, 2),
      createLeaderboardItem("Brazil", 2, 0, 0, 2),
      createLeaderboardItem("Uruguay", 2, 0, 0, 2),
    ]);
  });

  // Given that teams have the same number of points and goals
  // When I view the leaderboard
  // Then the teams should be sorted alphabetically
  test("Same number of points and goals", () => {
    leagueService.setMatches([
      createMatch("Brazil", "Argentina", 1, 1),
      createMatch("Brazil", "Uruguay", 1, 1),
      createMatch("Argentina", "Uruguay", 1, 1),
    ]);

    const leaderboard = leagueService.getLeaderboard();

    expect(leaderboard).toEqual([
      createLeaderboardItem("Argentina", 2, 2, 2, 2),
      createLeaderboardItem("Brazil", 2, 2, 2, 2),
      createLeaderboardItem("Uruguay", 2, 2, 2, 2),
    ]);
  });

  // Given that two teams have the same overall points
  // And one team has a better head-to-head record
  // When I view the leaderboard
  // Then the team with the better head-to-head record should be higher in the leaderboard
  test("Head-to-head tiebreaker", () => {
    leagueService.setMatches([
      createMatch("Brazil", "Argentina", 2, 1),
      createMatch("Brazil", "Uruguay", 0, 1),
      createMatch("Argentina", "Uruguay", 2, 0),
      createMatch("Argentina", "Brazil", 1, 2),
      createMatch("Uruguay", "Brazil", 1, 0),
      createMatch("Uruguay", "Argentina", 0, 2),
    ]);

    const leaderboard = leagueService.getLeaderboard();

    expect(leaderboard).toEqual([
      createLeaderboardItem("Brazil", 4, 4, 4, 6),
      createLeaderboardItem("Argentina", 4, 6, 4, 6),
      createLeaderboardItem("Uruguay", 4, 2, 4, 6),
    ]);
  });
});
