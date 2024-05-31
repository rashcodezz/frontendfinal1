const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");

const {
  getTasks,
  createTask,
  searchById,
  updayeById,
  deleteById,
} = require("../controllers/task.controller");

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.get("/tasks/:id", searchById);
router.put("/tasks/:id", updayeById);
router.delete("/tasks/:id", deleteById);

module.exports = router;
