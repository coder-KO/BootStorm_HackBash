import { React, Suspense, useState } from "react";
import { Switch, Route } from "react-router-dom";

import routes from "./config";
import GlobalStyles from "../globalStyles";

import Home from "../Layout/HomeComponent";
import OrgDashboardPage from "../pages/OrgDashboardPage";

const Router = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Suspense fallback={null}>
      <GlobalStyles />

      <Switch>
        <Route
          path="/home"
          component={() => <Home visible={visible} setVisible={setVisible} />}
        />
        <Route
          path="/organisation/dashboard"
          component={() => <OrgDashboardPage />}
        />
      </Switch>
    </Suspense>
  );
};

export default Router;
