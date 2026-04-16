export const categories = ["All", "Work", "Personal", "Study", "Other"];
export const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

export const formatDateForInput = (value) => {
  if (!value) {
    return "";
  }

  return new Date(value).toISOString().split("T")[0];
};

export const formatDueDate = (value) => {
  if (!value) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(value));
};
