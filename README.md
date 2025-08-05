# ElectraTrust Voting App

A secure and scalable full-stack voting application built using **MongoDB**, **Express**, **React (Vite)**, **Auth0**, and **Cloudinary**. It allows authenticated users to register votes and provides an admin interface for approval and moderation.

## 🚀 Tech Stack

* **Frontend**: React + Vite, Tailwind CSS, Lenis (Smooth Scroll), Auth0, Cloudinary
* **Backend**: Node.js, Express, MongoDB (Mongoose)

---

## 📁 Project Structure

```
ElectraTrust/
├── Frontend/        # Vite React Client
├── Backend/         # Express Server API
└── README.md
```

---

## 🔧 Backend Setup (Express API)

### 1. Navigate to backend directory:

```bash
cd backend
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Create `.env` file:

```env
ADMIN_EMAIL=abc@gmail.com
MONGO_URI=
NODE_ENV=development
PORT=3000
SELF_URL=http://localhost:3000
CLIENT_ORIGIN=
```

### 4. Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:3000`

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
