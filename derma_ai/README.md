# DermaCure AI

DermaCure AI is an AI-powered skin screening and dermatologist appointment booking web application developed using the MERN Stack and TensorFlow.js.

The idea behind this project is to help users perform a basic AI-based skin analysis by uploading a skin image and getting possible skin condition predictions along with severity levels, suggestions, and dermatologist recommendations.

This project combines frontend development, backend APIs, database management, authentication, image uploads, and AI integration into one complete full-stack application.

---

# Features

## User Authentication

* User Registration
* User Login
* Role Selection (Patient / Doctor)
* JWT-based Authentication
* Password hashing using bcrypt

---

## AI Skin Analysis

* Upload skin images
* Capture images using device camera
* TensorFlow.js AI model integration
* Teachable Machine image classification
* AI confidence percentage
* Severity analysis
* AI suggestions and recommendations
* Recommended skincare products
* Doctor consultation recommendation

---

## Dermatologist Appointment System

* View dermatologist profiles
* Dynamic doctor booking page
* Book appointments
* Cancel appointments
* View all booked appointments

---

## Dashboard

* User dashboard
* Statistics overview
* Recent activity section
* Quick action buttons

---

# Technologies Used

## Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* TensorFlow.js
* Teachable Machine

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* JWT
* bcryptjs

## Database

* MongoDB Atlas

---

# Project Structure

```bash id="z3hkt1"
DermaAI/
│
├── public/
│   └── model/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── stylesheets/
│   └── App.jsx
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   └── server.js
│
└── README.md
```

---

# Installation

## Clone the repository

```bash id="kr66q1"
git clone https://github.com/yourusername/dermacure-ai.git
cd dermacure-ai
```

---

# Frontend Setup

Install frontend dependencies:

```bash id="73y8fq"
npm install
```

Install TensorFlow.js and Teachable Machine packages:

```bash id="mz7qfr"
npm install @tensorflow/tfjs @teachablemachine/image
```

Run frontend:

```bash id="x33jui"
npm run dev
```

Frontend will run on:

```bash id="5gq42v"
http://localhost:5173
```

---

# Backend Setup

Move into server folder:

```bash id="t0fxij"
cd server
```

Install backend dependencies:

```bash id="q0ttci"
npm install
```

Run backend server:

```bash id="t0fxyj"
npm run dev
```

Backend runs on:

```bash id="v5h8zn"
http://localhost:5000
```

---

# Environment Variables

Create a `.env` file inside the `server` folder:

```env id="4g0gnv"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# TensorFlow Model Setup

This project uses a TensorFlow.js image classification model exported from Google Teachable Machine.

## Steps

1. Create an Image Project in Teachable Machine
2. Train skin condition classes such as:

   * Acne
   * Rash
   * Eczema
   * Dark Spots
   * Normal Skin
3. Export the model as TensorFlow.js
4. Place exported files inside:

```bash id="w2axrj"
public/model/
```

Required files:

```bash id="v8s2fk"
model.json
metadata.json
weights.bin
```

---

# API Routes

## Authentication

```http id="u8z23x"
POST /api/auth/register
POST /api/auth/login
```

## Appointments

```http id="h4dj42"
POST /api/appointments
GET /api/appointments
DELETE /api/appointments/:id
```

## Skin Scans

```http id="yd28ka"
POST /api/scans/upload
GET /api/scans
```

---

# Current Progress

The following modules have been completed:

* MERN Stack setup
* MongoDB Atlas integration
* Authentication system
* Appointment booking system
* Dynamic doctor pages
* Image upload system
* TensorFlow.js AI integration
* Scan result analysis page
* MongoDB scan storage
* Responsive UI design
* Dashboard and navigation system

---

# Future Improvements

* Improve AI model accuracy
* Doctor dashboard
* Scan history analytics
* Real-time notifications
* Video consultations
* Email verification
* Cloud image storage
* Mobile responsiveness improvements
* Deployment on Vercel and Render

---

# Disclaimer

DermaCure AI is built for educational and project purposes only. The AI-generated results are not medical diagnoses. Users are advised to consult certified dermatologists for professional medical advice.

---

# Author

Bharath Gopalsamy
