export interface User {
  id: string;
  username: string;
  password: string;
}

export const users: User[] = [];  // In-memory storage (no DB)
