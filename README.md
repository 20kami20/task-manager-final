# Task Manager - Full Stack Application

A complete task management application with user authentication, role-based access control, and email notifications.

## Features

### Core Features
- User registration and authentication with JWT
- Email verification system
- Password reset functionality
- Role-Based Access Control (RBAC): Admin, Moderator, User
- Task CRUD operations
- Task filtering and sorting
- Task assignment (Admin/Moderator only)
- Email notifications for task assignments
- User profile management
- Admin panel for user and task management
- Admin: Full access to all features, can manage users and assign tasks
- Moderator: Can view all tasks and assign tasks
- User: Can only manage their own tasks
- Email verification on registration
- Password reset emails
- Task assignment notifications
- Uses SendGrid/Mailgun (configured via environment variables)

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for email service
- Joi for validation

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- React Toastify for notifications
- Date-fns for date formatting

## Project Structure

```
task-manager/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── emailService.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── taskRoutes.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── PrivateRoute.js
    │   │   └── AdminRoute.js
    │   ├── contexts/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── Profile.js
    │   │   └── AdminPanel.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── .env.example
    ├── .gitignore
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- SendGrid/Mailgun account for email service

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```bash
cp .env.example .env
```

4. Configure environment variables in .env:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
FRONTEND_URL=http://localhost:3000
<!-- SMTP configuration removed; email sending disabled by default. Add SMTP_* vars if enabling email service. -->
```

5. Start the server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```bash
cp .env.example .env
```

4. Configure environment variable:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm start
```

Frontend will run on http://localhost:3000

## API Documentation

### Authentication Endpoints (Public)

#### Register
- **POST** `/api/auth/register`
- Body: `{ username, email, password }`
- Response: `{ success, message, token, user }`

#### Login
- **POST** `/api/auth/login`
- Body: `{ email, password }`
- Response: `{ success, token, user }`

<!-- Email verification removed: no verify-email endpoint -->

#### Forgot Password
- **POST** `/api/auth/forgot-password`
- Body: `{ email }`
- Response: `{ success, message }`

#### Reset Password
- **POST** `/api/auth/reset-password`
- Body: `{ token, password }`
- Response: `{ success, message }`

### User Endpoints (Private)

#### Get Profile
- **GET** `/api/users/profile`
- Headers: `Authorization: Bearer <token>`
- Response: `{ success, user }`

#### Update Profile
- **PUT** `/api/users/profile`
- Headers: `Authorization: Bearer <token>`
- Body: `{ username?, email? }`
- Response: `{ success, message, user }`

#### Get All Users (Admin/Moderator)
- **GET** `/api/users`
- Headers: `Authorization: Bearer <token>`
- Response: `{ success, count, users }`

#### Update User Role (Admin only)
- **PUT** `/api/users/:userId/role`
- Headers: `Authorization: Bearer <token>`
- Body: `{ role }`
- Response: `{ success, message, user }`

#### Delete User (Admin only)
- **DELETE** `/api/users/:userId`
- Headers: `Authorization: Bearer <token>`
- Response: `{ success, message }`

### Task Endpoints (Private)

#### Get Task Statistics
- **GET** `/api/tasks/stats`
- Headers: `Authorization: Bearer <token>`
- Response: `{ success, stats }`

#### Create Task
- **POST** `/api/tasks`
- Headers: `Authorization: Bearer <token>`
- Body: `{ title, description?, status?, dueDate, priority?, tags? }`
- Response: `{ success, message, task }`

#### Get All Tasks
- **GET** `/api/tasks?status=&priority=&sort=`
- Headers: `Authorization: Bearer <token>`
- Response: `{ success, count, tasks }`

#### Get Task by ID
- **GET** `/api/tasks/:id`
- Headers: `Authorization: Bearer <token>`
- Response: `{ success, task }`

#### Update Task
- **PUT** `/api/tasks/:id`
- Headers: `Authorization: Bearer <token>`
- Body: `{ title?, description?, status?, dueDate?, priority?, tags? }`
- Response: `{ success, message, task }`

#### Delete Task
- **DELETE** `/api/tasks/:id`
- Headers: `Authorization: Bearer <token>`
- Response: `{ success, message }`

#### Assign Task (Admin/Moderator)
- **POST** `/api/tasks/:id/assign`
- Headers: `Authorization: Bearer <token>`
- Body: `{ userId }`
- Response: `{ success, message, task }`

## Deployment

### Backend Deployment (Render/Railway)

1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables from .env
6. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variable: `REACT_APP_API_URL=<deployed-backend-url>/api`
5. Deploy
