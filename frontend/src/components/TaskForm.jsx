const inputBaseClasses =
  "w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30";

function TaskForm({ formData, formError, isSubmitting, onChange, onSubmit, onCancel, isEditing }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Task Editor</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Plan your day clearly</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Create, update, complete, and organize tasks with categories, due dates, and responsive filtering.
          </p>
        </div>
        {isEditing ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
          >
            Cancel edit
          </button>
        ) : null}
      </div>

      <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-200">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Enter a task title"
            className={inputBaseClasses}
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-200">Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={onChange}
            placeholder="Add a helpful note"
            className={`${inputBaseClasses} resize-none`}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">Category</label>
          <select name="category" value={formData.category} onChange={onChange} className={inputBaseClasses}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">Due date</label>
          <input name="dueDate" type="date" value={formData.dueDate} onChange={onChange} className={inputBaseClasses} />
        </div>

        {formError ? <p className="md:col-span-2 text-sm text-rose-300">{formError}</p> : null}

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
          >
            {isSubmitting ? "Saving..." : isEditing ? "Update task" : "Create task"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default TaskForm;
