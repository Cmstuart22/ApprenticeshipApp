const router = require("express").Router();
const Topic = require("../models/Topic");
const ObjectId = require("bson-objectid");

router.route("/").get((req, res) => {
  Topic.find()
    .populate("studentId")
    .select({ __v: 0 })
    .then((topics) => res.json(topics))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/get").get((req, res) => {
  Topic.find({
    studentId: { _id: ObjectId(req.query._id) },
  })
    .populate("studentId")
    .select()
    .then((topics) => res.json(topics))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/add").post((req, res) => {
  const category = req.body.category;
  const topic = req.body.topic;
  const notes = req.body.notes;
  const studentId = req.body.studentId;

  const newTopic = new Topic({
    category,
    topic,
    notes,
    studentId,
  });

  newTopic
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
