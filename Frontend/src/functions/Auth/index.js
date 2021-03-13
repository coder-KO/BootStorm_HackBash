// import axios from "axios";
import axios from "./../../helper/axios";

const Login = async (userData) => {
  try {
    console.log(userData);
    //calling the register API
    const returnData = await axios.post("/login", userData);
    console.log(returnData);
    const token = returnData.data.token;
    console.log(token);

    // varifying the token

    const isValid = await axios.post("/tokenIsValid");

    if (isValid === true) {
      //re-route to the dashboard page
      console.log("I'm In");
    }

    if (isValid === false) {
      console.log("Unauthorized");
    }
  } catch (err) {
    console.log(err);
  }
};

export { Login };
