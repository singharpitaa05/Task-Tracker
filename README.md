# Task Tracker - Professional Task Management Platform

A comprehensive task management application built with modern web technologies, designed to help users efficiently organize, track, and complete their daily tasks with advanced features like real-time search, bulk operations, and data export/import capabilities.

📖 [Documentation](#-project-structure) | 🚀 [Quick Start](#-installation) | 🎯 [Features](#-features) | 💻 [Tech Stack](#️-tech-stack)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-black?logo=express)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19.x-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Latest-purple?logo=vite)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)](https://tailwindcss.com/)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [How to Contribute](#how-to-contribute)
- [Author](#-author)
- [License](#-license)

## 🌟 Overview

Task Tracker is a feature-rich task management platform that empowers users to manage their workflow effectively. The application combines a clean, intuitive user interface with robust backend infrastructure to provide a seamless task management experience. Users can create, organize, filter, search, and export their tasks with ease, while administrators have full control over the platform.

### 🎯 Key Features

- **Task CRUD Operations** - Create, read, update, and delete tasks effortlessly
- **Advanced Filtering** - Filter tasks by status (All, Pending, Completed)
- **Real-time Search** - Search tasks with instant results and highlighting
- **Bulk Operations** - Select multiple tasks and perform batch actions
- **Task Statistics** - View real-time statistics dashboard with progress tracking
- **Data Import/Export** - Import and export tasks in JSON, CSV, or text formats
- **Keyboard Shortcuts** - Productivity shortcuts for common operations
- **Offline Support** - LocalStorage caching for offline functionality
- **Responsive Design** - Mobile-friendly interface for all devices
- **Error Handling** - Comprehensive error recovery and user feedback

## ✨ Features

### 📋 Task Management

**Create & Organize Tasks**
- Add new tasks with a simple, intuitive input field
- Organize tasks with custom titles and descriptions
- Track task creation and modification timestamps
- Immediate feedback on task addition with success notifications

**Status Tracking**
- Track task progress with two status states: **Pending** and **Completed**
- Toggle task status with a single click using status checkboxes
- Visual status badges to quickly identify task states
- Automatic status updates reflected in statistics

**Task Filtering**
- Filter tasks by status: All, Pending, or Completed tasks
- Active filter indicator showing current filter state
- Smooth transitions when switching between filter views
- Batch selection automatically clears when changing filters

### 🔍 Search & Organization

**Real-time Search**
- Instant search filtering as you type task titles
- Search term highlighting in results for better visibility
- Search result counter showing matches
- Quick clear button to reset search state
- Keyboard shortcut (Ctrl+S or /) to focus search bar

**Sorting Options**
- **Newest First** - Sort by creation date (newest to oldest)
- **Oldest First** - Sort by creation date (oldest to newest)
- **A to Z** - Alphabetical ascending order
- **Z to A** - Alphabetical descending order
- **Completed First** - Group completed tasks at top
- **Pending First** - Group pending tasks at top

### 📊 Statistics Dashboard

**Real-time Statistics**
- **Total Tasks** - Count of all tasks in the system
- **Pending Tasks** - Count of tasks with pending status
- **Completed Tasks** - Count of successfully completed tasks
- **Progress Percentage** - Completion rate calculated as (Completed / Total) × 100

**Progress Visualization**
- Animated progress bar showing completion percentage
- Color-coded progress indicator based on completion rate
- Smooth number animations when statistics update
- Real-time updates reflecting task changes

### ✅ Bulk Operations

**Multiple Task Selection**
- Individual task checkboxes for selective operations
- "Select All" checkbox to quickly select all visible tasks
- Visual ring highlight for selected tasks
- Selection counter showing number of selected items

**Batch Actions**
- **Mark as Completed** - Complete multiple tasks at once
- **Mark as Pending** - Revert multiple tasks back to pending state
- **Delete Multiple** - Remove multiple tasks simultaneously
- Confirmation dialogs for destructive operations

### 💾 Data Management

**Export Tasks**
- **JSON Export** - Export tasks as JSON file for backup and re-import
- **CSV Export** - Export to CSV for use in spreadsheet applications (Excel, Google Sheets)
- **Text Export** - Export as plain text for simple viewing or printing
- Auto-generated filenames with timestamps for organization

**Import Tasks**
- Import from JSON files previously exported
- Import from CSV files with automatic format validation
- Merge option to combine imported tasks with existing data
- Replace option to overwrite existing tasks completely
- Validation to ensure imported data integrity


### 🌐 Offline Support

**LocalStorage Caching**
- Automatic local storage of tasks for offline access
- Seamless sync when connection is restored
- Fallback to cached data if API is unavailable
- User notification when working in offline mode

**Online/Offline Detection**
- Real-time connection status monitoring
- Automatic task sync when going back online
- Clear visual indicators of offline status
- Warning messages about offline limitations

### ♿ Accessibility

**Screen Reader Support**
- ARIA labels on all interactive elements
- Live regions for announcing task changes
- Semantic HTML structure for better navigation
- Keyboard navigation support throughout the application

**Focus Management**
- Visible focus indicators on all interactive elements
- Proper tab order for keyboard navigation
- Focus restoration after modal interactions
- Skip to main content functionality

### 🎨 User Interface

**Responsive Design**
- Mobile-first responsive layout
- Optimized for mobile, tablet, and desktop views
- Touch-friendly button sizes and spacing
- Adaptive grid layouts for different screen sizes

**Visual Feedback**
- Loading spinners during data operations
- Toast notifications for user actions (success, error, warning)
- Animated transitions between states
- Empty state message when no tasks exist

## ⚙️ Tech Stack

### Frontend Architecture

**React 19.x** 🛠️
- Modern JavaScript library for building user interfaces
- Component-based architecture for reusable UI elements
- Functional components with hooks for state management
- Efficient re-rendering through React's virtual DOM

**Vite** ⚙️
- Lightning-fast build tool and development server
- Native ES modules support for instant HMR (Hot Module Replacement)
- Optimized production builds with code splitting
- Minimal configuration required for quick setup

**Vanilla JavaScript Modules**
- Modular utility files for specific functionality
- `api.js` - Axios HTTP client configuration and API calls
- `storage.js` - LocalStorage wrapper for persistent data
- `validator.js` - Input validation and duplicate checking
- `search.js` - Search functionality and term highlighting
- `sort.js` - Task sorting logic for multiple sort options
- `stats.js` - Statistics calculation and formatting
- `toast.js` - Toast notification system
- `errorHandler.js` - Comprehensive error handling and logging
- `performance.js` - Performance optimization utilities (debounce, throttle)
- `accessibility.js` - Accessibility features and WCAG compliance
- `keyboard.js` - Keyboard shortcut management
- `exportImport.js` - Data import/export functionality
- `skeleton.js` - Skeleton loading states for better UX
- `bulkOperations.js` - Bulk operation management and validation

**Tailwind CSS v4** 🎨
- Utility-first CSS framework for rapid UI development
- Pre-configured color palette and responsive breakpoints
- Custom animations and transitions
- Built-in dark mode support (optional implementation)

**Axios** 🌐
- Promise-based HTTP client for API communication
- Automatic request/response interceptors
- Error handling and timeout management
- Request cancellation support

### Backend Architecture

**Node.js 18+** 🟢
- JavaScript runtime for server-side development
- Event-driven, non-blocking I/O model
- NPM ecosystem for package management
- Full compatibility with modern JavaScript features

**Express.js 5.x** 🚀
- Lightweight web application framework
- Middleware support for request processing
- Routing system for API endpoints
- Error handling and middleware chain management

**MongoDB + Mongoose** 🗄️
- MongoDB Atlas cloud database for data persistence
- Mongoose ODM for schema validation and data modeling
- Flexible schema design for task documents
- Automatic indexing for optimized queries
- Transaction support for data integrity

**Express Validator** 🔍
- Input validation and sanitization
- Custom validation rules
- Error message formatting
- Middleware integration for route protection

**CORS** 🔐
- Cross-Origin Resource Sharing configuration
- Secure API access from different domains
- Configuration for production and development environments
- Request method and header restrictions

### Development Tools

**Version Control** 🧑‍💻
- Git for distributed version control
- GitHub for repository hosting and collaboration
- Branch management for feature development
- Commit history for tracking changes

**Environment Management**
- `.env` file for sensitive configuration
- Environment variables for API keys and database URLs
- Separate development and production configurations
- Safe credential management without exposing secrets

## 📁 Project Structure

```
Task-Tracker/
├── backend/
│   ├── config/
│   │   └── database.js                    # MongoDB connection setup
│   ├── controllers/
│   │   └── taskController.js              # Task CRUD logic
│   ├── models/
│   │   └── Task.js                        # Task schema definition
│   ├── routes/
│   │   └── taskRoutes.js                  # API routes for tasks
│   ├── .env                               # Environment variables
│   ├── server.js                          # Express server entry point
│   └── package.json                       # Backend dependencies
│
├── frontend/
│   ├── public/                            # Static assets
│   ├── src/
│   │   ├── index.css                      # Tailwind CSS imports
│   │   ├── main.jsx                       # React entry point
│   │   └── App.jsx                        # Root React component
│   ├── api.js                             # Axios configuration
│   ├── errorHandler.js                    # Error handling utilities
│   ├── performance.js                     # Performance optimization
│   ├── accessibility.js                   # Accessibility features
│   ├── skeleton.js                        # Loading skeleton templates
│   ├── toast.js                           # Notification system
│   ├── validator.js                       # Input validation
│   ├── keyboard.js                        # Keyboard shortcuts
│   ├── exportImport.js                    # Data import/export
│   ├── sort.js                            # Sorting utilities
│   ├── search.js                          # Search functionality
│   ├── storage.js                         # LocalStorage wrapper
│   ├── stats.js                           # Statistics calculation
│   ├── bulkOperations.js                  # Bulk action management
│   ├── main.js                            # Main application logic
│   ├── index.html                         # HTML template
│   ├── vite.config.js                     # Vite configuration
│   ├── package.json                       # Frontend dependencies
│   └── .env                               # Frontend environment variables
│
├── .gitignore                             # Git ignore rules
├── README.md                              # Project documentation
└── LICENSE                                # MIT license file
```

## 🚀 Installation

### Prerequisites

- **Node.js** 18+ (Download from [nodejs.org](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- **MongoDB Account** (Create free account at [MongoDB Atlas](https://www.mongodb.com/))
- **Git** (Download from [git-scm.com](https://git-scm.com/))

### Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/Task-Tracker.git

# Navigate to project directory
cd Task-Tracker
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

**Create `.env` file in backend directory:**

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URI=


# CORS Configuration
CLIENT_URL=http://localhost:5173
```

**Start backend server:**

```bash
npm run dev
```

Backend server runs on: `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

**Create `.env` file in frontend directory:**

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

**Start frontend development server:**

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Step 4: Access Application

Open your browser and navigate to:
```
http://localhost:5173
```

The application should load with the full task management interface ready to use.

## 🎮 Usage

### For Users

**Getting Started**
1. **Create Task** - Type task title in input field and click "Add Task" or press Enter
2. **View Tasks** - All tasks appear in the task list below automatically
3. **Mark Complete** - Click checkbox next to task or status badge to toggle completion
4. **Edit Task** - Click pencil icon to edit task title inline
5. **Delete Task** - Click trash icon to remove single task

**Organization Features**
1. **Filter Tasks** - Click filter buttons to show All, Pending, or Completed tasks
2. **Search Tasks** - Use search bar to find tasks by title (Ctrl+S or /)
3. **Sort Tasks** - Select sort option to organize by date, alphabetically, or status
4. **Bulk Select** - Check individual tasks or use "Select All" for batch operations
5. **Bulk Actions** - Perform Mark Complete, Mark Pending, or Delete on multiple tasks

**Data Management**
1. **Export Tasks** - Click Export button to download tasks as JSON, CSV, or text
2. **Import Tasks** - Click Import button to upload previously exported task files
3. **Offline Usage** - Tasks automatically sync to local storage for offline access
4. **View Statistics** - Dashboard shows Total, Pending, Completed, and Progress percentage

**Productivity Tips**
- Use keyboard shortcuts for faster navigation (see Keyboard Shortcuts section)
- Leverage bulk operations for quick task management
- Regularly export tasks for backup purposes
- Monitor progress percentage in statistics dashboard

### For Developers

**API Integration**
- Backend API runs on port 5000
- RESTful endpoints for task CRUD operations
- JWT authentication for protected routes
- Axios configured for automatic error handling

**Customization**
- Modify Tailwind CSS classes for custom styling
- Add new validation rules in `validator.js`
- Extend keyboard shortcuts in `keyboard.js`
- Implement additional sorting options in `sort.js`

## How to Contribute

We welcome contributions to improve Task Tracker! Here's how to contribute:

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork locally
git clone https://github.com/your-username/Task-Tracker.git
cd Task-Tracker

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes
# Edit files as needed for your feature

# 5. Commit your changes
git commit -m "Add amazing feature: brief description"

# 6. Push to your branch
git push origin feature/amazing-feature

# 7. Open a Pull Request on GitHub
# Provide clear description of changes and improvements
```

### Contribution Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Test your changes before submitting
- Update documentation for new features
- Ensure no sensitive information in commits

## 👤 Author

**Designed and Developed with 💖 by Arpita Singh**

### 🔗 Connect with me:

- **📧 Email** - [singharpita.05march@gmail.com](mailto:singharpita.05march@gmail.com)
- **💼 LinkedIn** - [singharpitaa05](https://www.linkedin.com/in/singharpitaa05)
- **🐙 GitHub** - [singharpitaa05](https://github.com/singharpitaa05)

📬 Feel free to reach out for questions, suggestions, or collaboration opportunities!

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.
