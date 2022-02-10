const router = require("express").Router();
const verify = require("./verifyToken");

router.route("/").get(verify, (req, res) => {
  //   res.json({ posts: { title: "title 1", description: "desc 1" } });
  res.send(req.user);
});

module.exports = router;
