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
- Screenshots
- Author
- License

🌟 Overview
Task-Tracker is a simple, production-ready task management app focused on usability, offline resilience, and developer ergonomics. It provides CRUD for tasks, bulk actions, search, sort, import/export, keyboard shortcuts, and a responsive UI. Built with modern web technologies, it enables efficient task organization with real-time synchronization and seamless offline-first experience.

🎯 Key Highlights
- ✅ REST API with Express and MongoDB
- 🎨 Frontend built with Vite + React and vanilla JS modules for progressive enhancement
- 📱 Offline support using localStorage (frontend/storage.js)
- 📥 Import/Export (JSON/CSV/Text) via frontend/exportImport.js
- ⌨️ Keyboard shortcuts and help modal (frontend/keyboard.js)
- 🔔 Toast notifications (frontend/toast.js)
- 📋 Bulk operations manager (frontend/bulkOperations.js)
- 🔍 Advanced search and sorting capabilities
- 📊 Statistics dashboard for task insights
- ♿ Accessibility improvements and WCAG compliance

✨ Features
🎯 Task Management
- Create, read, update, delete tasks with rich metadata
- Task properties: title, description, due date, tags, priority levels
- Server-side validation and duplicate detection
- Task status tracking (pending, in-progress, completed)
- Quick task filtering and organization

🔍 Search & Organization
- Advanced search functionality (frontend/search.js)
- Multi-field sorting (due date, priority, creation date)
- Tag-based filtering and categorization
- Statistics dashboard with task metrics (frontend/stats.js)
- Performance optimization with skeleton loading

📊 Bulk Operations
- Select multiple tasks simultaneously
- Bulk delete, update, and status change operations
- Batch tag assignment and priority updates
- Efficient database operations for large datasets

📥 Import & Export
- Multiple export formats: JSON, CSV, Text
- Import tasks from JSON, CSV files
- Backup and restore functionality
- Data portability for external tools

⌨️ Keyboard Shortcuts & Accessibility
- Keyboard-driven navigation (frontend/keyboard.js)
- Help modal with shortcut reference (press ? key)
- ARIA labels and semantic HTML (frontend/accessibility.js)
- Screen reader compatibility
- High contrast mode support

🔄 Offline Support
- Offline persistence using localStorage (frontend/storage.js)
- Automatic sync when connection restored
- Conflict resolution for offline changes
- Service worker integration for PWA capabilities

🛡️ Data Validation
- Client-side validation (frontend/validator.js)
- Server-side input validation
- Error handling and user-friendly messages (frontend/errorHandler.js)
- CORS security and request validation

⚙️ Tech Stack
Frontend
- Framework: React 19.x
- Build Tool: Vite
- Styling: Tailwind CSS v4
- HTTP Client: Fetch/Axios (frontend/api.js)
- State Management: React Hooks
- Accessibility: WCAG 2.1 compliant components

Backend
- Runtime: Node.js 18+
- Framework: Express.js
- Database: MongoDB + Mongoose (backend/config/database.js)
- Validation: Custom validators (backend error handling)
- Security: CORS, input validation, error handling

Dev & Deployment
- Version Control: Git + GitHub
- Local dev: Node.js + MongoDB (local or Atlas)
- Build: Vite for optimized production bundles
- Environment: .env configuration files

📁 Project Structure
Task-Tracker/
├── backend/
│   ├── config/
│   │   └── database.js                # MongoDB connection & configuration
│   ├── models/
│   │   └── Task.js                    # Task schema & validation
│   ├── routes/
│   │   └── taskRoutes.js              # Task API endpoints (CRUD)
│   ├── server.js                      # Express server entrypoint
│   ├── .env                           # Environment variables (not committed)
│   ├── .env.example                   # Example environment file
│   └── package.json
│
├── frontend/
│   ├── public/                        # Static assets & images
│   ├── src/
│   │   ├── App.jsx                    # Root React component
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Tailwind imports & globals
│   ├── accessibility.js               # A11y utilities & ARIA helpers
│   ├── api.js                         # HTTP client & API calls
│   ├── bulkOperations.js              # Bulk action manager
│   ├── errorHandler.js                # Error handling utilities
│   ├── exportImport.js                # Import/Export functionality
│   ├── keyboard.js                    # Keyboard shortcuts manager
│   ├── performance.js                 # Performance monitoring
│   ├── search.js                      # Search algorithm
│   ├── skeleton.js                    # Skeleton loading states
│   ├── sort.js                        # Sorting utilities
│   ├── stats.js                       # Statistics calculations
│   ├── storage.js                     # localStorage management
│   ├── toast.js                       # Toast notification system
│   ├── validator.js                   # Client-side validation
│   ├── index.html                     # HTML template
│   ├── vite.config.js                 # Vite configuration
│   ├── eslint.config.js               # ESLint rules
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE

🚀 Installation
Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git
- Modern web browser

1. Clone repository
git clone <your-repo-url>
cd Task-Tracker

2. Backend setup
cd backend
npm install

Create `.env` file in backend:
PORT=5000
MONGODB_URI=your_mongo_connection_string
CLIENT_URL=http://localhost:5173

Start backend (development mode):
npm run dev
Backend default: http://localhost:5000

3. Frontend setup
cd ../frontend
npm install

Create `.env` file in frontend:
VITE_API_URL=http://localhost:5000/api

Start frontend (development mode):
npm run dev
Frontend default: http://localhost:5173

4. Access Application
Open browser and navigate to: **http://localhost:5173**

🎮 Usage
For Users
- **Create tasks**: Add new tasks with title, description, due date, tags, and priority
- **Manage tasks**: Edit, delete, or mark tasks as complete
- **Bulk operations**: Select multiple tasks to bulk delete or update
- **Search & filter**: Use search bar to find tasks by keywords or tags
- **Sort & organize**: Sort by due date, priority, or creation date
- **Import/Export**: Backup tasks as JSON/CSV or import from files
- **Keyboard shortcuts**: Press `?` to view all available keyboard shortcuts
- **Offline mode**: Work offline; changes sync automatically when online
- **Statistics**: View task completion rates and productivity metrics

For Developers
- **API endpoints**: Available in `backend/routes/taskRoutes.js`
- **Database seeding**: Create scripts to populate initial data
- **Environment config**: Customize settings in `.env` files
- **Server logs**: Monitor backend in development terminal

How to Contribute
- Fork the repository
- Create feature branch: `git checkout -b feature/amazing-feature`
- Commit changes: `git commit -m "Add amazing feature"`
- Push to branch: `git push origin feature/amazing-feature`
- Open a Pull Request with detailed description of changes

📸 Screenshots
(Add screenshots in `frontend/public` directory and reference here)
- Task Dashboard
- Task Creation Modal
- Bulk Operations UI
- Import/Export Dialog
- Search & Filter View
- Statistics Dashboard

👤 Author
Designed and Developed with 💖 by Arpita Singh

🔗 Connect with me:
- 📧 Email: [your-email]
- 💼 LinkedIn: [your-linkedin]
- 🐙 GitHub: [your-github]

Feel free to reach out for questions, suggestions, or collaboration!

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.