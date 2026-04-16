const { body, param, query } = require("express-validator");

const allowedCategories = ["Work", "Personal", "Study", "Other"];
const allowedStatuses = ["all", "completed", "pending"];

const taskPayloadRules = [
  body("title")
    .exists()
    .withMessage("Task title is required.")
    .bail()
    .isString()
    .withMessage("Task title must be a string.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Task title must not be empty."),
  body("description")
    .optional({ nullable: true })
    .isString()
    .withMessage("Task description must be a string."),
  body("category")
    .optional()
    .isIn(allowedCategories)
    .withMessage("Category must be one of Work, Personal, Study, or Other."),
  body("dueDate")
    .optional({ nullable: true, values: "falsy" })
    .isISO8601()
    .withMessage("Due date must be a valid ISO date."),
];

const createTaskValidation = taskPayloadRules;

const updateTaskValidation = [
  param("id").isMongoId().withMessage("Invalid task id."),
  ...taskPayloadRules,
];

const completeTaskValidation = [
  param("id").isMongoId().withMessage("Invalid task id."),
];

const deleteTaskValidation = [
  param("id").isMongoId().withMessage("Invalid task id."),
];

const getTasksValidation = [
  query("category")
    .optional()
    .isIn(allowedCategories)
    .withMessage("Category must be one of Work, Personal, Study, or Other."),
  query("status")
    .optional()
    .isIn(allowedStatuses)
    .withMessage("Status must be one of all, completed, or pending."),
];

module.exports = {
  allowedCategories,
  createTaskValidation,
  updateTaskValidation,
  completeTaskValidation,
  deleteTaskValidation,
  getTasksValidation,
};
