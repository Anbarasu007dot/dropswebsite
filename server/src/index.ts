import express from 'express';
import cors from 'cors';
import { sendEmail } from './mailer.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enhanced CORS configuration
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://localhost:8080',
    'http://127.0.0.1:8080',
    'https://127.0.0.1:8080'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    port: PORT 
  });
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  console.log('📨 Received email request');
  console.log('📋 Request body:', JSON.stringify(req.body, null, 2));

  try {
    const { formType, formData } = req.body;

    if (!formType || !formData) {
      console.error('❌ Missing required fields: formType or formData');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: formType and formData are required'
      });
    }

    let emailSubject = '';
    let emailHtml = '';
    const recipientEmail = 'info@dropschemicals.com';

    if (formType === 'contact') {
      // Quick contact form
      const { fullName, email, subject, message } = formData;
      
      if (!fullName || !email || !subject || !message) {
        console.error('❌ Missing required contact form fields');
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: fullName, email, subject, and message are required'
        });
      }

      emailSubject = `Contact Form: ${subject}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
            <h3 style="color: #1e40af; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #ecfdf5; border-radius: 8px;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              <strong>📧 Reply to:</strong> ${email}<br>
              <strong>🕒 Received:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `;
    } else if (formType === 'service-request') {
      // Full contact page form
      const { name, email, phone, company, subject, message } = formData;
      
      if (!name || !email || !phone || !company || !subject || !message) {
        console.error('❌ Missing required service request form fields');
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: name, email, phone, company, subject, and message are required'
        });
      }

      emailSubject = `Service Request: ${subject}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Service Request
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
            <h3 style="color: #1e40af; margin-top: 0;">Service Request Details</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #ecfdf5; border-radius: 8px;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              <strong>📧 Reply to:</strong> ${email}<br>
              <strong>📞 Phone:</strong> ${phone}<br>
              <strong>🏢 Company:</strong> ${company}<br>
              <strong>🕒 Received:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `;
    } else {
      console.error('❌ Invalid form type:', formType);
      return res.status(400).json({
        success: false,
        error: 'Invalid form type. Must be either "contact" or "service-request"'
      });
    }

    console.log('📤 Attempting to send email...');
    console.log('📧 To:', recipientEmail);
    console.log('📝 Subject:', emailSubject);

    const result = await sendEmail({
      to: recipientEmail,
      subject: emailSubject,
      html: emailHtml
    });

    console.log('✅ Email sent successfully:', result.messageId);

    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  console.log('❌ 404 - Route not found:', req.method, req.originalUrl);
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 SMTP configured: ${process.env.SMTP_USER ? 'Yes' : 'No'}`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});