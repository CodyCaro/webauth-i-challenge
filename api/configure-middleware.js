const session = require("express-session");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const sessionOptions = {
  name: "mycookie",
  secret: "cookiesareyummewantcookies",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionOptions));
};
