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

const login = async (req, res, next) => {
  let user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    user = user.toObject();
    let hashedPassword = user.password;
    delete user.password;
    let matched = await bcrypt.compare(req.body.password, hashedPassword);
    if (matched) {
      return res.send(user);
    }
  }
  res.send(401).send("Invalid Credentials");
};

module.exports = { signup, login };
