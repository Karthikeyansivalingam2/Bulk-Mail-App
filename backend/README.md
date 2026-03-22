# ⚙️ Bulk Mailer - Backend (Node.js/Express)

The reliable engine behind the Bulk Mail Dispatcher, powered by **Express** and **MongoDB**.

## 🚀 Features
*   **📡 RESTful API**: Endpoint for sending bulk emails and fetching history.
*   **📨 Nodemailer Integration**: Standard SMTP-based email delivery (e.g., Gmail).
*   **💾 Database Persistence**: Automated logging of all sent emails in MongoDB.
*   **🛡️ Secure Storage**: Handles subject, body, and large recipient lists with ease.
*   **📜 History Tracking**: Fetching sent email logs sorted by timestamp.

## 🛠️ Tech Stack
*   **Node.js**: Asynchronous server-side JavaScript environment.
*   **Express**: Minimalist web framework for Node.js.
*   **Mongoose**: Elegant MongoDB object modeling for project data.
*   **Nodemailer**: Standard library for sending SMTP-based emails.
*   **CORS & Dotenv**: For handling cross-origin requests and environment config.

## ⚙️ Development Setup
1. Move to the directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_uri
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```
4. Start the server:
   ```bash
   npm start
   ```

## 🏗️ Folder Structure
*   `server.js`: The central API server and database entry point.
*   `.env`: Secret environment configurations for mailing and DB credentials.
*   `node_modules/`: Automated project dependencies.
