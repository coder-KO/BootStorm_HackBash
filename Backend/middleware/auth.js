const jwt = require("jsonwebtoken");

exports.Auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        msg: "No Auth token found, access denied",
      });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (!user) {
      return res.status(401).json({
        msg: "Token verification failed, access denied",
      });
    }

    // console.log(user);
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
