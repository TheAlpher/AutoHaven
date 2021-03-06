const UserModel = require("../model/usermodel");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const secret = "super secret";
const validator = require("validator");
const nodemailer=require("nodemailer");
// const sendEmail = require("../utility/email");
const Email = require("../utility/email");
// AuThenticate=>
module.exports.loginUser = async (req, res) => {
  try {
    let data = req.body;
    // 1. check emailID and password is present in req.body
    let { email, password } = data;
    if (!email || !password) {
      res.end("email or password is not present");
      return;
    } else if (!validator.isEmail(email) || password.length < 8) {
      res.end("Incorrect email or password");
    }

    // 2.a find user
    let userData = await UserModel.findOne({
      email: email
    });

    // console.log(userData);
    if (!userData) {
      res.end("User not found");
      return;
    }
    // console.log(userData);
    //2.b  verify password
    // hashed ,encrypted form
    let dbPassword = userData.password;
    // console.log(dbPassword,password);
    // console.log(typeof dbPassword, typeof password);
    let ans = await bcrypt.compare("" + password, dbPassword);
    if (!ans) {
      // new Error("Password was wrong")
      res.end("Incorrect Password");
      return;
    }
    // token is assigned
    // 3. create token using jsonwebtokens

    const JWTtoken = jsonwebtoken.sign({ id: userData._id }, secret, {
      expiresIn: "10d"
    });

    // Welcome mail
    //******************* */ let url = "http://localhost:3000/me";
    //****************** */ await new Email(userData, url).sendWelcome();
    //4. respond to user
    // modify
    res.cookie("jwt", JWTtoken, { httpOnly: "true" });
    res.json({
      status: "user logged in",
      userData
    });
    console.log("jojoooo");
  } catch (err) {
    console.log(err);
    res.status(501).json({
      status: "User not logged"
    });
  }
  res.end("Sending after try catch");
};
module.exports.userSignUp = async (req, res) => {
  // 1. check emailID and password is present in req.body
  //  form submisson
  try {
    let data = req.body;
    console.log(req.body);
    // value longer syntax
    // let email = data.email;
    // let password = data.password;
    // value shorter destructuring
    let {
      email,
      password,
      fName,
      lName,
      confirmPassword,
      address,
      contact
    } = data;
    let val1 = password.length >= 8;
    let val2 = contact.length == 10;
    if (
      !email ||
      !password ||
      !fName ||
      !lName ||
      !confirmPassword ||
      !address ||
      !contact
    ) {
      res.json({ status: "All fields are compulsory" });
      return;
    } else if (password != confirmPassword || !val1) {
      console.log("Enter correct password");
      res.json({ status: "Enter correct password format" });
      return;
    } else if (
      !validator.isAlpha(fName) ||
      !validator.isEmail(email) ||
      !validator.isNumeric(contact) ||
      !validator.isAlpha(lName) ||
      !val2
    ) {
      res.json({ status: "Enter correct details" });
      return;
    }
    // 2. create  user
    // async
    let user = await UserModel.create(data);
    // console.log( result);
    // result=JSON.parse(result);
    // 3. create token using jsonwebtokens
    // encrypt
    const JWTtoken = jsonwebtoken.sign({ id: user._id }, secret, {
      expiresIn: "10d"
    });
    await new Email(user,"localhost:3000").sendWelcome();
    res.cookie("jwt", JWTtoken, { httpOnly: "true" });
    res.status(200).json({
      status: "user Signedup",
      user
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "User already signedup with this email"
    });
  }
  // 4. responed to  user
};
module.exports.logoutUser = async (req, res) => {
  res.cookie("jwt", "Logged out", {
    expires: new Date(Date.now() + 100),
    httpOnly: true
  });
  res.status(201).json({
    status: "user logged Out"
  });
  console.log(Date.now());
};
// (SignedIN)view => Signout ,IMage
//view=>Login
module.exports.isloggedIn = async (req, res, next) => {
  //
  try {
    // 1. check token exist's ot not
    let token;
    console.log("islogged fn");
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
      console.log("NISFIFDVFBG islogged fn");
      console.log(token);
      // 2. verify the token
      let decode = jsonwebtoken.verify(token, secret);
      if (!decode) {
        // res.end("User is not authenticated");
        return next();
      }
      console.log(decode);
      // 3. check that user associated with the token exist in db or not
      // user name:steve
      //role:admin
      const user = await UserModel.findById(decode.id);
      if (!user) {
        // res.end("user does not exist");
        return next();
      }
      // 4. password update
      // db => ADMIN,User
      // authorize
      req.headers.role = user.role;
      // pug file
      res.locals.user = user;
      return next();
    } else {
      return next();
    }
  } catch (err) {
    // res.json(err);
    // console.log(err);
    return next();
  }
};
module.exports.protectRoute = async (req, res, next) => {
  //
  try {
    // 1. check token exist's ot not
    // console.log(req.headers);
    // console.log(req.headers.authorization);
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      res.end("User is not logged in ");
    }
    // 2. verify the token
    try {
      let decode = jsonwebtoken.verify(token, secret);
      const user = await UserModel.findById(decode.id);
      if (!user) {
        res.end("user does not exist");
      }
      // 4. password update
      // db => ADMIN,User

      req.headers.role = user.role;
      req.headers.user = user;
      // user.password = undefined;
      res.locals.user = user;
      next();
    } catch (err) {
      return res.end("User is not authenticated");
    }
    // console.log(decode);
    // 3. check that user associated with the token exist in db or not
    // user name:steve
    //role:admin
  } catch (err) {
    // res.json(err);
    console.log(err);
  }
};
//  admin owner=> level of privilages
module.exports.authorizeeasy = (req, res, next) => {
  if (req.headers.role === "admin" || req.headers.role === "restaurantOwner") {
    next();
  } else {
    res.end("user is not authorized");
  }
};
module.exports.authorize = function(...args) {
  let roles = args;
  return function(req, res, next) {
    if (roles.includes(req.headers.role)) {
      next();
    } else {
      res.end("user is not authorized");
    }
  };
};
module.exports.forgetPassword = async (req, res) => {
  // 1. get emailID from req.body
  const email = req.body.emailInput;
  if (!email) {
    res.end("Please enter your email ID");
  }
  // 2. DB findone
  let user = await UserModel.findOne({
    email: email
  });
  // console.log(user);
  if (!user) {
    res.end("User with given EmailID not found");
  }
  // 3. randomtoken
  // associate
  // console.log(user);
  let token = user.createResetToken();
  token=token.toString();
  console.log(token +"************");
  user.resetToken = token;
  await user.save({ validateBeforeSave: false });

  // generate
  // 4. send token via email

  // let message =
  //   "Your reset token is send please send a patch request to reset password route using provided token \n " +
  //   token;
  // console.log("I was here");
  try {
    // sendEmail({
    //   recieverId: user.email,
    //   message: message,
    //   subject: "token is only valid for 10 minutes"
    //   // html
    // });
    // let url = `http://localhost:3000/resetPassword/${token}`;
     let url =
       req.protocol +
       "://" +
       req.get("host") +
       "/resetPassword?id=" +
       user.email +
       "&token=" +
       token;
    await new Email(user, url).sendreset();
  } catch (err) {
    console.log(err);
    res.status(501).send(err);
  }
  res.end("Password reset token has been send to your email ID");
};
module.exports.resetPassword = async (req, res) => {
  let user;
  // 1. get token from the user
  const token = req.query.token;
  const email = req.query.id;
// let url = req.body.url;
// email=url.split("/")[3].split("?")[1].split("=")[1].split("&")[0];
console.log(req.body);
// url = url.split("?")[3];
// console.log(token);
  // const encryptedToken = crypto
  //   .createHash("sha256")
  //   .update(token)
  //   .digest("hex");
  //   console.log(encryptedToken);
  // console.log(token);
  try{
   user = await UserModel.find( {resetToken: token });
     user=user[0];
  }
  catch(e)
  {console.log(e);}
  console.log(user);
  if (!user) {
    res.end("User with this reset token is not present");
  }
      // console.log(user.email);

// 2. verify the token
  // console.log(user);
  // process.exit(1);
  if (user) {
    user.password = req.body.pass;
    user.confirmPassword = req.body.confirmpass;
    user.resetToken = undefined;
    user.expiresIn = undefined;
    await user.save();
    // console.log("I arrived here");
    // 3. update the password
    res.end("Password has been reset");
  }
};
module.exports.updateMyPassword = async (req, res) => {
  //  currentPassword,NewPassword,confirmPassword
  console.log(req.body);
  const dbPassword = req.headers.user.password;
  const password = req.body.oldpass;
  const user = req.headers.user;
  let ans = await bcrypt.compare("" + password, dbPassword);
  if (!ans) {
    // new Error("Password was wrong")
    res.end("password is wrong");
    return;
  }
  //  model user password update
  console.log(user);
  user.password = req.body.newpass;
  user.confirmPassword = req.body.confirmpass;
  // validators
  await user.save();
  // send tokens
  // const JWTtoken = jsonwebtoken.sign({ id: user._id }, secret, {
  //   expiresIn: "10d"
  // });
  // res.cookie("jwt", JWTtoken, { httpOnly: "true" });
  res.json({
    status: "user Password Updated"
  });
};
