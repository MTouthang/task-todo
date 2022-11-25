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
} = require("../controllers/taskController");

router.route("/").get(getTasks);

router.route("/task/create").post(createTask);
router.route("/tasks").get(getAllTasks);
router.route("/task/:id").delete(deleteTask).put(updateTask).get(getTaskById);

// router.route("/task/:id/todo/").delete(removeTodo);
router.route("/task/todo/:id/:todoId").delete(removeTodo);

module.exports = router;
