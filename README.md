# Task Manager API

A full-featured RESTful API for managing tasks built with Node.js, Express, and MongoDB.

## 📋 Project Overview

The Task Manager API allows users to create, manage, and organize their tasks efficiently. It includes user authentication, role-based access control, and email notifications.

### Features

- ✅ User registration and authentication with JWT
- ✅ Create, read, update, and delete tasks
- ✅ Task filtering by status and priority
- ✅ Role-based access control (Admin & User roles)
- ✅ Email notifications (Welcome emails and task reminders)
- ✅ Password encryption with bcrypt
- ✅ Input validation and error handling
- ✅ MongoDB database integration

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd task-manager-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory and add:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your_sendgrid_api_key
EMAIL_FROM=noreply@taskmanager.com
```

4. **Start the server**

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints (Public)

#### Register a New User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### User Endpoints (Private)

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Update User Profile
```http
PUT /users/profile
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "username": "johnupdated",
  "email": "johnupdated@example.com",
  "password": "newpassword123"
}
```

---

### Task Endpoints (Private)

#### Create a Task
```http
POST /tasks
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "dueDate": "2024-02-20",
  "priority": "high",
  "status": "pending"
}
```

**Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "status": "pending",
    "dueDate": "2024-02-20T00:00:00.000Z",
    "priority": "high",
    "user": "64a1b2c3d4e5f6g7h8i9j0k1",
    "createdAt": "2024-02-11T10:30:00.000Z",
    "updatedAt": "2024-02-11T10:30:00.000Z"
  }
}
```

#### Get All Tasks
```http
GET /tasks
Authorization: Bearer <token>
```

**Query Parameters:**
- `status`: Filter by status (pending, in-progress, completed)
- `priority`: Filter by priority (low, medium, high)
- `sortBy`: Sort by field (dueDate, priority, createdAt)

**Example:**
```http
GET /tasks?status=pending&priority=high&sortBy=dueDate
```

**Response:**
```json
{
  "count": 5,
  "tasks": [
    {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API docs",
      "status": "pending",
      "dueDate": "2024-02-20T00:00:00.000Z",
      "priority": "high",
      "user": "64a1b2c3d4e5f6g7h8i9j0k1",
      "createdAt": "2024-02-11T10:30:00.000Z",
      "updatedAt": "2024-02-11T10:30:00.000Z"
    }
  ]
}
```

#### Get Single Task
```http
GET /tasks/:id
Authorization: Bearer <token>
```

#### Update Task
```http
PUT /tasks/:id
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "completed",
  "description": "Updated description"
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

**Note:** Admin users can delete any task. Regular users can only delete their own tasks.

---

## 🔐 Role-Based Access Control (RBAC)

The application supports two user roles:

### User Role (Default)
- Create, read, update, and delete their own tasks
- Update their own profile
- Cannot delete other users' tasks

### Admin Role
- All user permissions
- Can delete any user's task
- Full system access

To set a user as admin, manually update the role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

---

## 📧 Email Features

The application sends automated emails using SMTP:

1. **Welcome Email** - Sent when a new user registers
2. **Task Reminders** - Can be sent for upcoming tasks (implement a scheduled job)

### Email Configuration

Use SendGrid, Mailgun, or any SMTP service:

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your_api_key
EMAIL_FROM=noreply@taskmanager.com
```

---

## 🗂️ Project Structure

```
task-manager-project/
├── config/
│   ├── database.js          # MongoDB connection
│   └── emailService.js      # Email functionality
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User management
│   └── taskController.js    # Task management
├── middleware/
│   ├── authMiddleware.js    # JWT & RBAC
│   ├── validation.js        # Input validation
│   └── errorHandler.js      # Error handling
├── models/
│   ├── User.js              # User schema
│   └── Task.js              # Task schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── userRoutes.js        # User endpoints
│   └── taskRoutes.js        # Task endpoints
├── .env.example             # Environment template
├── .gitignore
├── package.json
├── server.js                # Entry point
└── README.md
```

---

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **Validation:** express-validator
- **Email:** Nodemailer
- **Environment:** dotenv

---

## 🧪 Testing the API

### Using Postman or Thunder Client

1. **Register a user** - POST `/api/auth/register`
2. **Login** - POST `/api/auth/login` (save the token)
3. **Create a task** - POST `/api/tasks` (add token to Authorization header)
4. **Get all tasks** - GET `/api/tasks`
5. **Update a task** - PUT `/api/tasks/:id`
6. **Delete a task** - DELETE `/api/tasks/:id`

### Authorization Header Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📸 Screenshots

### 1. User Registration
![User Registration](screenshots/register.png)
*New users can register with username, email, and password. Passwords are automatically hashed.*

### 2. User Login
![User Login](screenshots/login.png)
*Users receive a JWT token upon successful login.*

### 3. Create Task
![Create Task](screenshots/create-task.png)
*Authenticated users can create tasks with title, description, due date, and priority.*

### 4. Get All Tasks
![Get All Tasks](screenshots/get-tasks.png)
*Users can view all their tasks with filtering and sorting options.*

### 5. Update Task
![Update Task](screenshots/update-task.png)
*Tasks can be updated (e.g., mark as completed).*

### 6. Delete Task
![Delete Task](screenshots/delete-task.png)
*Users can delete their own tasks. Admins can delete any task.*

### 7. Get User Profile
![User Profile](screenshots/profile.png)
*Users can view and update their profile information.*

---

## 🚀 Deployment

### Deploy to Render

1. Create a new account on [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure build settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables from `.env` file
6. Deploy!

### Deploy to Railway

1. Sign up at [Railway](https://railway.app)
2. Create new project from GitHub repo
3. Add environment variables
4. Railway will auto-deploy

---

## ⚠️ Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

**Error Response Format:**
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

---

## 👥 Team Members

- **Member 1:** Backend Infrastructure & Authentication
- **Member 2:** Task Management & Deployment

---

## 📝 License

This project is created for educational purposes as part of the Web Technologies 2 course.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For questions or issues, please contact the development team or create an issue in the repository.

---

**Developed with ❤️ by [Your Team Name]**
