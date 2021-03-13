const Users = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Router = require("express").Router();
// const Auth = require("../middleware/auth");
const { signUp, signIn } = require("../controller/user");
const { Auth } = require("../middleware/auth");

//======================================================================================================//
//	Route for Registering User
//======================================================================================================//
Router.post("/register", signUp);

//======================================================================================================//
//	Route for Login
//======================================================================================================//
Router.post("/login", signIn);

//======================================================================================================//
//	Route for Deleting Account
//======================================================================================================//
Router.delete("/delete", Auth, async (req, res) => {
  try {
    Users.findByIdAndDelete(req.user._id, (err, d) => {
      res.json(d);
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

//======================================================================================================//
//	Route for jwt token validation
//======================================================================================================//
Router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await Users.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

//======================================================================================================//
//	Route to get User Data
//======================================================================================================//
Router.get("/", Auth, (req, res) => {
  console.log("in");
  Users.findById(req.user._id, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      console.log("in");
      return res.json(data);
    }
  });
});

module.exports = Router;
