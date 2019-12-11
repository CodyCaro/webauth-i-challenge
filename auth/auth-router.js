const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authorize = require("./auth-required-middleware.js");

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  let user = req.body;

  user.password = bcrypt.hashSync(user.password, 8);

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", authorize, (req, res) => {
  let { username } = req.headers;
  res.status(200).json({ message: `Welcome ${username}! Have a cookie...` });
});

router.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send("unable to logout...");
      } else {
        res.send("goodbye");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
