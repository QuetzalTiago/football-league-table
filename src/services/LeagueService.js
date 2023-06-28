/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 */
import { BASE_URL, ENDPOINTS } from "./routes";
import axios from "axios";
const { getAccessToken, getAllMatches, getVersion } = ENDPOINTS;

class LeagueService {
  constructor() {
    this.apiVersion = null;
    this.accessToken = null;
    this.matches = [];
  }

  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    this.matches = matches;
  }
  /**
   * Sets the api version.
   *
   * @param {Number} version current version of the api.
   */
  setApiVersion(version) {
    this.apiVersion = version;
  }
  /**
   * Sets the access token.
   *
   * @param {String} token token to access the api.
   */
  setAccessToken(token) {
    this.accessToken = token;
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches() {
    return this.matches;
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {
    const leaderboard = this.matches.reduce((board, match) => {
      const { homeTeam, awayTeam, homeTeamScore, awayTeamScore, matchPlayed } =
        match;
      if (matchPlayed) {
        // Initialize if teams not yet present in the leaderboard
        if (!board[homeTeam]) {
          board[homeTeam] = {
            teamName: homeTeam,
            matchesPlayed: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            points: 0,
            matches: {},
          };
        }
        if (!board[awayTeam]) {
          board[awayTeam] = {
            teamName: awayTeam,
            matchesPlayed: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            points: 0,
            matches: {},
          };
        }

        // Update the stats for teams
        board[homeTeam].matchesPlayed++;
        board[awayTeam].matchesPlayed++;
        board[homeTeam].goalsFor += homeTeamScore;
        board[awayTeam].goalsFor += awayTeamScore;
        board[homeTeam].goalsAgainst += awayTeamScore;
        board[awayTeam].goalsAgainst += homeTeamScore;

        // Update points
        if (homeTeamScore > awayTeamScore) {
          board[homeTeam].points += 3;
          board[homeTeam].matches[awayTeam] =
            (board[homeTeam].matches[awayTeam] || 0) + 3;
        } else if (homeTeamScore < awayTeamScore) {
          board[awayTeam].points += 3;
          board[awayTeam].matches[homeTeam] =
            (board[awayTeam].matches[homeTeam] || 0) + 3;
        } else {
          board[homeTeam].points += 1;
          board[awayTeam].points += 1;
          board[homeTeam].matches[awayTeam] =
            (board[homeTeam].matches[awayTeam] || 0) + 1;
          board[awayTeam].matches[homeTeam] =
            (board[awayTeam].matches[homeTeam] || 0) + 1;
        }
      }
      return board;
    }, {});

    const leaderboardArray = Object.values(leaderboard);

    leaderboardArray.sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points;

      const headToHeadA = a.matches[b.teamName] || 0;
      const headToHeadB = b.matches[a.teamName] || 0;

      if (headToHeadA !== headToHeadB) return headToHeadB - headToHeadA;

      const goalDifferenceA = a.goalsFor - a.goalsAgainst;
      const goalDifferenceB = b.goalsFor - b.goalsAgainst;

      if (goalDifferenceA !== goalDifferenceB)
        return goalDifferenceB - goalDifferenceA;

      if (a.goalsFor !== b.goalsFor) {
        return b.goalsFor - a.goalsFor;
      }

      return a.teamName.localeCompare(b.teamName);
    });

    return leaderboardArray.map(
      ({ teamName, matchesPlayed, goalsFor, goalsAgainst, points }) => ({
        teamName,
        matchesPlayed,
        goalsFor,
        goalsAgainst,
        points,
      })
    );
  }

  /**
   * Returns the current api version.
   *
   * @returns {Number} List of matches.
   */
  getApiVersion() {
    return this.apiVersion;
  }

  /**
   * Asynchronic function to fetch the data from the server.
   */

  async fetchData() {
    try {
      if (!this.apiVersion) {
        await this.fetchApiVersion();
      }

      if (!this.accessToken) {
        await this.fetchAccessToken();
      }

      const response = await axios.get(
        `${BASE_URL}/v${Math.ceil(this.apiVersion)}/${getAllMatches}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      const { matches } = await response.data;
      this.setMatches(matches);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  /**
   * Asynchronic function to fetch the api version from the server.
   */
  async fetchApiVersion() {
    try {
      const response = await axios.get(`${BASE_URL}/${getVersion}`);
      const { version } = await response.data;
      this.setApiVersion(version);
    } catch (error) {
      console.error("Error fetching API version:", error);
      throw error;
    }
  }

  /**
   * Asynchronic function to fetch the access token from the server.
   */
  async fetchAccessToken() {
    try {
      const response = await axios.get(
        `${BASE_URL}/v${Math.ceil(this.apiVersion)}/${getAccessToken}`
      );
      const { access_token } = await response.data;
      this.setAccessToken(access_token);
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  }
}

export default LeagueService;
