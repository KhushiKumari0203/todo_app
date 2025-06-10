// src/pages/AddTask.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTask: React.FC = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'complete' | 'incomplete'>('incomplete');
  const navigate = useNavigate();

  // ✅ Here is the handleAddTask function
  const handleAddTask = async () => {
    if (name.trim() === '') {
      alert("Task name cannot be empty");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, status }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      // Reset form
      setName('');
      setStatus('incomplete');

      // Redirect to homepage
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while adding the task.');
    }
  };

  return (
    <div>
      {/* UI and input fields */}
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value as 'complete' | 'incomplete')}>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </select>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
