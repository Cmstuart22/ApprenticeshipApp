const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");

//REGISTER
router.route("/register").post(async (req, res) => {
  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Validate data before creating user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user is already in database
  const usernameExists = await User.findOne({ username: req.body.username });
  if (usernameExists) {
    return res.status(400).send("Username already exists");
  } else {
    //Create a new user
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      isAdmin: false
    });

    return await user
      .save()
      .then(() => res.json({ user: user._id }))
      .catch((err) => res.status(400).json("Error " + err));
  }
});

//LOGIN
router.route("/login").post(async (req, res) => {
  //Validate data before creating user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user is already in database
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Username doesn't exist");

  //Check if user password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  //Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token);

  res.json({ isAdmin: user.isAdmin, token });
  
});

// router.route("/get-admin").get(async (req, res) => {
//   //Validate data before creating user
//   const { error } = loginValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   //Check if user is already in database
//   const user = await User.findOne({ username: req.body.username });
//   if (!user) return res.status(400).send("Username doesn't exist");

//   //Check if user password is correct
//   const validPassword = await bcrypt.compare(req.body.password, user.password);
//   if (!validPassword) return res.status(400).send("Invalid password");

//   //Create and assign token
//   const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
//   res.header("auth-token", token);

//   res.json({ message: user, token });
  
// });

module.exports = router;
