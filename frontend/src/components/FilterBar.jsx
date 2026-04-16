import { categories, statusOptions } from "./taskUtils";

function FilterBar({ filters, onFilterChange }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Filters</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Refine your tasks</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-300">
            Category
            <select
              name="category"
              value={filters.category}
              onChange={onFilterChange}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            >
              {categories.map((category) => (
                <option key={category} value={category === "All" ? "" : category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-slate-300">
            Status
            <select
              name="status"
              value={filters.status}
              onChange={onFilterChange}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}

export default FilterBar;
