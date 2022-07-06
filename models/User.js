const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { registerSchema, registerSchemas } = require("swaggiffy");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
  },
  nationalId: {
    type: String,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
});

userSchema.plugin(require("mongoose-beautiful-unique-validation"));

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // if it is not new

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  storePassword
) {
  return await bcrypt.compare(candidatePassword, storePassword);
};

const User = mongoose.model("users", userSchema);

registerSchema("User", userSchema, { orm: "mongoose" });
module.exports = User;
