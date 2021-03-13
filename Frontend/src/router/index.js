import { React, Suspense, useState } from "react";
import { Switch, Route } from "react-router-dom";

import routes from "./config";
import GlobalStyles from "../globalStyles";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import OrgDashboardPage from "../pages/OrgDashboardPage";

const Router = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Suspense fallback={null}>
      <GlobalStyles />
      <Header visible={visible} setVisible={setVisible} />
      <Switch>
        {/* {routes.map((routeItem) => {
          return ( */}
        <Route
          path="/home"
          component={() => <Home visible={visible} setVisible={setVisible} />}
        />
        <Route
          path="/organisation/dashboard"
          component={() => <OrgDashboardPage />}
        />
        {/* );
        })} */}
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default Router;
