const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const taskRoutes = require("./routes/taskRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "API is healthy." });
});

app.use("/tasks", taskRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
