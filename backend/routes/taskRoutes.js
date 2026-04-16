const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  completeTask,
  deleteTask,
} = require("../controllers/taskController");
const handleValidationErrors = require("../middleware/handleValidationErrors");
const {
  createTaskValidation,
  updateTaskValidation,
  completeTaskValidation,
  deleteTaskValidation,
  getTasksValidation,
} = require("../middleware/taskValidation");

const router = express.Router();

router.get("/", getTasksValidation, handleValidationErrors, getTasks);
router.post("/", createTaskValidation, handleValidationErrors, createTask);
router.put("/:id", updateTaskValidation, handleValidationErrors, updateTask);
router.patch("/:id/complete", completeTaskValidation, handleValidationErrors, completeTask);
router.delete("/:id", deleteTaskValidation, handleValidationErrors, deleteTask);

module.exports = router;
