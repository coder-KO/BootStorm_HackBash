const Users = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET || "test", {
    expiresIn: "1d",
  });
};

exports.signUp = async (req, res) => {
  try {
    const data = req.body;

    if (
      !data.email ||
      !data.password ||
      !data.passwordCheck ||
      !data.name ||
      !data.description
    ) {
      return res.status(400).json({ msg: "Not all fields are there" });
    }
    if (data.password.length < 5) {
      return res.status(400).json({ msg: "Enter password of 5 letters" });
    }
    if (data.password !== data.passwordCheck) {
      return res.status(400).json({ msg: "Password did not match" });
    }

    Users.findOne({ email: data.email }, async (err, res_data) => {
      if (res_data) {
        return res.status(400).json({ msg: "Account already exists" });
      } else {
        const newUser = new Users({
          name: data.name,
          description: data.description,
          email: data.email,
          password: data.password,
        });

        newUser.save((err, ndata) => {
          if (err) {
            console.log(err);
            res.status(400).json({ msg: "Something Went wrong" });
          } else {
            console.log(ndata);
            res.json(ndata);
          }
        });
      }
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

exports.signIn = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields are there" });
    }

    Users.findOne({ email: email }, async (err, user) => {
      if (user) {
        if (!user.authenticate(password)) {
          return res.status(400).json({
            msg: "Check Your Password again",
          });
        } else {
          // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
          const token = generateJwtToken(user._id, user.role);

          return res.status(200).json({
            token: token,
            user: user,
          });
        }
      } else {
        return res.status(400).json({
          msg: "No account with this email has been registered.",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
