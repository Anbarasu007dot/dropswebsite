import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Debug environment variables (without exposing sensitive data)
console.log('🔍 SMTP Configuration Check:');
console.log('SMTP_HOST:', process.env.SMTP_HOST || 'NOT SET');
console.log('SMTP_PORT:', process.env.SMTP_PORT || 'NOT SET');
console.log('SMTP_USER:', process.env.SMTP_USER ? '***configured***' : 'NOT SET');
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***configured***' : 'NOT SET');
console.log('SMTP_FROM:', process.env.SMTP_FROM || 'NOT SET');
console.log('SMTP_DEBUG:', process.env.SMTP_DEBUG || 'false');

// Validate required environment variables
const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required SMTP environment variables:', missingVars);
  console.error('💡 Please check your .env file and ensure all SMTP variables are set');
}

// Create transporter with enhanced configuration
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: parseInt(process.env.SMTP_PORT || '587') === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Enhanced connection settings
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000, // 60 seconds
    // Debug mode
    debug: process.env.SMTP_DEBUG === 'true',
    logger: process.env.SMTP_DEBUG === 'true',
    // Additional security options
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
      ciphers: 'SSLv3'
    },
    // Pool configuration for better performance
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 14 // messages per second
  };

  console.log('📧 Creating SMTP transporter with config:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    user: config.auth.user ? '***configured***' : 'NOT SET',
    debug: config.debug
  });

  return nodemailer.createTransporter(config);
};

const transporter = createTransporter();

// Enhanced connection verification
const verifyConnection = async () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('⚠️  SMTP credentials not configured. Email functionality will be disabled.');
    return false;
  }

  try {
    console.log('🔄 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP server is ready to take our messages');
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ SMTP connection error:', errorMessage);
    
    // Provide specific troubleshooting based on error type
    if (errorMessage.includes('EAUTH')) {
      console.error('💡 Authentication failed. Check your email and password/app password.');
      console.error('💡 For Gmail: Enable 2FA and use an App Password instead of your regular password.');
    } else if (errorMessage.includes('ECONNECTION') || errorMessage.includes('ETIMEDOUT')) {
      console.error('💡 Connection failed. Check your network and firewall settings.');
      console.error('💡 Ensure ports 587 (TLS) or 465 (SSL) are not blocked.');
    } else if (errorMessage.includes('ENOTFOUND')) {
      console.error('💡 SMTP host not found. Check your SMTP_HOST setting.');
    } else if (errorMessage.includes('ECONNREFUSED')) {
      console.error('💡 Connection refused. Check SMTP_PORT and SMTP_HOST settings.');
    }
    
    return false;
  }
};

// Test connection on startup (non-blocking)
verifyConnection().catch(err => {
  console.error('❌ Initial SMTP verification failed:', err);
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export const sendEmail = async ({ to, subject, html, from }: EmailOptions) => {
  // Pre-flight checks
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    const error = 'SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS in your .env file.';
    console.error('❌', error);
    throw new Error(error);
  }

  // Validate email parameters
  if (!to || !subject || !html) {
    const error = 'Missing required email parameters: to, subject, or html content';
    console.error('❌', error);
    throw new Error(error);
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    const error = `Invalid recipient email address: ${to}`;
    console.error('❌', error);
    throw new Error(error);
  }

  const fromEmail = from || process.env.SMTP_FROM || process.env.SMTP_USER;
  
  const mailOptions = {
    from: fromEmail,
    to,
    subject,
    html,
    // Add text version for better compatibility
    text: html.replace(/<[^>]*>/g, ''), // Strip HTML tags for text version
    // Additional headers for better deliverability
    headers: {
      'X-Mailer': 'Drops Chemicals Contact System',
      'X-Priority': '3',
      'X-MSMail-Priority': 'Normal'
    }
  };

  console.log('📧 Preparing to send email:', {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
    htmlLength: html.length
  });

  try {
    // Test connection before sending
    console.log('🔄 Testing SMTP connection before sending...');
    await transporter.verify();
    console.log('✅ SMTP connection verified, sending email...');

    const result = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', {
      messageId: result.messageId,
      response: result.response,
      accepted: result.accepted,
      rejected: result.rejected
    });

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Failed to send email:', errorMessage);
    
    // Enhanced error handling with specific solutions
    if (errorMessage.includes('EAUTH')) {
      console.error('💡 SOLUTION: Authentication failed');
      console.error('   - For Gmail: Enable 2-Factor Authentication');
      console.error('   - Generate an App Password: https://myaccount.google.com/apppasswords');
      console.error('   - Use the App Password instead of your regular password');
      throw new Error('Email authentication failed. Please check your credentials and use an App Password for Gmail.');
    } else if (errorMessage.includes('ECONNECTION') || errorMessage.includes('ETIMEDOUT')) {
      console.error('💡 SOLUTION: Connection timeout');
      console.error('   - Check your internet connection');
      console.error('   - Verify firewall allows outbound connections on port 587/465');
      console.error('   - Try using port 465 with SSL instead of 587 with TLS');
      throw new Error('Email connection failed. Please check your network and firewall settings.');
    } else if (errorMessage.includes('ENOTFOUND')) {
      console.error('💡 SOLUTION: SMTP host not found');
      console.error('   - Verify SMTP_HOST is correct (e.g., smtp.gmail.com)');
      console.error('   - Check your DNS settings');
      throw new Error('SMTP host not found. Please verify your SMTP_HOST setting.');
    } else if (errorMessage.includes('ECONNREFUSED')) {
      console.error('💡 SOLUTION: Connection refused');
      console.error('   - Check SMTP_PORT (587 for TLS, 465 for SSL)');
      console.error('   - Verify SMTP_HOST is correct');
      console.error('   - Check if your hosting provider blocks SMTP ports');
      throw new Error('SMTP connection refused. Please check your port and host settings.');
    } else if (errorMessage.includes('Message failed')) {
      console.error('💡 SOLUTION: Message delivery failed');
      console.error('   - Check recipient email address');
      console.error('   - Verify sender email is authorized');
      console.error('   - Check for spam filters');
      throw new Error('Email delivery failed. Please check recipient address and sender authorization.');
    }
    
    throw error;
  }
};

// Export transporter for testing purposes
export { transporter };