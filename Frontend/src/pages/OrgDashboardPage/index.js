import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import OrgDashboard from "../../components/OrgDashboard";
import { UserContext } from "./../../context/UserContext";

const OrgDashboardPage = () => {
  const { userData } = useContext(UserContext); //getting Data form UserContext
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  //Checking if User is Logged in , if not then send him to login page
  useEffect(() => {
    console.log(userData);
    if (!userData.user) history.push("/home");
    setLoading(false);
  });
  return <>{loading ? <p>loading</p> : <OrgDashboard />}</>;
};

export default OrgDashboardPage;
