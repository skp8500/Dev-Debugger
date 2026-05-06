# 🚀 Smart Dev Debugger

> AI-Powered Developer Assistant for Debugging, Understanding, and Fixing Code Errors

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React-61DAFB)
![Node.js](https://img.shields.io/badge/backend-Node.js-339933)
![Docker](https://img.shields.io/badge/containerized-Docker-2496ED)
![AI Powered](https://img.shields.io/badge/AI-Groq%20%7C%20Gemini-purple)

---

# 📌 Overview

Smart Dev Debugger is an AI-powered full-stack web application that helps developers quickly identify, understand, and fix coding errors.

Instead of showing confusing compiler messages or stack traces, the platform analyzes the error using AI and provides:

* ✅ Root cause analysis
* ✅ Fix suggestions
* ✅ Beginner-friendly explanations
* ✅ Corrected code
* ✅ Multi-language support

The goal of this project is to simplify debugging for students, beginner programmers, and developers while demonstrating real-world AI integration and scalable full-stack architecture.

---

# 🎯 Problem Statement

Developers — especially beginners — spend hours debugging:

* Syntax errors
* Runtime errors
* Logical issues
* Stack traces
* Configuration mistakes

Most debugging tools only show raw errors without properly explaining:

* WHY the issue happened
* HOW to fix it
* HOW to avoid it in the future

Smart Dev Debugger solves this by combining AI reasoning with a clean developer experience.

---

# ✨ Features

## 🧠 AI-Powered Debugging

* Analyze code errors instantly
* Root-cause detection
* Smart fix suggestions
* AI-generated corrected code

## 💻 Multi-Language Support

Supports:

* JavaScript
* Python
* C++
* More languages can be added easily

## 📖 Beginner-Friendly Explanations

"Explain Like I’m 10" mode simplifies technical concepts for beginners.

## 🔐 Authentication System

* JWT Authentication
* Google OAuth Login
* Secure session handling

## 📝 Error History

Users can revisit previously analyzed debugging sessions.

## 🌙 Modern UI

* Responsive design
* Dark mode support
* Clean debugging dashboard

## 🐳 Dockerized Architecture

* Frontend container
* Backend container
* Database container
* Easy local setup & deployment

---

# 🧱 Tech Stack

## Frontend

* React.js / Next.js
* Tailwind CSS
* Axios
* Monaco Editor

## Backend

* Node.js
* Express.js
* REST APIs

## Database

* PostgreSQL (Neon DB)

## AI Integration

* Groq API
* Gemini API

## Authentication

* JWT Authentication
* Google OAuth

## DevOps

* Docker
* Docker Compose

---

# 🐳 Why Docker?

Docker was used to containerize the entire application and ensure:

* Consistent environments across systems
* Easy setup using a single command
* Service isolation
* Scalable architecture
* Simplified deployment process

### Containers Used

| Container | Purpose                     |
| --------- | --------------------------- |
| Frontend  | React application           |
| Backend   | API server + AI integration |
| Database  | PostgreSQL storage          |

---

# 🏗️ System Architecture

```text
┌──────────────────┐
│     Frontend     │
│ React / Next.js  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     Backend      │
│ Node.js/Express  │
└────────┬─────────┘
         │
 ┌───────┴────────┐
 ▼                ▼
AI APIs       PostgreSQL
Groq/Gemini     Database
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
# AI
AI_API_KEY=your_api_key

# Database
DATABASE_URL=your_database_url

# JWT
JWT_SECRET=your_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/smart-dev-debugger.git
cd smart-dev-debugger
```

---

## 2️⃣ Install Dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

---

# 🐳 Run with Docker

## Start Containers

```bash
docker-compose up --build
```

---

# ▶️ Run Locally Without Docker

## Backend

```bash
cd backend
npm run dev
```

## Frontend

```bash
cd frontend
npm run dev
```

---

# 🔑 Authentication Flow

## JWT Authentication

1. User registers/login
2. Backend generates JWT token
3. Token stored securely
4. Protected routes verify token

## Google OAuth

1. User clicks Google Login
2. OAuth consent screen opens
3. Google authenticates user
4. Backend receives callback
5. User session created

---

# 📡 API Endpoints

## Authentication

### Register

```http
POST /api/register
```

### Login

```http
POST /api/login
```

### Google OAuth

```http
GET /auth/google
```

---

## AI Debugging

### Analyze Code Error

```http
POST /api/analyze
```

### Request Body

```json
{
  "language": "javascript",
  "code": "console.log(a)",
  "error": "ReferenceError: a is not defined"
}
```

### Response

```json
{
  "rootCause": "Variable 'a' is not defined.",
  "fix": "Define the variable before using it.",
  "explanation": "JavaScript cannot find variable 'a'.",
  "correctedCode": "const a = 'Hello'; console.log(a);"
}
```

---

# 📂 Project Structure

```text
smart-dev-debugger/
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── pages/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── services/
│
├── docker-compose.yml
├── .env
└── README.md
```

---

# 🔥 Future Improvements

* GitHub repository analysis
* AI-powered code optimization
* Team collaboration
* VS Code extension
* Voice-based debugging assistant
* AI model switching
* Real-time debugging suggestions

---

# 📈 Learning Outcomes

This project helped in understanding:

* Full-stack architecture
* AI API integration
* Authentication systems
* Docker containerization
* REST API development
* Environment variable management
* Scalable project structure

---

# 🌍 Real-World Applications

Smart Dev Debugger can be useful for:

* Students learning programming
* Coding interview preparation
* Beginner developers
* Debugging practice
* Developer productivity improvement

---

# 🛡️ Security Considerations

* Environment variables stored securely
* JWT-based authentication
* OAuth integration
* Sensitive keys excluded using `.gitignore`
* API request validation

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

### Shiv Kumar

* Full-Stack Developer
* AI & Developer Tools Enthusiast

---

# ⭐ Final Note

Smart Dev Debugger is more than just a debugging tool.

It demonstrates:

* Real-world AI integration
* Production-level full-stack development
* Dockerized architecture
* Authentication systems
* Developer-focused problem solving

If you found this project useful, consider giving it a ⭐ on GitHub.
