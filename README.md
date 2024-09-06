# 👤User Management Application

![userManagement1](https://github.com/user-attachments/assets/eaf29120-8f84-4fe4-a2a2-778320adb948)

![userManagement2](https://github.com/user-attachments/assets/b9a9c85f-ba69-4480-9cb9-4a06aacc79ac)

## Overview
This application is designed to manage users using the JSONPlaceholder API. It implements CRUD (Create, Read, Update, Delete) operations to interact with user data.

## Features
💡Fetch Users: Display a list of users fetched from the JSONPlaceholder API, showing basic info like name, email, and phone.

💡Create User: A form to create a new user, simulating a POST request to the API.

💡Update User: Edit existing user details with pre-filled data, simulating a PUT request to the API.

💡Delete User: Remove users with a DELETE request simulation.

#### Note : `POST` , `PUT` , `DELETE` methods are not supported by this JSONPlaceholder API. But I have implemented the logic for that . 

## ⚙️ Technologies Used
React

React Router

Axios

JSONPlaceholder API

Tailwind CSS 

### Clone the repository

```bash
Copy code
git clone <repository-url>
cd <repository-directory>
Install dependencies
```
### Setup and Installation
```bash
 Copy code
 npm install
 Start the development server
```

```bash
Copy code
npm start
The application will be available at http://localhost:3000.
```

# Endpoints
The application uses the following API endpoints:

Fetch Users: ` GET /users`

Add User:` POST /users`

Delete User:` DELETE /users/{id}`

Fetch User by ID:` GET /users/{id}`

Update User: PUT` /users/{id}`

# Code Structure

`src/components/` - Contains React components for the application.

`src/redux/api/` - Contains API service functions using Axios.

`src/App.js` - Main application component with routing.

## ➕ Additional Features

Loading Skeleton: Displayed during API requests.

Error Handling: Proper notifications for API request failures.

Responsive Design: Ensures good appearance on both desktop and mobile.

# Deployment

The application is hosted on Vercel and can be accessed via the provided live URL.

## ☎️ Contact
For any questions, please contact uzerqureshi26@gmail.com.
