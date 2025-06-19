import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendEmail } from './mailer';

dotenv.config();

// Debug environment variables
console.log('🔍 Environment variables check:');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_USER:', process.env.SMTP_USER ? '***configured***' : 'NOT FOUND');
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***configured***' : 'NOT FOUND');

const app: express.Application = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Drops Chemicals Email Server',
    status: 'running',
    endpoints: {
      health: '/health',
      sendEmail: '/send-email'
    }
  });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Email sending endpoint (updated to match frontend expectations)
app.post('/send-email', async (req: Request, res: Response) => {
  try {
    console.log('📧 Email request received:', req.body);
    
    const { formType, formData } = req.body;
    
    if (!formType || !formData) {
      console.error('❌ Missing formType or formData');
      res.status(400).json({ 
        success: false, 
        error: 'Missing formType or formData in request body' 
      });
      return;
    }

    let subject = '';
    let emailBody = '';
    let requiredFields: string[] = [];

    // Validate and process different form types
    if (formType === 'contact') {
      requiredFields = ['fullName', 'email', 'subject', 'message'];
      
      // Check required fields
      for (const field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
          res.status(400).json({ 
            success: false, 
            error: `Missing required field: ${field}` 
          });
          return;
        }
      }

      subject = `Contact Form: ${formData.subject}`;
      emailBody = `
Contact Form Submission

Name: ${formData.fullName}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from Drops Chemicals website contact form
      `.trim();

    } else if (formType === 'service-request') {
      requiredFields = ['name', 'email', 'phone', 'company', 'subject', 'message'];
      
      // Check required fields
      for (const field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
          res.status(400).json({ 
            success: false, 
            error: `Missing required field: ${field}` 
          });
          return;
        }
      }

      subject = `Service Request: ${formData.subject}`;
      emailBody = `
Service Request Form Submission

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from Drops Chemicals website service request form
      `.trim();

    } else if (formType === 'feedback') {
      requiredFields = ['company', 'date', 'completedBy', 'contact', 'email', 'products', 'experience', 'price', 'quality', 'expectations', 'suggestions', 'overall'];
      
      // Check required fields
      for (const field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
          res.status(400).json({ 
            success: false, 
            error: `Missing required field: ${field}` 
          });
          return;
        }
      }

      subject = `Customer Feedback from ${formData.company}`;
      emailBody = `
Customer Feedback Form Submission

Company: ${formData.company}
Date: ${formData.date}
Completed By: ${formData.completedBy}
Contact: ${formData.contact}
Email: ${formData.email}

Products/Services: ${formData.products}
Experience: ${formData.experience}
Price Rating: ${formData.price}
Quality Rating: ${formData.quality}

Expectations Met: ${formData.expectations}

Suggestions: ${formData.suggestions}

Overall Rating: ${formData.overall}

---
Sent from Drops Chemicals website feedback form
      `.trim();

    } else {
      res.status(400).json({ 
        success: false, 
        error: 'Unknown form type' 
      });
      return;
    }

    // Send email
    console.log('📤 Sending email...');
    console.log('Subject:', subject);
    
    await sendEmail({
      to: process.env.SMTP_USER || 'info@dropschemicals.com',
      subject,
      html: emailBody.replace(/\n/g, '<br>')
    });

    console.log('✅ Email sent successfully');
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email. Please try again later.' 
    });
  }
});

// 404 handler for undefined routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ 
    success: false, 
    error: `Route ${req.method} ${req.originalUrl} not found`,
    availableRoutes: ['GET /', 'GET /health', 'POST /send-email']
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📧 Email service ready`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
});