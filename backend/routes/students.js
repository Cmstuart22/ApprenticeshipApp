const router = require("express").Router();
const Student = require("../models/Student");

router.route("/").get((req, res) => {
  Student.find()
    .select()
    .then((students) => res.json(students))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/id").get((req, res) => {
  Student.find()
    .select({ _id: 1 })
    .then((students) => res.json(students))
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
