const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let loggedIn = false;
    let token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      try {
        var decoded = jwt.verify(token, "shhhhh");
        req.user = decoded;
        loggedIn = true;
      } catch (error) {
        console.log("JWT error");
      }
    }
    if (!loggedIn) {
      return res.status(401).send("Unauthenticated");
    }
    next();
  } catch (error) {
    next(error);
  }
};
