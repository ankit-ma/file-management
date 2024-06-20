require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const User = require("./model/user");
const auth = require("./middleware/auth");

const userRoutes = require("./routes/user-routes");
const folderRoutes = require("./routes/folder-routes");
const fileRoutes = require("./routes/file-routes");

const HttpError = require("./model/Http-error");
const app = express();

//app.use(express.json({ limit: "50mb" }));

app.use(express.json());
app.use(
  session({
    secret: "backend_session",
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});
console.log("Call coming to backend");
app.use("/user", userRoutes);
app.use("/folder",folderRoutes);
app.use("/file",fileRoutes);
// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

module.exports = app;
