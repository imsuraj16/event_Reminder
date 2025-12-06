# Event Reminder Application

This repository contains the source code for the Event Reminder application, consisting of a Node.js/Express backend and a React/Vite frontend.

## Project Structure

- **backend/**: Contains the server-side logic, API endpoints, database connection, and cron jobs.
- **frontend/**: Contains the client-side user interface built with React and Vite.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or a cloud instance)

---

## Backend Workflow

The backend handles API requests, authentication, and background cron jobs for sending reminders.

### 1. Installation

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# VAPID keys for Web Push Notifications
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
VAPID_EMAIL=your_email_for_vapid
```

### 3. Running the Server

Start the backend server:

```bash
npm start
```

The server will start on `http://localhost:3000` (default port).

### Features
- **Cron Jobs**: The backend initializes a cron job that runs **every minute**. It performs two main tasks:
  1. **Auto-completion**: checks for past events and marks them as `COMPLETED`.
  2. **Reminders**: checks for upcoming events and sends sending push notifications if the time is within the reminder window.
- **API Endpoints**: RESTful API for user authentication and event management.

---

## Frontend Workflow

The frontend is a React application built with Vite, using Redux for state management and TailwindCSS for styling.

### 1. Installation

Navigate to the `frontend` directory and install dependencies:

```bash
cd frontend
npm install
```

### 2. API Configuration

By default, the frontend may be configured to point to a production/deployed backend. To run against your local backend:

1. Open `frontend/src/api/apiconfig.js`.
2. Change the `baseURL` to your local backend URL (e.g., `http://localhost:3000`).

```javascript
// frontend/src/api/apiconfig.js
const instance = axios.create({
    baseURL: 'http://localhost:3000', // Update this for local development
    withCredentials: true,
})
```

### 3. Running the Development Server

Start the frontend development server:

```bash
npm run dev
```

The application will be accessible at the URL provided in the terminal (usually `http://localhost:5173`).

### 4. Build for Production

To build the frontend for production:

```bash
npm run build
```

This will generate a `dist` folder with the static files.

---

## Development Workflow

1. Ensure MongoDB is running.
2. Start the **Backend** in one terminal:
   ```bash
   cd backend
   npm start
   ```
3. Start the **Frontend** in another terminal:
   ```bash
   cd frontend
   npm run dev
   ```
4. Access the application in your browser.



ScreenShots-

<img width="1920" height="965" alt="Screenshot from 2025-12-06 14-45-37" src="https://github.com/user-attachments/assets/a64e1d63-cc39-4ec6-9604-42f709827294" />

<img width="388" height="862" alt="image" src="https://github.com/user-attachments/assets/79a73cfd-1ca9-4bb4-a852-1ff7c63079f3" />

<img width="1920" height="968" alt="Screenshot from 2025-12-06 14-50-07" src="https://github.com/user-attachments/assets/fd455223-9ea1-49e9-8b99-2aed9ce6b084" />

<img width="1920" height="968" alt="Screenshot from 2025-12-06 15-06-04" src="https://github.com/user-attachments/assets/d8e61db8-79fb-4e83-93d5-ab195f5ce994" />

<img width="1920" height="1080" alt="Screenshot from 2025-12-06 02-14-06" src="https://github.com/user-attachments/assets/efdc8c04-ee8d-47b0-8231-af280e3e5ad1" />

<img width="1916" height="960" alt="Screenshot from 2025-12-06 02-08-04" src="https://github.com/user-attachments/assets/e1ce2edc-db36-466a-8eaf-04edd483104a" />









