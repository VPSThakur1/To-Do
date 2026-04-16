import { useEffect, useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { formatDateForInput } from "../components/taskUtils";
import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/taskService";

const emptyForm = {
  title: "",
  description: "",
  category: "Personal",
  dueDate: "",
};

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ category: "", status: "all" });
  const [formData, setFormData] = useState(emptyForm);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [mutatingTaskId, setMutatingTaskId] = useState("");

  const taskCountLabel = useMemo(() => `${tasks.length} task${tasks.length === 1 ? "" : "s"}`, [tasks.length]);

  const loadTasks = async (activeFilters = filters) => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getTasks(activeFilters);
      setTasks(data);
    } catch (serviceError) {
      setError(serviceError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(filters);
  }, [filters.category, filters.status]);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingTaskId(null);
    setFormError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setFormError("Task title must not be empty.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      dueDate: formData.dueDate || null,
    };

    try {
      if (editingTaskId) {
        await updateTask(editingTaskId, payload);
      } else {
        await createTask(payload);
      }

      resetForm();
      await loadTasks(filters);
    } catch (serviceError) {
      setFormError(serviceError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setFormError("");
    setFormData({
      title: task.title,
      description: task.description || "",
      category: task.category,
      dueDate: formatDateForInput(task.dueDate),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (taskId) => {
    setMutatingTaskId(taskId);
    setError("");

    try {
      await deleteTask(taskId);
      await loadTasks(filters);
      if (editingTaskId === taskId) {
        resetForm();
      }
    } catch (serviceError) {
      setError(serviceError.message);
    } finally {
      setMutatingTaskId("");
    }
  };

  const handleComplete = async (task) => {
    if (task.completed) {
      setError("Task is already completed.");
      return;
    }

    setMutatingTaskId(task._id);
    setError("");

    try {
      await completeTask(task._id);
      await loadTasks(filters);
    } catch (serviceError) {
      setError(serviceError.message);
    } finally {
      setMutatingTaskId("");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.4em] text-cyan-300">TaskFlow</p>
            <h1 className="mt-2 text-4xl font-semibold">Production-ready To-Do Management</h1>
          </div>
          <p className="text-sm text-slate-400">{taskCountLabel} loaded</p>
        </div>

        <TaskForm
          formData={formData}
          formError={formError}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          isEditing={Boolean(editingTaskId)}
        />

        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onComplete={handleComplete}
          mutatingTaskId={mutatingTaskId}
        />
      </div>
    </main>
  );
}

export default DashboardPage;
