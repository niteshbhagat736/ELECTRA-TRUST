# ElectraTrust Voting App

A secure and scalable full-stack voting application built using **MongoDB**, **Express**, **React (Vite)**, **Auth0**, and **Cloudinary**. It allows authenticated users to register votes and provides an admin interface for approval and moderation.

📁 Branch Structure
main — contains the Frontend code (React + Tailwind + Auth0)
backend — contains the Backend code (Node.js + Express + MongoDB)

## 🚀 Tech Stack

* **Frontend**: React + Vite, Tailwind CSS, Lenis (Smooth Scroll), Auth0, Cloudinary
* **Backend**: Node.js, Express, MongoDB (Mongoose)

---

## 📁 Project Structure

```
ElectraTrust/
├── Frontend/        # Vite React Client
└── README.md
```

---

# ⚙️Backend setup

This is the backend API for the **Electra Trust Project**, built using **Node.js + Express**. It handles server-side operations like API routing, database connections, and environment setup.

---

## 🚀 Quick Setup

### 1. Clone the `Backend` Branch
first create a folder backend then  

```bash cd backend ```

```bash

git clone -b Backend https://github.com/niteshbhagat736/ELECTRA-TRUST.git

```

> This clones only the `Backend` branch into a folder named `backend`.

---

### 2. Install Dependencies

```bash

npm install

```

---

### 3. Configure Environment Variables

Create a `.env` file in the root of the `backend` directory with the following content:

```env
ADMIN_EMAIL=abc@gmail.com
MONGO_URI=your_mongodb_connection_uri
NODE_ENV=development
PORT=3000
SELF_URL=http://localhost:3000
CLIENT_ORIGIN=http://localhost:5173
```

> Replace values with your actual credentials and URLs.

---

### 4. Start the Development Server

```bash
nodemon index.js
```

this will run the backend server at localhost:3000

---

## 💻 Frontend Setup (React + Vite)

### 1. Navigate to frontend directory:

```bash
cd frontend
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Create `.env` file:

```env
VITE_AUTH0_DOMAIN=
VITE_CLIENTID=
VITE_ADMIN_EMAIL=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
VITE_API_URL_PROD=
```

### 4. Start the frontend dev server:

```bash
npm run dev
```

The app will run on `http://localhost:5173`

---

## ✅ Features

* Auth0-based login for secure identity management
* Cloudinary integration for image uploads
* Admin dashboard to approve or delete votes
* Mobile-responsive, smooth scrolling UX with Lenis
* CORS configured for frontend/backend separation

---

## 📦 Production

* **Frontend** deployed to Vercel: [https://electratrust.vercel.app](https://electratrust.vercel.app)
* **Backend** deployed to Render: [https://vote-app-backend-tp2i.onrender.com](https://vote-app-backend-tp2i.onrender.com)

---

## 🤝 Contribution

Feel free to fork and open a pull request. For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 License

This project is licensed under the MIT License.


