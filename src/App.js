// React
import React, { useEffect, useState } from "react";

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Services
import LeagueService from "./services/LeagueService";

// Components
import { Schedule } from "./components/Schedule";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Leaderboard } from "./components/Leaderboard";
import { NotFound } from "./components/NotFound";

function App() {
  const [leagueService, setLeagueService] = useState(null);

  useEffect(() => {
    const initLeagueService = async () => {
      const service = new LeagueService();
      await service.fetchData();
      setLeagueService(service);
    };

    initLeagueService();
  }, []);

  return (
    <div id="bootstrap-overrides">
      <Router>
        <div className="app-container">
          <Header />
          <div className="content-container">
            <Switch>
              <Route exact path={["/", "/Schedule"]}>
                {leagueService && (
                  <Schedule matches={leagueService.getMatches()} />
                )}
              </Route>
              <Route exact path="/leaderboard">
                {leagueService && (
                  <Leaderboard board={leagueService.getLeaderboard()} />
                )}
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
          {leagueService && <Footer version={leagueService.getApiVersion()} />}
        </div>
      </Router>
    </div>
  );
}

export default App;
