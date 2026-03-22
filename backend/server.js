const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*', // Allow all for now, or specify: 'https://bulk-mail-app-rdfa.vercel.app'
    methods: ['GET', 'POST'],
    credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bulkmail').then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection Error:", err);
});

// Root route for server status
app.get('/', (req, res) => {
    res.send('<h1>Bulk Mail App Backend is Running!</h1>');
});

// Email Model
const emailSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    body: { type: String, required: true },
    recipients: [{ type: String }],
    status: { type: String, enum: ['success', 'failure'], default: 'success' },
    createdAt: { type: Date, default: Date.now }
});

const Email = mongoose.model('Email', emailSchema);

// Nodemailer Transport
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', // Use your email provider or SMTP
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Routes
// Send Bulk Mail
app.post('/api/send-mail', async (req, res) => {
    const { subject, body, recipients } = req.body;

    if (!subject || !body || !recipients || recipients.length === 0) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipients.join(','),
            subject: subject,
            text: body
        };

        await transporter.sendMail(mailOptions);

        const emailRecord = new Email({ subject, body, recipients, status: 'success' });
        await emailRecord.save();

        res.status(200).json({ message: 'Emails sent successfully.', record: emailRecord });
    } catch (error) {
        console.error("Error sending email:", error);
        
        const emailRecord = new Email({ subject, body, recipients, status: 'failure' });
        await emailRecord.save();

        res.status(500).json({ error: 'Failed to send emails.', details: error.message });
    }
});

// Fetch History
app.get('/api/history', async (req, res) => {
    try {
        const emails = await Email.find().sort({ createdAt: -1 });
        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
