const e = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
  },
  dueDate: {
    type: Date,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
