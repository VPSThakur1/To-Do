import TaskCard from "./TaskCard";

function TaskList({ tasks, isLoading, error, onEdit, onDelete, onComplete, mutatingTaskId }) {
  if (isLoading) {
    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-slate-300">
        Loading tasks...
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-6 text-rose-100">{error}</section>
    );
  }

  if (tasks.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/70 p-10 text-center text-slate-400">
        No tasks match the current filters. Create one to get started.
      </section>
    );
  }

  return (
    <section className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
          isMutating={mutatingTaskId === task._id}
        />
      ))}
    </section>
  );
}

export default TaskList;
