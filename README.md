# 📝 Full Stack Todo App

A full-stack Todo application built with **React (Vite + TypeScript)** on the frontend and **Node.js + Express + TypeScript** on the backend. It includes task creation, update, deletion, filtering, sorting, and search functionalities. User authentication is also integrated.

---
![to do app login](https://github.com/user-attachments/assets/67ed566a-57e9-4836-8bdf-2cea4bc5b9a4)
THE LOGIN PAGE (USER AUTHENTICATION)

![todo app frontend](https://github.com/user-attachments/assets/ad05685e-9b96-454f-be11-bf178e234eac)
THE TASK PAGE (HOME PAGE)


## 📁 Project Structure
todo_app/

├── client/ # Frontend (React + Vite + TypeScript)

├── server/ # Backend (Express + TypeScript)




---

## 🚀 Features

- ✅ Add, delete tasks
- 🔍 filter tasks(All, Completed, Imcomplete)
- 👩‍💻 User authentication (login)
- 🔐 Protected routes using middleware
- 📦 RESTful API with Express
- 🎨 Responsive UI with clean design

---

## 🔧 Tech Stack

### Frontend:
- React + Vite
- TypeScript
- Axios
- CSS (Tailwind/Custom)

### Backend:
- Node.js
- Express
- TypeScript
- JWT (for auth)
- In-memory tasks (for demo) – can be replaced with a database( ex MongoDB)

---

## ⚙️ Getting Started

### 📦 Prerequisites
- Node.js + npm installed
- Git installed

### 🛠 Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/todo_app.git
cd todo_app

```

## Install dependencies
# Frontend
cd client
npm install


# Backend
cd ../server
npm install



## Run the app
# In one terminal (backend)
cd server
npx nodemon src

# In another terminal (frontend)
cd client
npm run dev

#🔐 Authentication Notes
The backend uses JWT-based authentication (currently optional). You can enable the authMiddleware in taskRoutes.ts for production.

🧠 Future Improvements
Database integration (MongoDB / PostgreSQL)

User-specific persistent tasks

Dark mode toggle

Deployment (Netlify + Render)






