const { findByIdAndUpdate } = require("../models/task");
const Task = require("../models/task");

/**
 * home route
 * @return {String} welcome notes
 */
exports.getTasks = (req, res) => {
  res.send("Task Todo Home route");
};

/**
 * create a task
 */
exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);

  res.status(200).json({
    success: true,
    task,
  });
};

/**
 * get a list of Tasks
 */
exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find();

  if (!tasks) {
    return new Error();
  }
  res.status(200).json({
    success: true,
    tasks,
  });
};

/**
 * delete task -
 */
exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return new Error();
  }
  await task.remove();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
};

/**
 * update task
 */
exports.updateTask = async (req, res) => {
  // const { taskName } = req.body;
  // console.log(taskName);

  console.log(req.params.id);
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: `updated`,
  });
};

exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.status(200).json({
    success: true,
    task,
  });
};

// /**
//  * addTodo
//  */
// exports.addTodo = async (req, res) => {
//   const task  = await Task.findById(req.params.id)

// }

/**
 * delete todo
 */
exports.removeTodo = async (req, res) => {
  const task = await Task.findById(req.params.id);

  // task.todos.filter((word) => String(word._id) !== req.params.todoId);

  for (let index = 0; index < task.todos.length; index++) {
    if (task.todos[index]._id == req.params.todoId) {
      await task.todos[index].remove();
    }
  }
  task.save();
  res.status(200).json({
    success: true,
    task,
  });
};
