// client/src/components/TaskItem.tsx
import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <li
      style={{
        textDecoration: task.status === 'Complete' ? 'line-through' : 'none',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
      }}
    >
      <div>
        <input
          type="checkbox"
          checked={task.status === 'Complete'}
          onChange={() => onToggleComplete(task)}
          style={{ marginRight: '8px' }}
        />
        <span>{task.name}</span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        style={{
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
