import React from "react";

// Utils
import { getFlagIcon } from "../utils/icons";

const tableHeaders = [
  {
    child: "Team Name",
    classes: "col-sm-4 text-start custom-header",
  },
  {
    child: "MP",
    classes: "col-sm-1 text-center custom-header",
  },
  {
    child: "GF",
    classes: "col-sm-1 text-center d-none d-sm-table-cell custom-header",
  },
  {
    child: "GA",
    classes: "col-sm-1 text-center d-none d-sm-table-cell custom-header",
  },
  {
    child: "GD",
    classes: "col-sm-1 text-center d-sm-none custom-header",
  },
  {
    child: "Points",
    classes: "col-sm-1 text-center custom-header",
  },
];

export const Leaderboard = ({ board }) => {
  return (
    <div>
      <h2 className="page-title">League Standings</h2>
      <div className="table-responsive-sm">
        <table className="table custom-table">
          <thead className="table-header">
            <tr>
              {tableHeaders.map(({ classes, child }, index) => (
                <td className={classes} key={index}>
                  <strong>{child}</strong>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {board &&
              board.map(
                (
                  { teamName, matchesPlayed, goalsFor, goalsAgainst, points },
                  index
                ) => {
                  const goalDifference = goalsFor - goalsAgainst;

                  return (
                    <tr key={index} className="table-row">
                      <td className="text-start align-middle">
                        <div className="d-flex justify-content-start align-items-center">
                          <img
                            className="me-2"
                            src={getFlagIcon(teamName)}
                            width={53}
                            height={37}
                            alt={`${teamName} flag`}
                          />
                          <div>
                            <strong>{teamName}</strong>
                          </div>
                        </div>
                      </td>
                      <td className="text-center align-middle">
                        {matchesPlayed}
                      </td>
                      <td className="text-center d-none d-sm-table-cell align-middle">
                        {goalsFor}
                      </td>
                      <td className="text-center d-none d-sm-table-cell align-middle">
                        {goalsAgainst}
                      </td>
                      <td className="text-center d-sm-none align-middle">
                        {goalDifference}
                      </td>
                      <td className="text-center text-primary align-middle">
                        <strong>{points}</strong>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
