# 📧 Bulk Mail Dispatcher - MERN Stack

A powerful, full-stack application for sending bulk emails seamlessly by extracting data from Excel/CSV files. This project leverages the **MERN (MongoDB, Express, React, Node.js)** stack to provide a robust solution for bulk communications.

## 🚀 Key Features
*   **📂 Multi-format Upload**: Extract emails directly from `.xlsx`, `.xls`, `.csv`, and `.txt` files.
*   **📨 Bulk Mailing**: Send emails to hundreds of recipients simultaneously using `nodemailer`.
*   **📜 History Tracking**: Automatic logging of sent emails (Subject, Body, Recipients, and Status) in **MongoDB**.
*   **🔐 Admin Authentication**: A secure admin gateway for authorized users.
*   **⚡ Modern UI**: A clean, responsive dashboard built with **React** and **Lucide-React**.
*   **📄 Real-time Feedback**: Instant success/failure alerts with detailed logs.

---

## 🛠️ Technology Stack

| Layer | Language/Tool | Description |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Dynamic, high-performance UI components |
| **Backend** | Node.js + Express | Scalable server-side logic and RESTful APIs |
| **Database** | MongoDB | Persistent storage for email history and logs |
| **Mailing** | Nodemailer | Reliable email delivery via SMTP |
| **Parsing** | SheetJS (XLSX) | Powerful Excel/CSV data extraction |

---

## 🏗️ Project Architecture

```bash
Bulk-Mailer/
├── backend/            # Express.js Server & MongoDB connection
│   ├── .env            # Environment variables (Emails, DB URI)
│   └── server.js       # Main API hub and Nodemailer setup
└── frontend/           # React App (Vite)
    ├── src/
    │   ├── Dashboard.jsx # Main mailing logic
    │   ├── History.jsx   # Sent mail tracking
    │   └── Login.jsx     # Admin authentication
    └── index.css       # Clean, minimalist styling
```

---

## ⚙️ Installation & Setup

### 1. Backend Setup
1. Move to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Move to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 📝 Usage Guide
1. **Login**: Authenticate as an admin using the login page.
2. **Upload**: Click the **Upload CSV/Excel** zone to select your data file.
3. **Verify**: Ensure the correct number of emails are extracted and shown in the dashboard.
4. **Send**: Compose your subject and message, then hit **Send**!
5. **History**: Visit the **History** tab to see your previous dispatches.

---

## 👨‍💻 Author
**Karrthikeyan S**
[GitHub Profile](https://github.com/errormakesclever)

---

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
