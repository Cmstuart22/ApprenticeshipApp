const router = require("express").Router();
const Category = require("../models/Category");

router.route("/").get((req, res) => {
  Category.find()
    .select({ __v: 0 })
    .then((topics) => res.json(topics))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;

  const newCategory = new Category({
    name,
  });

  newCategory
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
