export const createMatch = (
  homeTeam,
  awayTeam,
  homeTeamScore,
  awayTeamScore,
  matchPlayed = true,
  matchDate = Date.now(),
  stadium = "Maracanã"
) => ({
  matchDate,
  stadium,
  homeTeam,
  awayTeam,
  matchPlayed,
  homeTeamScore,
  awayTeamScore,
});

export const createLeaderboardItem = (
  teamName,
  matchesPlayed,
  goalsFor,
  goalsAgainst,
  points
) => ({
  teamName,
  matchesPlayed,
  goalsFor,
  goalsAgainst,
  points,
});
