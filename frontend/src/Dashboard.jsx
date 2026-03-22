import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Send, CheckCircle, AlertCircle, UploadCloud } from 'lucide-react';

const Dashboard = () => {
  const [emails, setEmails] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File uploaded:", file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        let extractedEmails = [];
        try {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const text = XLSX.utils.sheet_to_csv(worksheet); // simple conversion to text
            
            const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
            const sheetEmails = text.match(emailRegex) || [];
            extractedEmails = [...extractedEmails, ...sheetEmails];
          });
          
          console.log("Extracted emails from file:", extractedEmails);
        } catch(error) {
          console.error("Error parsing file:", error);
          setStatusMsg("Failed to read the Excel/CSV file properly.");
          setIsSuccess(false);
          return;
        }
        
        if (extractedEmails.length > 0) {
          const currentEmails = emails ? emails.split(',').map(e => e.trim()).filter(e => e) : [];
          // Merge old emails with newly extracted emails, avoiding duplicates
          const allEmails = [...new Set([...currentEmails, ...extractedEmails])];
          setEmails(allEmails.join(', '));
          console.log("Merged email list:", allEmails);
          setStatusMsg(`Successfully extracted ${extractedEmails.length} emails from the file!`);
          setIsSuccess(true);
        } else {
          console.warn("No emails found in the file.");
          setStatusMsg("No valid emails found in the uploaded file.");
          setIsSuccess(false);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Split by comma
    let recipientArray = emails.split(',').map(e => e.trim()).filter(e => e);

    if(recipientArray.length === 0) {
      setStatusMsg("Please enter at least one valid email.");
      setIsSuccess(false);
      setLoading(false);
      return;
    }

    console.log("Sending mail to:", recipientArray);
    console.log("Payload:", { subject, body: message, recipients: recipientArray });

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    axios.post(`${apiUrl}/api/send-mail`, {
      recipients: recipientArray,
      subject: subject,
      body: message
    }).then((res) => {
      console.log("Success response:", res.data);
      setStatusMsg("Mails sent successfully!");
      setIsSuccess(true);
      setEmails('');
      setSubject('');
      setMessage('');
      setLoading(false);
    }).catch((err) => {
      console.error("Error response:", err);
      const errorDetail = err.response ? `Server Error: ${err.response.data.error || err.message}` : `Network Error: Could not connect to backend. Check your VITE_API_URL settings.`;
      setStatusMsg(errorDetail);
      setIsSuccess(false);
      setLoading(false);
    });
  }

  return (
    <div className="card">
      <h2>
        <Send size={24} color="#2563eb" /> 
        Broadcast Emails
      </h2>
      
      {statusMsg && (
        <div className={isSuccess ? "alert alert-success" : "alert alert-danger"}>
          {isSuccess ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{statusMsg}</span>
        </div>
      )}

      <form onSubmit={sendEmail}>
        
        <div className="form-group">
          <label>Upload CSV File</label>
          <div 
            className="upload-zone"
            onClick={() => document.getElementById('csv-file').click()}
          >
            <UploadCloud size={40} color="#2563eb" style={{marginBottom: '10px'}}/>
            <h4 style={{margin: '0 0 5px 0'}}>Click here to upload file</h4>
            <p style={{fontSize: '13px', margin: 0, color: '#666'}}>
              Total Emails: <strong>{emails.split(',').filter(e=>e.trim()).length}</strong>
            </p>
            <input 
              id="csv-file"
              type="file" 
              accept=".csv,.xlsx,.xls,.txt" 
              style={{display: 'none'}} 
              onChange={handleFileUpload} 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Recipient Emails</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="student1@gmail.com, student2@gmail.com"
            value={emails} 
            onChange={(e) => setEmails(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter subject here"
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Message Body</label>
          <textarea 
            className="form-control" 
            placeholder="Type your message..."
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Sending...' : <><Send size={18} /> Send {emails.split(',').filter(e=>e.trim()).length || 0} Emails</>}
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
