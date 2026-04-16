import { formatDueDate } from "./taskUtils";

function TaskCard({ task, onEdit, onDelete, onComplete, isMutating }) {
  return (
    <article
      className={`rounded-3xl border p-5 shadow-lg transition ${
        task.completed
          ? "border-emerald-500/30 bg-emerald-500/10"
          : "border-slate-800 bg-slate-900/70"
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-cyan-300">{task.category}</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                task.completed ? "bg-emerald-500/20 text-emerald-200" : "bg-amber-500/20 text-amber-200"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <div>
            <h3 className={`text-xl font-semibold ${task.completed ? "text-slate-400 line-through" : "text-white"}`}>
              {task.title}
            </h3>
            <p className={`mt-2 text-sm ${task.completed ? "text-slate-500" : "text-slate-400"}`}>
              {task.description || "No description provided."}
            </p>
          </div>

          <p className="text-sm text-slate-400">Due: {formatDueDate(task.dueDate)}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-white"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(task._id)}
            disabled={isMutating}
            className="rounded-2xl border border-rose-500/40 px-4 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => onComplete(task)}
            disabled={isMutating || task.completed}
            className="rounded-2xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
          >
            {task.completed ? "Already completed" : "Complete"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
