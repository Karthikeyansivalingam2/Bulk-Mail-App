# 🎨 Bulk Mailer - Frontend (React)

The interactive user interface for the Bulk Mail Dispatcher, built with **React** and **Vite** for maximum performance.

## 🚀 Features
*   **📂 Excel/CSV Extraction**: Automatic email parsing from multiple file formats.
*   **📨 Status Dashboards**: Visual cues for sending and success/failure states.
*   **📜 History View**: Browse through previously sent messages stored in MongoDB.
*   **🔐 Admin Guard**: Basic secure login to prevent unauthorized access.
*   **📱 Responsive**: Clean desktop-friendly design with minimalist styling.

## 🛠️ Tech Stack
*   **React 19**: Modern UI component library.
*   **Vite**: Next-generation frontend tooling.
*   **Axios**: For handling API communication with the backend.
*   **Lucide-React**: Premium icon sets for better UX.
*   **SheetJS (XLSX)**: Reliable file reading and parsing in the browser.

## ⚙️ Development Setup
1. Move to the directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run in development mode:
   ```bash
   npm run dev
   ```

## 🏗️ Folder Structure
*   `src/Dashboard.jsx`: Main logic for file uploading and email sending.
*   `src/History.jsx`: Component for fetching and displaying sent logs.
*   `src/Login.jsx`: Simple admin access control.
*   `src/index.css`: Custom minimalist design tokens.
