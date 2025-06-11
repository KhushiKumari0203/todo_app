// client/src/services/authService.ts

const API_URL = 'https://todo-app-backend-t0dg.onrender.com/auth';

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // ✅ Convert frontend's email into backend's expected "username"
    body: JSON.stringify({ username: email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};
