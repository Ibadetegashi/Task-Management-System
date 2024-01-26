# Task-Management-System

## Overview

This project is a Task Management System that provides a set of API endpoints for creating, updating, deleting, and retrieving tasks. Additionally, it includes functionality for task assignment, allowing tasks to be assigned to specific users, and task status updates, enabling the tracking of task progress.
### Frontend Features
- Task Operations:

- View All Tasks: Navigate to http://localhost:4200/tasks to see a comprehensive and organized list of all tasks.
- Create Task: Visit http://localhost:4200/task/create to add a new task.
- Edit Task: Access http://localhost:4200/task/edit/12 (replace "12" with the actual task ID) to modify the details of a specific task.
- Assign Task to a User: Implement functionality to assign a task to a specific user.
- Set Task Status: Enable users to set the status of a task (e.g., In Progress, Completed).
- Delete Task: Implement a feature to allow users to delete tasks. Provide confirmation alert to prevent accidental deletions.

# Installation
1. Clone the repository:

   ```bash
   git clone https://github.com/Ibadetegashi/Task-Management-System.git

## API
1. Install dependencies:
    
    Node.js: Ensure you have Node.js installed on your machine. You can download it from Node.js website.
    Open the terminal and navigate to the '/api' directory. Run: <code>npm install</code> 

2. Create a .env file in the '/api' directory and configure necessary environment variables:

- DATABASE_URL="mysql://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>?schema=public" -  Connection URL for the MySQL database.

3. Prisma
- DATABASE_URL="mysql://username:password@localhost:3306/database_name" - Replace username, password, localhost, 3306, and database_name with your actual database credentials and configuration.

4. Apply Migrations:
- <code>npx prisma migrate dev</code>  - This command will execute the migrations defined in the prisma/migrations folder. It sets up the database schema based on the changes specified in each migration file.
Generate Prisma Client:
- <code>npx prisma generate</code> - This command generates the Prisma Client based on the schema.prisma file.

## CLIENT

Angular CLI: Install Angular CLI globally : npm install -g @angular/cli
1. Open the terminal and navigate to the '/client' directory. Run <code>npm install</code>


# Usage
To start the application, run:
- /api - <code>npm start</code>
Open your browser and visit http://localhost:3000 to access the backend API.
- /client - <code>ng serve</code>
Visit http://localhost:4200/tasks to see the frontend of the application.

# Endpoints

## Status Management Endpoints (statusController.js):
- ${\color{green}GET}$ `/status/`: Get a list of all statuses.
- ${\color{orange}POST}$ `/status/`: Create a new status.
- ${\color{blue}PUT}$ `/status/task/:id`: Edit the status of a task.

## Task Management Endpoints (taskController.js):
- ${\color{orange}POST}$ `/task/`: Create a new task.
- ${\color{green}GET}$ `/task/`: Get a list of all tasks.
- ${\color{green}GET}$ `/task/:id`: Get details of a specific task.
- ${\color{blue}PUT}$ `/task/:id`: Edit an existing task.
- ${\color{red}DELETE}$ `/task/:id`: Delete a task.
- ${\color{blue}PUT}$ `/task/`: Assign a task to a user.
- ${\color{green}GET}$ `/task/user/:id`: Get tasks assigned to a specific user.
- ${\color{green}GET}$ `/task/status/:id`: Get tasks based on a specific status.- 

## User Management Endpoints (userController.js):
- ${\color{orange}POST}$ `/user/`: Create a new user.
- ${\color{blue}PUT}$ `/user/:id`: Edit an existing user.
- ${\color{green}GET}$ `/user/`: Get a list of all users.
- ${\color{red}DELETE}$ `/user/:id`: Delete a user.