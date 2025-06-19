import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendEmail } from './mailer';

// Load environment variables first
dotenv.config();

// Debug environment variables
console.log('🔍 Environment variables check:');
console.log('PORT:', process.env.PORT || '3001');
console.log('SMTP_HOST:', process.env.SMTP_HOST || 'NOT SET');
console.log('SMTP_PORT:', process.env.SMTP_PORT || 'NOT SET');
console.log('SMTP_USER:', process.env.SMTP_USER ? '***configured***' : 'NOT SET');
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***configured***' : 'NOT SET');
console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL || 'NOT SET');

const app: express.Application = express();
const PORT = process.env.PORT || 3001;

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.method === 'POST') {
    console.log('📦 Request body keys:', Object.keys(req.body));
  }
  next();
});

// Root route with enhanced information
app.get('/', (req: Request, res: Response) => {
  const smtpConfigured = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
  
  res.json({ 
    message: 'Drops Chemicals Email Server',
    status: 'running',
    timestamp: new Date().toISOString(),
    smtp_configured: smtpConfigured,
    endpoints: {
      health: '/health',
      sendEmail: '/send-email',
      testEmail: '/test-email'
    },
    environment: {
      port: PORT,
      smtp_host: process.env.SMTP_HOST || 'NOT SET',
      smtp_port: process.env.SMTP_PORT || 'NOT SET',
      smtp_user_configured: !!process.env.SMTP_USER,
      smtp_pass_configured: !!process.env.SMTP_PASS
    }
  });
});

// Enhanced health check endpoint
app.get('/health', (req: Request, res: Response) => {
  const smtpConfigured = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
  
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    smtp_configured: smtpConfigured,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test email endpoint for debugging
app.post('/test-email', async (req: Request, res: Response) => {
  try {
    console.log('🧪 Test email request received');
    
    const testEmail = req.body.email || process.env.SMTP_USER;
    
    if (!testEmail) {
      return res.status(400).json({
        success: false,
        error: 'No test email provided and SMTP_USER not configured'
      });
    }

    await sendEmail({
      to: testEmail,
      subject: 'SMTP Test Email - Drops Chemicals',
      html: `
        <h2>SMTP Test Successful!</h2>
        <p>This is a test email from the Drops Chemicals email server.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Server:</strong> ${process.env.SMTP_HOST}</p>
        <p><strong>Port:</strong> ${process.env.SMTP_PORT}</p>
        <p>If you received this email, your SMTP configuration is working correctly!</p>
      `
    });

    console.log('✅ Test email sent successfully');
    res.status(200).json({
      success: true,
      message: 'Test email sent successfully',
      recipient: testEmail
    });

  } catch (error) {
    console.error('❌ Test email failed:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: 'Check server logs for more information'
    });
  }
});

// Enhanced email sending endpoint
app.post('/send-email', async (req: Request, res: Response) => {
  try {
    console.log('📧 Email request received:', {
      timestamp: new Date().toISOString(),
      body_keys: Object.keys(req.body),
      content_length: JSON.stringify(req.body).length
    });
    
    const { formType, formData } = req.body;
    
    // Validate request structure
    if (!formType || !formData) {
      console.error('❌ Invalid request structure - missing formType or formData');
      return res.status(400).json({ 
        success: false, 
        error: 'Missing formType or formData in request body',
        expected_format: {
          formType: 'string (contact|service-request|feedback)',
          formData: 'object with form fields'
        }
      });
    }

    let subject = '';
    let emailBody = '';
    let requiredFields: string[] = [];
    let recipientEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

    // Process different form types with enhanced validation
    if (formType === 'contact') {
      requiredFields = ['fullName', 'email', 'subject', 'message'];
      
      // Check required fields
      for (const field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
          console.error(`❌ Missing required field: ${field}`);
          return res.status(400).json({ 
            success: false, 
            error: `Missing required field: ${field}`,
            required_fields: requiredFields
          });
        }
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        console.error('❌ Invalid email format:', formData.email);
        return res.status(400).json({
          success: false,
          error: 'Invalid email format'
        });
      }

      subject = `Contact Form: ${formData.subject}`;
      emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-bottom: 20px; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              Contact Form Submission
            </h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Name:</strong> 
              <span style="color: #6b7280;">${formData.fullName}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Email:</strong> 
              <span style="color: #6b7280;">${formData.email}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Subject:</strong> 
              <span style="color: #6b7280;">${formData.subject}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #374151;">Message:</strong>
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin-top: 5px; color: #374151;">
                ${formData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #9ca3af; font-size: 12px; text-align: center;">
              Sent from Drops Chemicals website contact form<br>
              Timestamp: ${new Date().toISOString()}
            </p>
          </div>
        </div>
      `;

    } else if (formType === 'service-request') {
      requiredFields = ['name', 'email', 'phone', 'company', 'subject', 'message'];
      
      // Check required fields
      for (const field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
          console.error(`❌ Missing required field: ${field}`);
          return res.status(400).json({ 
            success: false, 
            error: `Missing required field: ${field}`,
            required_fields: requiredFields
          });
        }
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        console.error('❌ Invalid email format:', formData.email);
        return res.status(400).json({
          success: false,
          error: 'Invalid email format'
        });
      }

      subject = `Service Request: ${formData.subject}`;
      emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #059669; margin-bottom: 20px; border-bottom: 2px solid #059669; padding-bottom: 10px;">
              Service Request Form Submission
            </h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Name:</strong> 
              <span style="color: #6b7280;">${formData.name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Email:</strong> 
              <span style="color: #6b7280;">${formData.email}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Phone:</strong> 
              <span style="color: #6b7280;">${formData.phone}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Company:</strong> 
              <span style="color: #6b7280;">${formData.company}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Subject:</strong> 
              <span style="color: #6b7280;">${formData.subject}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #374151;">Message:</strong>
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin-top: 5px; color: #374151;">
                ${formData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #9ca3af; font-size: 12px; text-align: center;">
              Sent from Drops Chemicals website service request form<br>
              Timestamp: ${new Date().toISOString()}
            </p>
          </div>
        </div>
      `;

    } else if (formType === 'feedback') {
      requiredFields = ['company', 'date', 'completedBy', 'contact', 'email', 'products', 'experience', 'price', 'quality', 'expectations', 'suggestions', 'overall'];
      
      // Check required fields
      for (const field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
          console.error(`❌ Missing required field: ${field}`);
          return res.status(400).json({ 
            success: false, 
            error: `Missing required field: ${field}`,
            required_fields: requiredFields
          });
        }
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        console.error('❌ Invalid email format:', formData.email);
        return res.status(400).json({
          success: false,
          error: 'Invalid email format'
        });
      }

      subject = `Customer Feedback from ${formData.company}`;
      emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #7c3aed; margin-bottom: 20px; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
              Customer Feedback Form Submission
            </h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Company:</strong> 
              <span style="color: #6b7280;">${formData.company}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Date:</strong> 
              <span style="color: #6b7280;">${formData.date}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Completed By:</strong> 
              <span style="color: #6b7280;">${formData.completedBy}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Contact:</strong> 
              <span style="color: #6b7280;">${formData.contact}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Email:</strong> 
              <span style="color: #6b7280;">${formData.email}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Products/Services:</strong> 
              <span style="color: #6b7280;">${formData.products}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Experience:</strong> 
              <span style="color: #6b7280;">${formData.experience}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Price Rating:</strong> 
              <span style="color: #6b7280;">${formData.price}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Quality Rating:</strong> 
              <span style="color: #6b7280;">${formData.quality}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Expectations Met:</strong>
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin-top: 5px; color: #374151;">
                ${formData.expectations.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #374151;">Suggestions:</strong>
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin-top: 5px; color: #374151;">
                ${formData.suggestions.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #374151;">Overall Rating:</strong> 
              <span style="color: #6b7280; font-size: 18px; font-weight: bold;">${formData.overall}</span>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #9ca3af; font-size: 12px; text-align: center;">
              Sent from Drops Chemicals website feedback form<br>
              Timestamp: ${new Date().toISOString()}
            </p>
          </div>
        </div>
      `;

    } else {
      console.error('❌ Unknown form type:', formType);
      return res.status(400).json({ 
        success: false, 
        error: 'Unknown form type',
        supported_types: ['contact', 'service-request', 'feedback']
      });
    }

    // Validate recipient email
    if (!recipientEmail) {
      console.error('❌ No recipient email configured');
      return res.status(500).json({
        success: false,
        error: 'No recipient email configured. Please set CONTACT_EMAIL or SMTP_USER in environment variables.'
      });
    }

    // Send email
    console.log('📤 Sending email...');
    console.log('📧 Email details:', {
      to: recipientEmail,
      subject: subject,
      formType: formType,
      bodyLength: emailBody.length
    });
    
    const result = await sendEmail({
      to: recipientEmail,
      subject,
      html: emailBody
    });

    console.log('✅ Email sent successfully:', {
      messageId: result.messageId,
      response: result.response
    });

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: result.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: errorMessage,
      timestamp: new Date().toISOString(),
      troubleshooting: {
        check_env_vars: 'Ensure SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT are set',
        test_connection: 'Use POST /test-email to test SMTP configuration',
        check_logs: 'Review server logs for detailed error information'
      }
    });
  }
});

// 404 handler for undefined routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ 
    success: false, 
    error: `Route ${req.method} ${req.originalUrl} not found`,
    available_routes: [
      'GET /', 
      'GET /health', 
      'POST /send-email',
      'POST /test-email'
    ],
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error: Error, req: Request, res: Response, next: any) => {
  console.error('💥 Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📧 Email service ready`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 Test email: POST http://localhost:${PORT}/test-email`);
  console.log(`📬 Send email: POST http://localhost:${PORT}/send-email`);
  
  // Display configuration status
  const smtpConfigured = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
  console.log(`📧 SMTP Status: ${smtpConfigured ? '✅ Configured' : '❌ Not Configured'}`);
  
  if (!smtpConfigured) {
    console.log('💡 To enable email functionality:');
    console.log('   1. Copy server/.env.example to server/.env');
    console.log('   2. Fill in your SMTP credentials');
    console.log('   3. Restart the server');
  }
});