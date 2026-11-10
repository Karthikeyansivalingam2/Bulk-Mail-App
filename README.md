# Bulk Mail Dispatcher

A MERN-stack application for importing recipient addresses from spreadsheet or text files, composing email messages, and tracking bulk email activity.

## Features
- Import recipient data from `.xlsx`, `.xls`, `.csv`, and `.txt` files
- Extract email addresses from uploaded files
- Send bulk emails using Nodemailer
- Store sent-mail history in MongoDB
- Admin login for the mailing dashboard
- Display sending results and status feedback
- Responsive dashboard interface

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React, Vite, Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Email delivery | Nodemailer |
| Spreadsheet parsing | SheetJS (xlsx) |

## Project Structure

```text
Bulk-Mail-App/
├── backend/
│   └── server.js
└── frontend/
    └── src/
        ├── Dashboard.jsx
        ├── History.jsx
        └── Login.jsx
```

## Run Locally

Backend:

```bash
cd backend
npm install
```

Create a local `.env` file with the configuration required by your backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
```

Start the backend using the script defined in `backend/package.json`.

Frontend (in a separate terminal):

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite.

## Responsible Use & Security
- Send messages only to recipients who have agreed to receive them.
- Follow applicable anti-spam and email-provider policies.
- Protect SMTP credentials and database connection strings.
- Consider rate limits and recipient validation before production use.

## Author
**Karthikeyan S.** · [GitHub Profile](https://github.com/Karthikeyansivalingam2)
