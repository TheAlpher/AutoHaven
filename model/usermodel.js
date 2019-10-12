const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const DB =
  "mongodb+srv://thealpher:123abc@cluster1-ig5en.mongodb.net/test?retryWrites=true&w=majority";
// request
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to DB(user)");
  });
// set of rules\
// 10 => "10" "a-z,A-Z"
// let password="fake";

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
    validate: validator.isAlpha
  },
  lName: {
    type: String,
    required: true,
    validate: validator.isAlpha
  },
  email: {
    type: String,
    required: true,
    validate: validator.isEmail
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  confirmPassword: {
    type: String,
    required: true,
    min: 8,
    validate: function() {
      return this.confirmPassword === this.password;
    }
  },
  address: {
    type: String,
    required: true,
    min: 8
  },
  contact: {
    type: Number
  },
  resetToken: String,
  expiresIn: Date
});
// pre
// encrypt=>hashing
userSchema.pre("save", async function() {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

userSchema.methods.createResetToken = function() {
  // random number generate
  const cryptoToken = crypto.randomBytes(32).toString("hex");
  // encrypt
  this.resetToken = crypto
    .createHash("sha256")
    .update(cryptoToken)
    .digest("hex");
  // token expired in
  this.expiresIn = Date.now() + 1000 * 60 * 60; // console.log(this.resetToken, resetToken);
  return cryptoToken;
};
const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
