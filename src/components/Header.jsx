import React from "react";

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark custom-nav">
      <div className="nav-logo">
        <a className="navbar-brand" href="/">
          <img src="/images/logo.svg" alt="logo" width="110px" />
        </a>
      </div>
      <div className="nav-links">
        <ul className="navbar-nav ml-auto d-flex flex-row flex-nowrap">
          <li className="nav-item">
            <a className="nav-link me-2" href="/schedule">
              <img
                src="/images/schedule.png"
                alt="Schedule"
                height="25px"
                className="me-2 mb-1"
              />
              <span className="d-inline-block text-white">Schedule</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link ms-2" href="/leaderboard">
              <img
                src="/images/leaderboard.png"
                alt="Leaderboard"
                height="25px"
                className="me-2 mb-1"
              />
              <span className="d-inline-block text-white">Leaderboard</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
