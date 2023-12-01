const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, minLength: 3 },
  email: {
    type: String,
    required: true,
    validate: {
      validator: async function (requestValue) {
        let user = await mongoose.models.Users.findOne({ email: requestValue });
        if (user) {
          return false;
        }
        return true;
      },
      message: "email already in use",
    },
  },
  password: { type: String, required: true },
  contact: { type: Number },
  role: { type: String, enum: ["company", "job-seeker"] },
});

UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
