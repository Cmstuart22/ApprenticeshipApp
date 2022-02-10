const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema(
  {
    category: {
      type: String,
      ref: "Category"
    }, 
    topic: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    studentId: [{
      type: mongoose.Types.ObjectId,
      ref: "Student"
    }], 
  }
);

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
