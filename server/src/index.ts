import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendEmail } from './mailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Drops Chemicals Email Server',
    status: 'running',
    endpoints: {
      health: '/health',
      sendEmail: '/api/send-email'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    
    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({ 
        error: 'Missing required fields: to, subject, and either text or html' 
      });
    }

    await sendEmail({ to, subject, text, html });
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});