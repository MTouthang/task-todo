const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  getAllTasks,
  deleteTask,
  updateTask,
  removeTodo,
  getTaskById,
  searchTask,
  sortTask,
} = require("../controllers/taskController");

router.route("/").get(getTasks);

router.route("/task/create").post(createTask);
router.route("/tasks/:userId").get(getAllTasks);
router.route("/task/:id").delete(deleteTask).put(updateTask).get(getTaskById);

// router.route("/task/:id/todo/").delete(removeTodo);
router.route("/task/todo/:id/:todoId").delete(removeTodo);

// search route
router.route("/tasks/search/:userId").get(searchTask);
// sort task (descending to updated time)
router.route("/tasks/:userId/sort").get(sortTask);

module.exports = router;
