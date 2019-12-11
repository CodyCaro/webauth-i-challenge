const router = require("express").Router();
const Users = require("./users-model.js");

const authrequired = require("../auth/restricted-middleware");

router.get("/", authrequired, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
