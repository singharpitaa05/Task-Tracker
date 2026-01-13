# Task-Tracker

Lightweight, professional task management web app with offline support, bulk operations, import/export, keyboard shortcuts, and a clean React + Vite frontend backed by an Express + MongoDB API.

<div align="center">

[📖 Documentation](#-overview) | [🚀 Quick Start](#-installation) | [🎯 Features](#-features)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.x-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-latest-646CFF)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-black)](https://expressjs.com/)

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [How to Contribute](#how-to-contribute)
- [Screenshots](#-screenshots)
- [Author](#-author)
- [License](#-license)

## 🌟 Overview

**Task-Tracker** is a simple, production-ready task management app focused on usability, offline resilience, and developer ergonomics. It provides comprehensive CRUD operations, bulk actions, advanced search, sorting, import/export functionality, keyboard shortcuts, and a responsive UI. Built with modern web technologies, it enables efficient task organization with real-time synchronization and seamless offline-first experience.

### 🎯 Key Highlights

- **✅ REST API** with Express.js and MongoDB
- **🎨 Modern Frontend** built with Vite + React and vanilla JS modules
- **📱 Offline Support** using localStorage for seamless offline experience
- **📥 Import/Export** (JSON/CSV/Text) for data portability
- **⌨️ Keyboard Shortcuts** and interactive help modal
- **🔔 Smart Notifications** with toast system
- **📋 Bulk Operations** for efficient task management
- **🔍 Advanced Search** and multi-field sorting
- **📊 Statistics Dashboard** for productivity insights
- **♿ Accessibility** with WCAG 2.1 compliance

## ✨ Features

### 🎯 Task Management

- **Full CRUD Operations**: Create, read, update, delete tasks with rich metadata
- **Task Properties**: Title, description, due date, tags, priority levels
- **Server-Side Validation**: Duplicate detection and comprehensive validation
- **Task Status Tracking**: Pending, in-progress, and completed states
- **Quick Filtering**: Organize and filter tasks by various criteria

### 🔍 Search & Organization

- **Advanced Search**: Intelligent search algorithm (frontend/search.js)
- **Multi-Field Sorting**: Sort by due date, priority, or creation date
- **Tag-Based Filtering**: Categorize and organize tasks by tags
- **Statistics Dashboard**: View task metrics and productivity insights
- **Performance Optimization**: Skeleton loading for smooth UX

### 📊 Bulk Operations

- **Multi-Select**: Select multiple tasks simultaneously
- **Batch Actions**: Bulk delete, update, and status changes
- **Tag Assignment**: Assign tags to multiple tasks at once
- **Priority Updates**: Update priority levels in bulk
- **Efficient Database**: Optimized operations for large datasets

### 📥 Import & Export

- **Multiple Formats**: Export as JSON, CSV, or Text
- **Import Functionality**: Import tasks from JSON and CSV files
- **Backup & Restore**: Complete data backup capabilities
- **Data Portability**: Export tasks for use in external tools

### ⌨️ Keyboard Shortcuts & Accessibility

- **Keyboard Navigation**: Fully keyboard-driven navigation
- **Help Modal**: Press `?` key to view shortcut reference
- **ARIA Labels**: Semantic HTML with accessibility attributes
- **Screen Reader**: Full screen reader compatibility
- **High Contrast**: Support for high contrast mode

### 🔄 Offline Support

- **Persistent Storage**: Offline persistence using localStorage
- **Auto-Sync**: Automatic sync when connection restored
- **Conflict Resolution**: Smart handling of offline changes
- **PWA Ready**: Service worker integration for PWA capabilities

### 🛡️ Data Validation

- **Client-Side Validation**: Comprehensive input validation
- **Server-Side Validation**: Backend validation for all requests
- **Error Handling**: User-friendly error messages
- **CORS Security**: Protected API endpoints

## ⚙️ Tech Stack

### Frontend

```
Framework: React 19.x 🛠️
Build Tool: Vite ⚙️
Styling: Tailwind CSS v4 🎨
HTTP Client: Fetch API 🌐
State Management: React Hooks 📦
Accessibility: WCAG 2.1 Compliant ♿
```

### Backend

```
Runtime: Node.js 18+ 🟢
Framework: Express.js 5.x 🚀
Database: MongoDB + Mongoose 🗄️
Validation: Custom Validators 🔒
Security: CORS, Input Validation 🛡️
```

### DevOps & Deployment

```
Version Control: Git + GitHub 🧑‍💻
Build: Vite for Optimized Bundles ⚙️
Environment: .env Configuration 🔑
```

## 📁 Project Structure

```
Task-Tracker/
├── backend/
│   ├── config/
│   │   └── database.js                    # MongoDB connection & config
│   ├── models/
│   │   └── Task.js                        # Task schema & validation
│   ├── routes/
│   │   └── taskRoutes.js                  # Task API endpoints (CRUD)
│   ├── .env                               # Environment variables
│   ├── .env.example                       # Example environment file
│   ├── server.js                          # Express server entrypoint
│   └── package.json
│
├── frontend/
│   ├── public/                            # Static assets & images
│   ├── src/
│   │   ├── App.jsx                        # Root React component
│   │   ├── main.jsx                       # React entry point
│   │   └── index.css                      # Tailwind imports & globals
│   ├── accessibility.js                   # A11y utilities & ARIA helpers
│   ├── api.js                             # HTTP client & API calls
│   ├── bulkOperations.js                  # Bulk action manager
│   ├── errorHandler.js                    # Error handling utilities
│   ├── exportImport.js                    # Import/Export functionality
│   ├── keyboard.js                        # Keyboard shortcuts manager
│   ├── performance.js                     # Performance monitoring
│   ├── search.js                          # Search algorithm
│   ├── skeleton.js                        # Skeleton loading states
│   ├── sort.js                            # Sorting utilities
│   ├── stats.js                           # Statistics calculations
│   ├── storage.js                         # localStorage management
│   ├── toast.js                           # Toast notification system
│   ├── validator.js                       # Client-side validation
│   ├── index.html                         # HTML template
│   ├── vite.config.js                     # Vite configuration
│   ├── eslint.config.js                   # ESLint rules
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
```

## 🚀 Installation

### Prerequisites

- Node.js v18+ and npm/yarn
- MongoDB (Local or MongoDB Atlas)
- Git & GitHub
- Modern web browser

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd Task-Tracker
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-tracker

# Client Configuration
CLIENT_URL=http://localhost:5173
```

**Start backend** (development mode):

```bash
npm run dev
```

Backend runs on: **http://localhost:5000**

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file in frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

**Start frontend** (development mode):

```bash
npm run dev
```

Frontend runs on: **http://localhost:5173**

### 4. Access Application

Open your browser and navigate to: **http://localhost:5173**

## 🎮 Usage

### For Users

- **Create Tasks**: Add new tasks with title, description, due date, tags, and priority
- **Manage Tasks**: Edit, delete, or mark tasks as complete
- **Bulk Operations**: Select multiple tasks to bulk delete or update
- **Search & Filter**: Use search bar to find tasks by keywords or tags
- **Sort & Organize**: Sort by due date, priority, or creation date
- **Import/Export**: Backup tasks as JSON/CSV or import from files
- **Keyboard Shortcuts**: Press `?` to view all available keyboard shortcuts
- **Offline Mode**: Work offline; changes sync automatically when online
- **Statistics**: View task completion rates and productivity metrics

### For Developers

- **API Endpoints**: Available in `backend/routes/taskRoutes.js`
- **Database Seeding**: Create scripts to populate initial data
- **Environment Config**: Customize settings in `.env` files
- **Server Logs**: Monitor backend in development terminal
- **Module System**: Use frontend JS modules for progressive enhancement

## How to Contribute

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "Add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request with detailed description of changes

## 📸 Screenshots

(Add screenshots in `frontend/public` directory and reference here)

- **Task Dashboard**: Main task management interface
- **Task Creation Modal**: Task input dialog with validation
- **Bulk Operations UI**: Multi-select and batch action interface
- **Import/Export Dialog**: Data import/export functionality
- **Search & Filter View**: Advanced search and filtering interface
- **Statistics Dashboard**: Productivity metrics and insights

## 👤 Author

Designed and Developed with 💖 by **Arpita Singh**

🔗 **Connect with me:**

- 📧 [Email](mailto:your-email@example.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/your-profile)
- 🐙 [GitHub](https://github.com/your-github)

📬 Feel free to reach out for questions, suggestions, or collaboration!

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.