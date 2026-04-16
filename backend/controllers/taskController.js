const Task = require("../models/Task");
const ApiError = require("../utils.ApiError");

const buildFilters = (query) => {
  const filters = {};

  if (query.category) {
    filters.category = query.category;
  }

  if (query.status === "completed") {
    filters.completed = true;
  }

  if (query.status === "pending") {
    filters.completed = false;
  }

  return filters;
};

const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description || "",
      category: req.body.category || "Personal",
      dueDate: req.body.dueDate || null,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find(buildFilters(req.query)).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new ApiError(404, "Task not found.");
    }

    task.title = req.body.title;
    task.description = req.body.description || "";
    task.category = req.body.category || "Personal";
    task.dueDate = req.body.dueDate || null;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const completeTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new ApiError(404, "Task not found.");
    }

    if (task.completed) {
      throw new ApiError(400, "Task is already completed.");
    }

    task.completed = true;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task marked as completed.",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      throw new ApiError(404, "Task not found.");
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  completeTask,
  deleteTask,
};
