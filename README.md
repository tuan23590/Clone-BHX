# Project Documentation

## Overview
This project consists of a **frontend** and **backend**, built with modern frameworks and technologies to deliver a robust, scalable web application. The frontend leverages Next.js **App Router** and **Auth.js** (formerly NextAuth.js) for seamless routing and authentication.

---

## Technologies Used

### Frontend
- **Next.js (App Router)**: Framework for server-rendered React applications.
- **Auth.js**: Authentication library for user login and session management.
- **React**: Library for building user interfaces.
- **Material-UI (MUI)**: Component library for styling.
- **TypeScript**: Strongly typed JavaScript.

### Backend
- **NestJS**: Framework for building scalable server-side applications.
- **MongoDB**: NoSQL database for data storage.
- **Passport**: Middleware for authentication.
- **JWT**: Token-based authentication.
- **Nodemailer**: Email sending utility.
- **TypeScript**: Strongly typed JavaScript.

---

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Frontend](#frontend)
3. [Backend](#backend)
4. [Demo](#demo)
5. [Setup](#setup)
6. [Development Scripts](#development-scripts)

---

## Frontend
The **frontend** is built with [Next.js](https://nextjs.org/), a React framework, and uses the **App Router** for better routing flexibility. Authentication is implemented with [Auth.js](https://authjs.dev/) to handle secure user login and sessions.

### Features
- **Next.js App Router** for optimized routing and layouts.
- Authentication using **Auth.js**, supporting providers like Google, email, and custom credentials.
- Modern UI powered by **Material-UI (MUI)**.
- TypeScript for type safety.
- Integration with API endpoints for dynamic data handling.

### Directory Structure
- **`app/`**: Contains the App Router structure for pages, layouts, and API routes.
- **`components/`**: Reusable UI components.
- **`styles/`**: Global and modular styles.
- **`lib/auth.js`**: Authentication configuration for Auth.js.

### Key Scripts
- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint for code quality checks.

---

## Backend
The **backend** is built using the [NestJS](https://nestjs.com/) framework, known for its modular architecture and TypeScript support.

### Features
- RESTful API endpoints.
- Authentication using JWT and Passport strategies.
- MongoDB integration via Mongoose.
- Email sending via Nodemailer with Handlebars templates.
- Code linting with ESLint and formatting with Prettier.
- End-to-end testing with Jest.

### Directory Structure
- **`src/`**: Contains core modules, controllers, and services.
- **`test/`**: Contains unit and integration test cases.
- **`dist/`**: Compiled production-ready code.

### Key Scripts
- `start`: Starts the application.
- `dev`: Runs the application in watch mode for development.
- `build`: Compiles the application.
- `test`: Runs all test cases.
- `lint`: Runs ESLint checks.

---

## Demo
A live demo of the project is available at: [HERE](https://clone-bhx.vercel.app/)
- If the website is not responding, please wait 1 minute and refresh the page because you need to wait for the backend to start
Use the following test credentials to log in:
- **Email**: demo@minimals.cc
- **Password**: demo@minimals.cc
![image](https://github.com/user-attachments/assets/aa7d78bc-4ce6-4fec-983d-b4cb99c899ad)
![image](https://github.com/user-attachments/assets/3d6633ef-6697-4fb1-8fa5-8cac0ef42689)
![image](https://github.com/user-attachments/assets/05fdf85c-db54-4d0c-b49e-01ff4e19414a)
![image](https://github.com/user-attachments/assets/fbc54975-db7d-4ab2-a6f9-8844149519be)
![image](https://github.com/user-attachments/assets/dfd683e7-c8ef-49de-8627-4cd0b0c48568)
![image](https://github.com/user-attachments/assets/159666e2-73f1-4794-a5d5-ca64ea13b6ce)

---

## Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- NPM or Yarn

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/tuan23590/Clone-BHX.git
   ```
2. **Install dependencies**:
   - For the frontend:
     ```bash
     cd client
     npm install
     ```
   - For the backend:
     ```bash
     cd server
     npm install
     ```
3. **Start MongoDB**:
   Ensure MongoDB is running locally or configure the connection string in the `.env` file.

4. **Configure environment variables**:
   - Frontend: Add a `.env.local` file. Example:
     ```env
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your-secret-key
     GOOGLE_CLIENT_ID=your-google-client-id
     GOOGLE_CLIENT_SECRET=your-google-client-secret
     ```
   - Backend: Add a `.env` file based on the `.env.example` file.

5. **Run the application**:
   - Frontend: 
     ```bash
     npm run dev
     ```
   - Backend: 
     ```bash
     npm run dev
     ```

---

## Development Scripts

### Frontend
| Script          | Description                              |
|------------------|------------------------------------------|
| `npm run dev`   | Starts the frontend development server.  |
| `npm run build` | Builds the frontend for production.      |
| `npm run start` | Starts the production frontend server.   |
| `npm run lint`  | Lints the frontend code.                 |

### Backend
| Script                | Description                               |
|------------------------|-------------------------------------------|
| `npm run dev`         | Starts the backend development server.    |
| `npm run start`       | Starts the backend server.                |
| `npm run build`       | Compiles the backend code.                |
| `npm run lint`        | Lints the backend code.                   |
| `npm run test`        | Runs all tests.                           |
