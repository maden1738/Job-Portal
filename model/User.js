const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, minLength: 3 },
  email: {
    type: String,
    required: true,
    lowercase: true,
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
  website: {
    type: String,
    validate: {
      validator: async function () {
        let role = this.role;
        console.log(role);
        if (role != "company") {
          return false;
        }
        return true;
      },
      message: "this field is for company only",
    },
  },
  contact: { type: Number },
  role: { type: String, enum: ["company", "job-seeker"] },
});
// UserSchema.methods.sayHi = function () {
//   console.log(`hi my name is ${this.name}`);
// };

UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
