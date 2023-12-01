const bcrypt = require("bcrypt");
const UserModel = require("../model/User");

const signup = async (req, res, next) => {
  try {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
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
