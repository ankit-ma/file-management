require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose"); 

const User = require("../model/user");
const Folder = require("../model/Folder")
// const auth = require("../middleware/auth");
const HttpError = require("../model/Http-error");
const mathutil = require("../util/mathutil");


const registerUser = async (req, res, next) => {
   const session = await mongoose.startSession();
   session.startTransaction();
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;
    const options = {session};
    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send({message:"User Already Exist. Please Login"});
      //   next();
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      options
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // create root folder for this user
   
    rootFolder = new Folder({ name: 'Root', filePath: 'root', children: [], files: [], user:user._id,options});
    await rootFolder.save();
    console.log('Root folder created');
    // return new user
    const response = {
      email: user.email,
      name: user.first_name + " " + user.last_name,
      token: user.token,
      id:user._id,
      message: "User Registerd Succesfully",
    };
    
   await session.commitTransaction();
   session.endSession();
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();
    const error = new HttpError("Something went wrong", 404);
    return next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json({
        email: user.email,
        name: user.first_name + " " + user.last_name,
        token: user.token,
        id: user._id,
        message: "Logged in succesfull",
      });
    } else res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    const error = new HttpError("Something went wrong", 404);
    return next(error);
  }
};
const deleteUser = (req, res, next) => {
  try {
    res.status(200).send("delete called");
  } catch (err) {
    console.log(err);
    const error = new HttpError("Something went wrong", 404);
    return next(error);
  }
};
const sendOTP = async (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    res.status(400).send("Username is required Field");
  }
  const oldUser = await User.findOne({ email: username });

  if (!oldUser) {
    return res.status(409).send("User Does not exist with us");
    //   next();
  }
  const otp = mathutil.generateOTP();
  mathutil.sendOTPMail(username, otp);
  req.session.otp = otp;
  return res.status(200).send("OTP generated is " + otp);
};
const verifyOTP = async (req, res, next) => {
  const otpFromSession = req.session.otp;
  const { otp } = req.body;
  if (otp === otpFromSession) {
    return res.status(200).send({ message: "Otp validated" });
  }
  return res.status(400).send({ message: "Otp is not valid" });
};
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.deleteUser = deleteUser;
exports.sendOTP = sendOTP;
exports.verifyOTP = verifyOTP;
