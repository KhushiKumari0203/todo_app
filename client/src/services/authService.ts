const API_URL = "https://todo-app-backend-t0dg.onrender.com/auth";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Login failed');
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Registration failed');
    return await response.json();
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};
