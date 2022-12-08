const { findByIdAndUpdate } = require("../models/task");
const Task = require("../models/task");

/**
 * @Home
 * @route http://localhost:4000/api/v1/
 * @description Home route for testing if the api is working
 * @parameters null
 * @returns String: - Task Todo Home Route
 *
 */
exports.getTasks = (req, res) => {
  res.send("Task Todo Home route");
};

/**
 * @createTask
 * @route http:4000/api/v1/task/create
 * @description create a new task with user id
 * @parameters task, array of todo or todo's and userId
 * @returns task object
 */
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    console.log(task);
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

/**
 * @getTasks
 * @route http:4000/api/v1/tasks/:userId
 * @description get all the task created by the user
 * @parameters userId
 * @returns object of task created by the particular user
 */
exports.getAllTasks = async (req, res) => {
  const userId = req.params.userId;

  console.log(`id  --- ${userId}`);
  try {
    const tasks = await Task.find({ userId });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @deleteTask
 * @route http:4000/api/v1/task/taskId
 * @description delete the task by the provided taskId
 * @parameters taskId
 * @returns success message
 */
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return new Error();
    }
    await task.remove();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

/**
 * @updateTask
 * @route http:4000/api/v1/task/taskId
 * @description update the task and todos
 * @parameters taskId
 * @returns updated objects of task
 */
// TODO: check if data wrt to id exist in the database
exports.updateTask = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

/**
 * @getTaskById
 * @route http:4000/api/v1/task/taskId
 * @description retrieve the task by its id
 * @parameters taskId
 * @returns  objects of task wrt to the id
 */
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

/**
 * @removeTodo
 * @route http:4000/api/v1/task/taskId/todoId
 * @description delete a particular todo items with the provide todoId
 * @parameters taskId, todoId
 * @returns  success message and object of remaining todo
 */
exports.removeTodo = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

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
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

/**
 * @searchTask
 * @route http:4000/api/v1/tasks/search/userId?search=taskToBeSearch
 * @description search the particular task with the given search input
 * @parameters userId, search string
 * @returns  array of search matching object
 */
exports.searchTask = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { search } = req.query;
    console.log(req.query);
    console.log(search);

    const taskResult = await Task.find({
      userId: userId,
      taskName: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      success: true,
      taskResult,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

/**
 * @sortTask
 * @route http:4000/api/v1/tasks/userId/sort
 * @description sort the task in last update manner with respect to updated time
 * @parameters userId
 * @returns  array of task and todos in  sort by last modify order
 */
exports.sortTask = async (req, res) => {
  const userId = req.params.userId;
  try {
    const tasks = await Task.find({ userId }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.log(`Error ${error}`);
  }
};
