process.env.NODE_ENV = "test";
process.env.CLIENT_URL = "http://localhost:5173";

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const app = require("../app");
const Task = require("../models/Task");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await Task.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Task API", () => {
  it("creates a task", async () => {
    const response = await request(app).post("/tasks").send({
      title: "Finish backend setup",
      description: "Wire up MongoDB and routes",
      category: "Work",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe("Finish backend setup");
  });

  it("rejects an empty title", async () => {
    const response = await request(app).post("/tasks").send({
      title: "   ",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Task title must not be empty.");
  });

  it("filters tasks by category and status", async () => {
    await Task.create([
      { title: "Work task", category: "Work", completed: false },
      { title: "Done work task", category: "Work", completed: true },
      { title: "Personal task", category: "Personal", completed: false },
    ]);

    const response = await request(app).get("/tasks?category=Work&status=completed");

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].title).toBe("Done work task");
  });

  it("prevents completing an already completed task", async () => {
    const task = await Task.create({ title: "Already done", completed: true });

    const response = await request(app).patch(`/tasks/${task._id}/complete`);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Task is already completed.");
  });

  it("updates a task", async () => {
    const task = await Task.create({ title: "Initial title", category: "Study" });

    const response = await request(app).put(`/tasks/${task._id}`).send({
      title: "Updated title",
      description: "Updated description",
      category: "Personal",
      dueDate: "2026-04-18T00:00:00.000Z",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.title).toBe("Updated title");
    expect(response.body.data.category).toBe("Personal");
  });

  it("deletes a task", async () => {
    const task = await Task.create({ title: "Delete me" });

    const response = await request(app).delete(`/tasks/${task._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Task deleted successfully.");
  });
});
