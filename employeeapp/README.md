# Employee Management System

## Overview

This project is a **CRUD-based Employee Management System** with **Admin User Functionality** built using **MongoDB, Express.js, React.js, and Node.js (MERN Stack)**. It allows admins to manage employee records, including adding, updating, deleting, and viewing employee details.

## Features

- **User Authentication**: Google OAuth for secure login.
- **Admin Panel**: Only admins can perform CRUD operations.
- **Employee Management**: Add, update, delete, and view employee data.
- **Profile Image Upload**: Store employee profile pictures in MongoDB.
- **JWT Authentication**: Secure API endpoints with tokens.

## Tech Stack

- **Frontend**: React.js (with React Router)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: Google OAuth 2.0, JWT
- **Hosting**: Render (Backend), Vercel (Frontend)

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/kashyapanjali/ReactJavaScript.git
cd https://github.com/kashyapanjali/ReactJavaScript/tree/main/employeeapp
```

### 2. Set Up Environment Variables

Create a `.env` file in both `backend` and `frontend` directories.

#### **Backend (.env)**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Install Dependencies

#### **Backend**

```sh
cd backend
npm install
```

#### **Frontend**

```sh
cd frontend
npm install
```

### 4. Run the Application

#### **Backend**

```sh
npm start
```

#### **Frontend**

```sh
npm start
```

## API Endpoints

### **Authentication Routes**

- `POST /auth/google` - Google OAuth login
- `POST /auth/logout` - Logout user

### **Employee CRUD Routes**

- `GET /employees` - Get all employees
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Add new employee (Admin only)
- `PUT /employees/:id` - Update employee details (Admin only)
- `DELETE /employees/:id` - Delete employee (Admin only)

## Deployment

- **Backend**: Deployed on Render
- **Frontend**: Deploy on Netlify

## Admin Access

Only admin users can modify employee records. Admin emails are stored in `.env`:

```env
ADMIN_EMAILS=anjalikashyap9608@gmail.com,anjali.official7061@gmail.com
```

**Developed by Anjali Kashyap**
