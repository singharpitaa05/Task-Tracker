# Task-Tracker

Lightweight, professional task management web app with offline support, bulk operations, import/export, keyboard shortcuts, and a clean React + Vite frontend backed by an Express + MongoDB API.

📖 Documentation | 🚀 Quick Start | 🎯 Features

MIT License · Node.js · Express · React · Vite · MongoDB · Tailwind CSS

📋 Table of Contents
- Overview
- Features
- Tech Stack
- Project Structure
- Installation
- Usage
- How to Contribute
- Author
- License

🌟 Overview
Task-Tracker is a simple, production-ready task management app focused on usability, offline resilience, and developer ergonomics. It provides CRUD for tasks, bulk actions, search, sort, import/export, keyboard shortcuts, and a responsive UI.

🎯 Key Highlights
- REST API with Express and MongoDB
- Frontend built with Vite + React and vanilla JS modules for progressive enhancement
- Offline support using localStorage (frontend/storage.js)
- Import/Export (JSON/CSV/Text) via frontend/exportImport.js
- Keyboard shortcuts and help modal (frontend/keyboard.js)
- Toast notifications (frontend/toast.js)
- Bulk operations manager (frontend/bulkOperations.js)

✨ Features
- Create, read, update, delete tasks (backend model: backend/models/Task.js)
- Server-side validation and duplicate detection (backend/routes/taskRoutes.js)
- Sorting & searching (frontend/sort.js, frontend/search.js)
- Statistics dashboard (frontend/stats.js)
- Bulk actions (select multiple tasks, bulk delete, bulk update)
- Import/export tasks (JSON/CSV/Text)
- Offline persistence and sync via localStorage
- Keyboard shortcuts and accessibility improvements

⚙️ Tech Stack
Frontend
- Framework: React + Vite
- Build Tool: Vite
- Styling: Tailwind CSS (project uses CSS in frontend/src/index.css)
- Routing: vanilla / lightweight routing (if used)
- HTTP Client: fetch / axios (frontend/api.js)
Backend
- Runtime: Node.js
- Framework: Express
- Database: MongoDB + Mongoose (backend/config/database.js)
- Validation & Error Handling: express + custom errorHandler.js
Dev & Deployment
- Version Control: Git + GitHub
- Local dev: Node.js + MongoDB (local or Atlas)

📁 Project Structure
Task-Tracker/
├── backend/
│   ├── config/
│   │   └── database.js                # MongoDB connection
│   ├── models/
│   │   └── Task.js                    # Task schema
│   ├── routes/
│   │   └── taskRoutes.js              # Task API routes
│   ├── server.js                      # Express entrypoint
│   ├── .env                           # Environment (not committed)
│   └── package.json
│
├── frontend/
│   ├── public/                         # Static assets
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── accessibility.js
│   ├── api.js
│   ├── bulkOperations.js
│   ├── exportImport.js
│   ├── keyboard.js
│   ├── storage.js
│   ├── toast.js
│   ├── validator.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md
└── LICENSE

🚀 Installation
Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or Atlas)
- Git

1. Clone repository
git clone <your-repo-url>
cd Task-Tracker

2. Backend setup
cd backend
npm install

Create .env in backend (example)
PORT=5000
MONGODB_URI=your_mongo_connection_string
CLIENT_URL=http://localhost:5173

Start backend (development)
npm run dev
Backend default: http://localhost:5000

3. Frontend setup
cd ../frontend
npm install

Create .env (frontend)
VITE_API_URL=http://localhost:5000/api

Start frontend
npm run dev
Frontend default: http://localhost:5173

4. Open app
Visit: http://localhost:5173

🎮 Usage
For Users
- Create tasks with title, description, due date, tags, priority
- Edit and delete individual tasks
- Select multiple tasks for bulk actions (complete, delete, move)
- Import tasks (JSON/CSV/Text) and export current tasks
- Use keyboard shortcuts (press ? or see help modal) for productivity
- Offline: create/edit tasks offline; changes persist to localStorage and sync when online

For Admin / Devs
- API endpoints in backend/routes/taskRoutes.js
- Seed data by running custom scripts (if provided)
- Monitor server logs in the backend terminal

How to Contribute
- Fork the repository
- Create a feature branch: git checkout -b feature/my-feature
- Commit: git commit -m "Add my feature"
- Push: git push origin feature/my-feature
- Open a pull request with description of changes

👤 Author
Designed and Developed with Arpita Singh.

🔗 Connect
- GitHub: link to repository/profile
- Email / LinkedIn (optional)

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.