import React, { useEffect, useState } from 'react';

interface Task {
  id: string;
  name: string;
  status: 'complete' | 'incomplete';
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState<'complete' | 'incomplete'>('incomplete');
  const [filterStatus, setFilterStatus] = useState<'all' | 'complete' | 'incomplete'>('all');

const filteredTasks = tasks.filter((task) =>
  filterStatus === 'all' ? true : task.status === filterStatus
);


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

 useEffect(() => {
  const handleFocus = () => {
    if (token) {
      fetchData(token);
    }
  };

  window.addEventListener('focus', handleFocus);

  return () => {
    window.removeEventListener('focus', handleFocus);
  };
}, [token]);

  const fetchData = async (authToken: string | null = token) => {
    if (!authToken) return;
    const res = await fetch('http://localhost:5000/tasks', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const data = await res.json();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (!newTaskName.trim() || !token) return;

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newTaskName, status: newTaskStatus }),
    });

    const data = await res.json();
    setTasks([...tasks, data]); // update tasks in UI
    setNewTaskName('');
    setNewTaskStatus('incomplete');
  };

  const handleDeleteTask = async (id: string) => {
    if (!token) return;

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    setTasks(tasks.filter((task) => task.id !== id)); // remove task in UI
  };

    const handleUpdateTask = async (task: Task) => {
    if (!token) return;

    const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...task,
        status: task.status === 'complete' ? 'incomplete' : 'complete',
      }),
    });

    const data = await res.json();
    setTasks(tasks.map((t) => (t.id === data.id ? data : t))); // update in UI
  };

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        fetchData(data.token);
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Error logging in');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setTasks([]);
  };

  if (!token) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded px-4 py-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-4 py-2 mb-4 w-full"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
           

        <h1 className="text-2xl font-bold">Todo List</h1>
        <button
          onClick={handleLogout}
          className="text-red-500 underline"
        >
          Logout
        </button>
      </div>
      <br/>
       <div className="mb-4">
      <label className="mr-2 font-semibold">Filter:</label>
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value as any)}
        className="border rounded px-2 py-2"
      >
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
    <br/>

      {/* Add Task Section */}
      <div className="mb-8"> {/* Added more space here */}
        <input
          type="text"
          placeholder="Task name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="border rounded px-4 py-2 mr-2"
        />
        <select
          value={newTaskStatus}
          onChange={(e) => setNewTaskStatus(e.target.value as Task['status'])}
          className="border rounded px-2 py-2 mr-2"
        >
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
                <button
          onClick={handleAddTask}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center mb-2 border-b pb-2"
          >
            <div>
              <span className="font-semibold">{task.name}</span>{' '}
              <span className="text-sm text-gray-500">({task.status})</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  handleUpdateTask({
                    ...task,
                    status:
                      task.status === 'complete'
                        ? 'incomplete'
                        : 'complete',
                  })
                }
                className="text-blue-500 hover:text-blue-700"
              >
                Update {/* Still wondering what to do in update button?, is it for changing the name or marking like complete or incomplete */}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
