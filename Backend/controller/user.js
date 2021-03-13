const Users = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const IPFSLink = (hash) => {
  return `https://ipfs.infura.io/ipfs/${hash}`;
};

exports.signUp = async (req, res) => {
  try {
    const data = req.body;

    if (!data.email || !data.password || !data.name || !data.description) {
      return res.status(400).json({ msg: "Not all fields are there" });
    }
    if (data.password.length < 5) {
      return res.status(400).json({ msg: "Enter password of 5 letters" });
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

exports.tokenIsValid = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified);
    if (!verified) return res.json(false);

    const user = await Users.findById(verified._id);
    console.log(user);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};

exports.getUserData = (req, res) => {
  Users.findById(req.user._id, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

exports.addDocuments = (req, res) => {
  try {
    const { documentHash } = req.body;
    const link = IPFSLink(documentHash);
    if (documentHash) {
      Users.updateOne(
        { _id: req.user._id },
        { $push: { signed_docs: link } },
        (err, data) => {
          console.log(data);
          if (err) {
            return res.status(400).json({
              msg: "Somethong Went wrong try again",
            });
          } else {
            return res.status(200).json({
              msg: "Updated sucessfully",
            });
          }
        }
      );
    } else {
      return res.status(400).json({
        msg: "Not all fields",
      });
    }
  } catch (err) {
    return res.status(500).json({ err });
  }
};
