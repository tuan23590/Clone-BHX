# Clone Bach Hoa Xanh

## Overview
This project consists of a **frontend** and **backend** built with modern frameworks and technologies to deliver a robust, scalable web application.

---

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Frontend](#frontend)
3. [Backend](#backend)
4. [Demo](#Demo)
4. [Setup](#setup)
5. [Development Scripts](#development-scripts)

---

---

## Technologies Used

### Frontend
- **Next.js**: Framework for server-rendered React applications.
- **React**: Library for building user interfaces.
- **Material-UI**: Component library for styling.
- **TypeScript**: Strongly typed JavaScript.

### Backend
- **NestJS**: Framework for building scalable server-side applications.
- **MongoDB**: NoSQL database for data storage.
- **Passport**: Middleware for authentication.
- **JWT**: Token-based authentication.
- **Nodemailer**: Email sending utility.

---



## Frontend
The **frontend** is built with [Next.js](https://nextjs.org/), a React framework that provides server-side rendering and static site generation.

### Features
- Modern UI with [Material-UI](https://mui.com/).
- Authentication with [NextAuth.js](https://next-auth.js.org/).
- TypeScript support for type safety.
- State and query management using libraries like `query-string`.

### Directory Structure
- **`pages/`**: Contains all the page components.
- **`components/`**: Reusable UI components.
- **`styles/`**: Global and modular styles.

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
- Authentication with JWT and Passport strategies.
- MongoDB integration using Mongoose.
- Email sending via Nodemailer and Handlebars templates.
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

Insert gif or link to demo




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
   - For the frontend: Add a `.env.local` file.
   - For the backend: Add a `.env` file based on the `.env.example` file.

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

