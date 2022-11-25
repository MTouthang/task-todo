const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    maxlength: [20, "Task should be under 20 characters"],
  },
  todos: [
    {
      todo: {
        type: String,
        maxlength: [25, "todo should be under 25 characters"],
      },
    },
  ],
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("task", taskSchema);
