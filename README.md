## Frontend running on : https://raven-claw.netlify.app/
## Back end running on: https://ravenclaw-backend.onrender.com

---

# RAVEN CLAW - Harry Potter Trivia Web Application
RAVEN CLAW is an interactive Harry Potter-themed trivia web application built using the MERN stack (MongoDB, ExpressJS, React, and Node.js). This project is developed as part of a group assignment for COMP229 – Web Application Development.
---
## **Table of Contents**
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)
- [Team Members](#team-members)
- [External Design Document (EDD)](#external-design-document-edd)
- [Project Tracking](#project-tracking)
- [Demo Video](#demo-video)
- [Contributing](#contributing)
---
## **Project Overview**
RAVEN CLAW is designed to provide a fun, interactive trivia experience for Harry Potter fans. Users can:
- Answer Harry Potter-themed trivia questions.
- Create, update, and delete trivia questions.
- Generate randomized trivia quizzes with a button click.
- Use secure login and manage trivia questions with authentication and authorization.
This project focuses on demonstrating CRUD operations, backend development, and database integration.
---
## **Features**
- **Interactive Quiz**: Users can take quizzes with randomly generated questions.
- **Question Management**: Admins can create, update, or delete trivia questions.
- **Authentication & Authorization**: Secure access to administrative functionality.
- **Database Integration**: Trivia questions and user data are stored in MongoDB.
- **Responsive Design**: Works seamlessly on various devices.
---
## **Technology Stack**
- **Frontend**: ReactJS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Additional Tools**:
  - **Postman**: For testing API endpoints
  - **GitHub Projects**: For project tracking and task management
  - **GitHub**: For version control and repository hosting
---
## **Setup and Installation**
### **Prerequisites**
Before running this project, ensure you have the following installed:
- Node.js and npm
- MongoDB
### **Steps**
1. **Clone the repository:**
   - Open your terminal and run the following commands to clone the repository and navigate to the project folder:
     ```bash
     git clone https://github.com/your-repo-link/raven-claw.git
     cd raven-claw
     ```
2. **Install dependencies:**
   - **For the Backend**:
     Navigate to the `server` directory and install the required dependencies by running:
     ```bash
     cd server
     npm install
     ```
   - **For the Frontend**:
     Navigate to the `client` directory and install the required dependencies by running:
     ```bash
     cd client
     npm install
     ```
3. **Set up the environment variables:**
   - Create a `.env` file in the `server` directory.
   - Add the following variables to the `.env` file:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     ```
   - Replace `<your-mongodb-connection-string>` with your MongoDB connection string and `<your-jwt-secret>` with a secure secret key for JSON Web Tokens (JWT).
4. **Start the backend server:**
   - Navigate to the `server` directory and run the following command to start the backend server in development mode:
     ```bash
     cd server
     npm run dev
     ```
5. **Start the frontend application:**
   - Open a new terminal window or tab.
   - Navigate to the `client` directory and run the following command to start the React frontend:
     ```bash
     cd client
     npm start
     ```
6. **Open the application in your browser:**
   - Once both the backend and frontend are running, open your browser and navigate to:
     ```
     http://localhost:3000
     ```
   Ta da! Now you can view the RAVEN CLAW web application.
---
## **API Endpoints**
### **Trivia Questions**##
- GET  `/api/questions ` : Retrieve all trivia questions. 
- POST `add/path/here`: Add new trivia questions.
- PUT `add/path/here`: Update an existing question by ID.
- DELETE `add/path/here`: Delete a question by ID.
### **Authentication** 
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in a user. 
---
## **Team Members**
- Marta - Project Manager, Full Stack Engineer
- Tanner - Frontend UI Designer, Technical Artist, Project Coordinator
- Holly - Databse Specialist
- Joshua - Backend Engineer, API Specialist
- Sumalatha - Frontend, UX/UI Designer
---
## **External Design Document (EED)**
Our External Design Document includes:
- Wireframes: Visual mockups of the application’s interface for top-level features
- Initial screenshots

---
## **Project Management**
We will be using [GitHub Projects](https://github.com/users/martapolii/projects/3) to track our project progress. Our tracking board includes:
- A Product Backlog: Features and functionality requirements.
- A Task Board: Tasks assigned to team members.
---
## **Demo Video**
( add link) 
---
## **Contributing**
If you'd like to contribute to the RAVEN CLAW project, follow these steps:
1. **Fork the repository:**
   - Click the "Fork" button on the repository page to create your own copy of the project.
2. **Clone the forked repository:**
   - Use the following command to clone the forked repository to your local machine:
     ```bash
     git clone https://github.com/your-username/raven-claw.git
     ```
3. **Create a new branch:**
   - Create a new branch for your feature or bug fix:
     ```bash
     git checkout -b feature-name
     ```
4. **Make your changes:**
   - Implement your feature or fix the bug in the newly created branch.
5. **Commit your changes:**
   - Stage and commit your changes with a meaningful commit message:
     ```bash
     git add .
     git commit -m "Describe your changes here"
     ```
6. **Push your changes:**
   - Push the changes to your forked repository:
     ```bash
     git push origin feature-name
     ```
7. **Open a pull request:**
   - Go to the original repository and click the "Pull Request" button.
   - Compare your branch with the base repository and submit your pull request for review.

Thank you for contributing to RAVEN CLAW!

---

To push to this branch specifically: 
1. initilalize repository:
```
git init
```
2. connect remote repository
```
git remote add origin https://github.com/martapolii/RAVENCLAW.git
```
3. check the connection was made
```
git remote -v
```
Output should be: 
```
origin  https://github.com/martapolii/RAVENCLAW.git (fetch)
origin  https://github.com/martapolii/RAVENCLAW.git (push)
```
4. connect to this branch specifically:
- first time: (this will create this branch locally)
```
git checkout -b <name of specific branch>
```
- if it already exists: 
```
  git checkout <name of specific branch>
```
*I had issues with this, had to force push changes. Wasn't an issue when I first started this branch, but may be an
issue if someone else wants to contribute: 
```
git push origin <name of specific branch> --force
```

5. Normal push once connected:
6. - add everything:
   ```
   git add .
   ```
   - add specific files:
   ```
   git add <file name>
   ```
   ```
   git commit -m "commit message"
   ```
   ```
   git push origin <name of specific branch>
   ```
   ```
   git pull origin <name of specific branch>
   ```


## Combining Branches with Unrelated Histories 
1. move to the branch you want to merge the code onto
```
git checkout <branch name>
```
2. Fetch the latest version of the branch you want to merge
```
git fetch origin <branch1 name>
```
3. Checkout the files without switching branches
```
git checkout <branch1 name> -- .
```
- `-- .` = all files from specified branch
4. repeat for other branch
5. 'Stage' all the files
```
git add .
```
6. 'Commit' the combined files to github on the new branch
```
git commit -m "Write a message here to describe the branches you are merging and why, BRIEFLY"
```
7. 'Push' the branch (add this folder + the files you combined) to github
```
git push origin <branch name>
```

8. Alternatively, can copy specific folders over from another branch:
```
git checkout <branch1 name> -- <specific-folder-or-file you want to extract>
```
