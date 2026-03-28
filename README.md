RateMyStore

A full-stack web application where users can register, login and rate stores.

---

Features

- User registration and login
- Role-based authentication
- Admin, User and Store Owner roles
- Users can rate stores from 1 to 5
- Admin can create users and stores
- Admin can view all users and stores
- Store Owner can see users who rated their store
- User and Store Owner can update password

---

Tech Stack

- React + Vite
- Node.js + Express.js
- PostgreSQL
- JWT Authentication
- Tailwind CSS

---

Backend Setup

cd backend
npm install

Create a ".env" file inside the backend folder:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=ratemystore
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_secret_key

Run backend:

npm run dev

---

Frontend Setup

cd frontend
npm install
npm run dev

---

Database Setup

Create database:

CREATE DATABASE ratemystore;

Run seed file:

psql -U postgres -d ratemystore -f seed.sql

---

Demo Login Credentials

Admin

- Email: "admin@test.com"
- Password: "Password@123"

User

- Email: "user@test.com"
- Password: "Password@123"

Store Owner

- Email: "owner@test.com"
- Password: "Password@123"