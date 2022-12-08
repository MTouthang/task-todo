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
    userId: {
      type: String,
      trim: true,
      required: [true, "UseId must be provided"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("task", taskSchema);
