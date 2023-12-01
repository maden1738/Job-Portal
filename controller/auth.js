const UserModel = require("../model/User");

const signup = async (req, res, next) => {
  try {
    let user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      role: req.body.role,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const login = (req, res, next) => {
  res.send("logged in ");
};

module.exports = { signup, login };
