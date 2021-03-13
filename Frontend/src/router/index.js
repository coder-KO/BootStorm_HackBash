import { React, Suspense, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import Axios from "./../helper/axios";
import GlobalStyles from "../globalStyles";

import Home from "../Layout/HomeComponent";
import OrgDashboardPage from "../pages/OrgDashboardPage";
import VerifyPage from "../pages/VerifyPage";

const Router = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedin = async () => {
      try {
        let token = localStorage.getItem("auth-token");
        if (token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
        const tokenRes = await Axios.post("/tokenIsValid");
        console.log(tokenRes);

        if (tokenRes) {
          const userRes = await Axios.get("/");
          console.log(userRes);
          setUserData({
            token,
            user: userRes.data,
          });
        }

        console.log(tokenRes.data);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedin();
  }, []);

  console.log(loading);

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <Suspense fallback={null}>
          <GlobalStyles />
          <UserContext.Provider value={{ userData, setUserData }}>
            <Switch>
              <Route path="/home" component={() => <Home />} />
              <Route
                path="/organisation/dashboard/"
                component={() => <OrgDashboardPage />}
              />
              <Route path="/verify" component={() => <VerifyPage />} />
            </Switch>
          </UserContext.Provider>
        </Suspense>
      )}
    </>
  );
};

export default Router;
