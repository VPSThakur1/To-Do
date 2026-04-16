const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required."],
      trim: true,
      maxlength: [120, "Task title must be 120 characters or fewer."],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Task description must be 500 characters or fewer."],
      default: "",
    },
    category: {
      type: String,
      enum: {
        values: ["Work", "Personal", "Study", "Other"],
        message: "Category must be one of Work, Personal, Study, or Other.",
      },
      default: "Personal",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

taskSchema.pre("validate", function validateTitle(next) {
  if (typeof this.title === "string") {
    this.title = this.title.trim();
  }

  if (!this.title) {
    this.invalidate("title", "Task title must not be empty.");
  }

  next();
});

module.exports = mongoose.model("Task", taskSchema);
