import React from "react";

// Utils
import { formatTimestamp } from "../utils/time";
import { getFlagIcon } from "../utils/icons";

const tableHeaders = [
  {
    child: "Date / Time",
    classes:
      "col-sm-1 col-1-5 d-none d-sm-table-cell custom-header date-time-header text-end",
  },
  {
    child: "Stadium",
    classes: "col-sm-4 d-none d-lg-table-cell custom-header",
  },
  {
    child: "Home Team",
    classes: "col-sm-2 text-end custom-header",
  },
  {
    child: "",
    classes: "col-sm-1 custom-header",
  },
  {
    child: "Away Team",
    classes: "col-sm-2 custom-header",
  },
];

export const Schedule = ({ matches }) => {
  return (
    <div>
      <h2 className="page-title">League Schedule</h2>
      <div className="table-responsive-sm">
        <table className="table custom-table">
          <thead className="table-secondary custom-headings">
            <tr className="table-header">
              {tableHeaders.map(({ classes, child }, index) => (
                <th className={classes} key={index}>
                  <span>{child}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matches &&
              matches.map(
                (
                  {
                    matchDate,
                    stadium,
                    homeTeam,
                    awayTeam,
                    homeTeamScore,
                    awayTeamScore,
                    matchPlayed,
                  },
                  index
                ) => {
                  const { date, time } = formatTimestamp(matchDate);

                  return (
                    <tr
                      key={index}
                      className={`table-row ${
                        index % 2 === 0 ? "" : " table-even-row"
                      }`}
                    >
                      <td className="d-none d-sm-table-cell d-lg-table-cell text-end">
                        <p>
                          <span>{date}</span>
                          <br />
                          <span>{time}</span>
                        </p>
                      </td>
                      <td className="d-none d-lg-table-cell align-middle">
                        {stadium}
                      </td>
                      <td className="text-end align-middle">
                        <div className="d-flex justify-content-end align-items-center">
                          <div className="me-2">
                            <strong>{homeTeam}</strong>
                          </div>
                          <img
                            src={getFlagIcon(homeTeam)}
                            width={53}
                            height={37}
                            alt={`${homeTeam} flag`}
                          />
                        </div>
                      </td>
                      <td className="text-center align-middle">
                        <strong>
                          {matchPlayed
                            ? `${homeTeamScore} : ${awayTeamScore}`
                            : "- : -"}
                        </strong>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <img
                            src={getFlagIcon(awayTeam)}
                            width={53}
                            height={37}
                            alt={`${awayTeam} flag`}
                          />
                          <div className="ms-2">
                            <strong>{awayTeam}</strong>
                          </div>
                        </div>
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
