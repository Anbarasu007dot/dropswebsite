import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Add connection timeout and other options to handle network issues
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 5000, // 5 seconds
  socketTimeout: 10000, // 10 seconds
});

// Only verify connection if SMTP credentials are provided
const verifyConnection = async () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('⚠️  SMTP credentials not configured. Email functionality will be disabled.');
    return false;
  }

  try {
    await transporter.verify();
    console.log('✅ SMTP server is ready to take our messages');
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.log('❌ SMTP connection error:', errorMessage);
    console.log('💡 Please check your SMTP configuration in the .env file');
    return false;
  }
};

// Verify connection asynchronously without blocking startup
verifyConnection();

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  // Check if SMTP is configured before attempting to send
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS in your .env file.');
  }

  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
    html: html || text.replace(/\n/g, '<br>'), // Convert line breaks to HTML if no HTML provided
  };

  console.log('📧 Sending email with options:', {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject
  });

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Failed to send email:', errorMessage);
    throw error;
  }
};