const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      maxlength: [40, "Task should be under 20 characters"],
    },
    todos: [
      {
        todo: {
          type: String,
          maxlength: [45, "todo should be under 25 characters"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("task", taskSchema);
