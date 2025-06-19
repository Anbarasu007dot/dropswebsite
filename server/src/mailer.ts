import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Enhanced connection settings to handle network issues
  connectionTimeout: 60000, // 60 seconds
  greetingTimeout: 30000, // 30 seconds
  socketTimeout: 60000, // 60 seconds
  // Additional options for better reliability
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateLimit: 14, // max 14 messages/second
  // TLS options for better compatibility
  tls: {
    rejectUnauthorized: false,
    ciphers: 'SSLv3'
  },
  // Debug mode for troubleshooting
  debug: process.env.NODE_ENV === 'development',
  logger: process.env.NODE_ENV === 'development'
});

// Enhanced connection verification with retry logic
const verifyConnection = async (retries = 3) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('⚠️  SMTP credentials not configured. Email functionality will be disabled.');
    return false;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔄 Attempting SMTP connection (${attempt}/${retries})...`);
      await transporter.verify();
      console.log('✅ SMTP server is ready to take our messages');
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log(`❌ SMTP connection attempt ${attempt} failed:`, errorMessage);
      
      if (attempt === retries) {
        console.log('💡 SMTP connection failed after all retries. Please check:');
        console.log('   - SMTP credentials in .env file');
        console.log('   - Network connectivity');
        console.log('   - Firewall settings');
        console.log('   - For Gmail: Use App Password instead of regular password');
        console.log('   - Try using port 465 with secure: true for SSL');
        return false;
      }
      
      // Wait before retry (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`⏳ Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return false;
};

// Verify connection asynchronously without blocking startup
let smtpReady = false;
verifyConnection().then(ready => {
  smtpReady = ready;
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Fallback function to log email content when SMTP is not available
const logEmailFallback = ({ to, subject, html }: EmailOptions) => {
  console.log('📧 SMTP not available - Email content logged below:');
  console.log('=' .repeat(50));
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log('HTML Content:');
  console.log(html);
  console.log('=' .repeat(50));
  
  return {
    messageId: `fallback-${Date.now()}`,
    response: 'Email logged to console (SMTP not available)'
  };
};

export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
  // Check if SMTP is configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('⚠️  SMTP credentials not configured. Using fallback logging.');
    return logEmailFallback({ to, subject, html });
  }

  // If SMTP wasn't ready during startup, try to verify again
  if (!smtpReady) {
    console.log('🔄 SMTP not ready, attempting connection...');
    smtpReady = await verifyConnection(1);
    
    if (!smtpReady) {
      console.log('⚠️  SMTP connection failed. Using fallback logging.');
      return logEmailFallback({ to, subject, html });
    }
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  };

  console.log('📧 Sending email with options:', {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject
  });

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Failed to send email:', errorMessage);
    
    // Use fallback logging instead of throwing error
    console.log('⚠️  Email sending failed. Using fallback logging.');
    return logEmailFallback({ to, subject, html });
  }
};