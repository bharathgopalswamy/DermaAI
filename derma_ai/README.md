# DermaCure AI

AI-powered skin screening and dermatologist appointment booking platform built using the MERN Stack and TensorFlow.js.

---

# Project Overview

DermaCure AI is a full-stack web application that helps users analyze possible skin conditions using AI-powered image classification and connect with dermatologists for consultations and appointment booking.

The application allows users to:

* Register and login securely
* Upload or capture skin images
* Analyze skin conditions using TensorFlow.js AI model
* View AI-generated skin analysis results
* Book dermatologist appointments
* Manage appointments
* Store scan history and appointments in MongoDB

---

# Features

## Authentication System

* User Registration
* User Login
* Role-based Authentication (Patient / Doctor)
* JWT Token Authentication
* Secure password hashing using bcrypt

---

## AI Skin Analysis

* Upload skin image
* Camera image capture support
* TensorFlow.js integration
* Teachable Machine image classification model
* AI prediction confidence score
* Severity estimation
* Suggested skincare recommendations
* Doctor recommendation system

---

## Appointment Booking System

* View dermatologist profiles
* Dynamic doctor appointment booking
* Appointment scheduling
* Appointment cancellation
* Appointment management dashboard

---

## Dashboard

* User dashboard
* Statistics cards
* Recent activity
* Quick actions
* Scan history overview

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* TensorFlow.js
* Teachable Machine Image Model

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* JWT Authentication
* bcryptjs

---

## Database

* MongoDB Atlas

---

# Folder Structure

```bash
DermaAI/
│
├── public/
│   └── model/
│       ├── model.json
│       ├── metadata.json
│       └── weights.bin
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
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Installation Guide

## Clone Repository

```bash
git clone https://github.com/yourusername/dermacure-ai.git
cd dermacure-ai
```

---

# Frontend Setup

## Install Dependencies

```bash
npm install
```

## Install TensorFlow.js

```bash
npm install @tensorflow/tfjs @teachablemachine/image
```

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

## Navigate to Server Folder

```bash
cd server
```

## Install Dependencies

```bash
npm install
```

## Run Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Environment Variables

Create a `.env` file inside `server/`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# AI Model Setup

The application uses a TensorFlow.js image classification model exported from Google Teachable Machine.

## Steps

1. Create Teachable Machine Image Project
2. Train classes:

   * Acne
   * Rash
   * Eczema
   * Dark Spots
   * Normal Skin
3. Export as TensorFlow.js
4. Place files inside:

```bash
public/model/
```

Files required:

```bash
model.json
metadata.json
weights.bin
```

---

# API Endpoints

## Authentication Routes

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

---

## Appointment Routes

### Create Appointment

```http
POST /api/appointments
```

### Get Appointments

```http
GET /api/appointments
```

### Delete Appointment

```http
DELETE /api/appointments/:id
```

---

## Scan Routes

### Upload and Save Scan

```http
POST /api/scans/upload
```

### Get All Scans

```http
GET /api/scans
```

---

# Current Functionalities Completed

* MERN Stack Setup
* MongoDB Atlas Integration
* Authentication System
* Role-based User Handling
* Appointment Booking System
* Dynamic Doctor Pages
* Image Upload System
* AI Skin Analysis Workflow
* TensorFlow.js Integration
* MongoDB Scan Storage
* Dynamic Scan Results Page
* Dashboard UI
* Protected Routes Preparation

---

# Future Improvements

* Real dermatology dataset training
* AI model accuracy enhancement
* Doctor dashboard
* Video consultation
* Real-time chat
* Email notifications
* Scan history analytics
* Mobile responsive optimization
* Deployment on Vercel/Render
* Cloudinary image storage
* Prescription system
* Payment gateway integration

---

# Medical Disclaimer

DermaCure AI is intended for educational and preliminary screening purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Users should consult certified dermatologists for accurate diagnosis and treatment.

---

# Author

Bharath Gopalsamy

---

# License

This project is developed for educational and portfolio purposes.
