import React from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => (
  <li className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 shadow-sm">
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="accent-purple-600 w-5 h-5"
      />
      <span
        className={`text-lg ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {task.title}
      </span>
    </div>
    <button
      onClick={() => onDelete(task.id)}
      className="text-red-500 hover:text-red-700 transition"
      title="Delete"
    >
      &#10005;
    </button>
  </li>
);

export default TaskItem;
