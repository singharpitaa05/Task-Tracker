# Task Tracker - AI-Powered Task Management & Productivity Platform
Comprehensive Task Management Platform with AI-Driven Insights, Progress Analytics, and Smart Scheduling.

📖 [Documentation](#) | 🚀 [Quick Start](#installation) | 🎯 [Features](#-features)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.x-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Latest-purple?logo=vite)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![Google Generative AI](https://img.shields.io/badge/Google-Gemini-yellow?logo=google)](https://gemini.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)](https://tailwindcss.com/)

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [How to Contribute](#how-to-contribute)
- [Screenshots](#-screenshots)
- [Author](#-author)
- [License](#-license)

## 🌟 Overview
Task Tracker is a cutting-edge task management platform that combines AI-powered insights, intelligent task scheduling, and comprehensive progress analytics to help users efficiently manage their workflow and boost productivity. Built with modern web technologies, it provides real-time notifications, personalized task recommendations, and detailed productivity analytics.

### 🎯 Key Highlights
- **AI-Powered Task Insights** with Gemini AI integration
- **Smart Task Scheduling** with intelligent priority management
- **Real-Time Progress Tracking** using advanced analytics
- **Intelligent Task Recommendations** based on user patterns
- **Advanced Task Analytics** with behavioral analysis
- **Task Category Management** with custom organization
- **Subtask Support** for complex project management
- **Admin Dashboard** for platform management
- **User Preference Management** for customized experience
- **JWT-based Secure Authentication**

## ✨ Features

### 🔐 Authentication & User Management
- JWT-based secure authentication with bcryptjs encryption
- User registration and login with validation
- Profile customization (username, bio, preferences)
- Role-based access control (User/Admin)
- Secure session management
- User preference storage and retrieval

### 📋 Task Management
- **Create & Organize**: Create tasks with titles, descriptions, and due dates
- **Priority Levels**: Assign priority (Low, Medium, High, Urgent) to tasks
- **Task Categories**: Organize tasks by custom categories
- **Subtask Support**: Break down complex tasks into smaller subtasks
- **Status Tracking**: Track task progress (To Do, In Progress, Completed)
- **Due Date Management**: Set and manage task deadlines
- **Task Tags**: Add custom tags for better organization
- **Recurring Tasks**: Set up tasks that repeat automatically

### 🤖 AI-Powered Features
- **Gemini AI Integration**: Get AI-powered task suggestions and insights
- **Smart Recommendations**: AI recommends tasks based on your patterns
- **Task Optimization**: AI suggests better task organization
- **Deadline Predictions**: AI predicts optimal completion timelines
- **Priority Assistance**: AI helps determine task priorities
- **Productivity Insights**: AI analyzes your productivity patterns

### 📊 Task Analytics & History
- **Task History**: Track all past and completed tasks
- **Performance Statistics**: Analyze your productivity metrics
- **Completion Rates**: Monitor task completion statistics
- **Time Tracking**: Track time spent on tasks
- **Detailed Reports**: Comprehensive task analytics
- **Progress Visualization**: Visual representation of your productivity growth
- **Productivity Trends**: Analyze productivity patterns over time

### 🔔 Notifications & Reminders
- **Due Date Alerts**: Get notified before task deadlines
- **Real-Time Updates**: Live notification system
- **Task Reminders**: Customizable reminder notifications
- **Priority Alerts**: Alerts for high-priority tasks
- **Completion Notifications**: Celebrate completed tasks
- **Event Tracking**: Track important task events

### ⚙️ Admin Panel
- **User Management**: Monitor and manage registered users
- **Task Management**: View and manage all platform tasks
- **Category Management**: Create and manage task categories
- **Admin Tools**: Promote users to admin status
- **Content Control**: Full control over task database
- **Platform Analytics**: Monitor platform usage and metrics
- **System Settings**: Configure platform settings

## ⚙️ Tech Stack

### Frontend
- **Framework**: React 19.x 🛠️
- **Build Tool**: Vite ⚙️
- **Styling**: Tailwind CSS v4 🎨
- **Routing**: React Router DOM 🗺️
- **HTTP Client**: Axios 🌐
- **Icons**: Lucide React 🌟
- **Form Handling**: React Hook Form (optional) 📋
- **Charts**: Chart.js or Recharts 📊

### Backend
- **Runtime**: Node.js 18+ 🟢
- **Framework**: Express.js 5.x 🚀
- **Database**: MongoDB + Mongoose 🗄️
- **Authentication**: JWT (jsonwebtoken) 🔑
- **AI Integration**: Google Generative AI (Gemini) 🤖
- **Validation**: Express Validator 🔍
- **Security**: Bcryptjs, CORS 🔒
- **Task Scheduling**: Node-cron or Bull (optional) ⏰

### DevOps & Deployment
- **Frontend**: Vercel 🌐
- **Backend**: Render 🚀
- **Database**: MongoDB Atlas 🗄️
- **Version Control**: Git + GitHub 🧑‍💻

## 📁 Project Structure
```
Task-Tracker/
├── backend/
│   ├── config/
│   │   └── db.js                          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js              # Authentication logic
│   │   ├── userController.js              # User management
│   │   ├── taskController.js              # Task CRUD operations
│   │   ├── subtaskController.js           # Subtask management
│   │   ├── categoryController.js          # Category management
│   │   ├── aiInsightsController.js        # AI insights handling
│   │   ├── analyticsController.js         # Analytics and statistics
│   │   ├── adminController.js             # Admin operations
│   │   ├── notificationController.js      # Notification handling
│   │   └── preferencesController.js       # User preferences
│   ├── middleware/
│   │   └── authMiddleware.js              # JWT verification
│   ├── models/
│   │   ├── User.js                        # User schema
│   │   ├── Task.js                        # Task schema
│   │   ├── Subtask.js                     # Subtask schema
│   │   ├── Category.js                    # Category schema
│   │   ├── Notification.js                # Notification schema
│   │   └── UserPreference.js              # User preference schema
│   ├── routes/
│   │   ├── authRoutes.js                  # /api/auth/*
│   │   ├── userRoutes.js                  # /api/user/*
│   │   ├── taskRoutes.js                  # /api/tasks/*
│   │   ├── subtaskRoutes.js               # /api/subtasks/*
│   │   ├── categoryRoutes.js              # /api/categories/*
│   │   ├── aiInsightsRoutes.js            # /api/ai-insights/*
│   │   ├── analyticsRoutes.js             # /api/analytics/*
│   │   ├── adminRoutes.js                 # /api/admin/*
│   │   ├── notificationRoutes.js          # /api/notifications/*
│   │   └── preferencesRoutes.js           # /api/preferences/*
│   ├── services/
│   │   ├── aiService.js                   # Google Generative AI integration
│   │   ├── taskScheduler.js               # Task scheduling service
│   │   └── notificationService.js         # Notification processing
│   ├── utils/
│   │   └── generateToken.js               # JWT token generation
│   ├── .env                               # Environment variables
│   ├── .env.example                       # Example environment file
│   ├── server.js                          # Entry point
│   ├── seedCategories.js                  # Sample categories seeding
│   ├── seedTasks.js                       # Sample tasks seeding
│   ├── makeAdmin.js                       # Admin user creation script
│   └── package.json
│
├── frontend/
│   ├── public/                            # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx         # Protected route wrapper
│   │   │   ├── TaskCard.jsx               # Task card component
│   │   │   ├── TaskForm.jsx               # Task creation form
│   │   │   ├── TaskFilter.jsx             # Task filtering component
│   │   │   └── TaskModal.jsx              # Task detail modal
│   │   ├── config/
│   │   │   └── api.js                     # Axios API configuration
│   │   ├── context/
│   │   │   └── AuthContext.jsx            # Authentication context
│   │   ├── pages/
│   │   │   ├── Landing.jsx                # Landing page
│   │   │   ├── Login.jsx                  # Login page
│   │   │   ├── Register.jsx               # Registration page
│   │   │   ├── ProfileSetup.jsx           # Profile setup page
│   │   │   ├── Dashboard.jsx              # Main dashboard
│   │   │   ├── Tasks.jsx                  # Tasks management page
│   │   │   ├── TaskDetail.jsx             # Individual task detail
│   │   │   ├── Categories.jsx             # Category management
│   │   │   ├── Analytics.jsx              # Analytics & statistics
│   │   │   ├── AIInsights.jsx             # AI insights page
│   │   │   ├── Settings.jsx               # User settings page
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx     # Admin dashboard
│   │   │       ├── UserManagement.jsx     # Manage users
│   │   │       └── TaskManagement.jsx     # Manage all tasks
│   │   ├── App.jsx                        # Root component
│   │   ├── main.jsx                       # Entry point
│   │   └── index.css                      # Tailwind imports
│   ├── .env                               # Environment variables
│   ├── vite.config.js                     # Vite configuration
│   ├── eslint.config.js                   # ESLint configuration
│   ├── index.html                         # HTML template
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
```

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB (Local or Atlas)
- Google Generative AI API Key
- Git & GitHub
- Modern web browser

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/Task-Tracker.git
cd Task-Tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend:
```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=

# Authentication
JWT_SECRET=

# Google Generative AI
GEMINI_API_KEY=

# CORS
CLIENT_URL=http://localhost:5173
```

**Get Google Generative AI API Key:**
1. Go to [Google AI Studio](https://ai.google.dev/)
2. Click "Create API Key"
3. Copy your API key and paste in `.env`

Start backend:
```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Seed Categories & Tasks (Optional)
```bash
node seedCategories.js
node seedTasks.js
```

### 4. Create Admin User (Optional)
```bash
node makeAdmin.js
```

### 5. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 6. Access Application
Open browser: `http://localhost:5173`

## 🎮 Usage

### For Users
- **Sign Up**: Create a new account with email and password
- **Profile Setup**: Complete your profile with basic information
- **Create Tasks**: Add new tasks with titles, descriptions, and due dates
- **Organize**: Use categories and tags to organize your tasks
- **Track Progress**: Monitor task completion and productivity
- **Get AI Insights**: Receive AI-powered recommendations and insights
- **View Analytics**: Check your productivity analytics and reports
- **Manage Reminders**: Set up notifications and reminders for tasks

### For Admins
- **Access Admin Dashboard**: Navigate to `/admin` (requires admin role)
- **Manage Users**: View, update, or manage user accounts
- **Manage Tasks**: View and monitor all platform tasks
- **Manage Categories**: Create and organize task categories
- **View Statistics**: Monitor platform usage and user activity
- **Make New Admins**: Promote users to admin status
- **System Control**: Full control over platform content and settings

## How to Contribute
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "Add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📸 Screenshots
### Landing Page
[Add landing page screenshots here]

### Dashboard & Task Management
[Add dashboard screenshots here]

### Analytics & Insights
[Add analytics screenshots here]

### Admin Panel
[Add admin panel screenshots here]

## 👤 Author
Designed and Developed with 💖 by **Your Name**

### 🔗 Connect with me:
- 📧 [Email](mailto:youremail@example.com)
- 💼 [LinkedIn](https://linkedin.com/in/yourprofile)
- 🐙 [GitHub](https://github.com/yourusername)

📬 Feel free to reach out for questions, suggestions, or collaboration!

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.