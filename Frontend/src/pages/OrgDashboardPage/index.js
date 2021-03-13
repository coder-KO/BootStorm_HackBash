import React, { useEffect, useContext, useState, useHistory } from "react";
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
  return (
    <>
      <OrgDashboard />
    </>
  );
};

export default OrgDashboardPage;
