const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

//Middleware
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB datebase connection established successfully");
});

//Import Routes
const topicsRoute = require("./routes/topics");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const studentsRoute = require("./routes/students");
const categoriesRoute = require("./routes/categories");

//Route Middlewares
app.use("/api/topics", topicsRoute);
app.use("/api/user", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/students", studentsRoute);
app.use("/api/categories", categoriesRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
