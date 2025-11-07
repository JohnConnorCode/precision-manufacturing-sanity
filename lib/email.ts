import nodemailer from 'nodemailer';

// Create reusable transporter
// PRODUCTION: Configure via environment variables
// Example for SendGrid:
//   SMTP_HOST="smtp.sendgrid.net"
//   SMTP_PORT="587"
//   SMTP_USER="apikey"
//   SMTP_PASS="SG.your-actual-api-key"
// Get API key from: https://app.sendgrid.com/settings/api_keys
const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Validate that production credentials are configured
  if (!host || !user || !pass) {
    console.warn('⚠️  Email configuration incomplete. Contact forms will fail in production.');
    console.warn('Please set SMTP_HOST, SMTP_USER, SMTP_PASS in environment variables.');
  }

  return nodemailer.createTransport({
    host: host || 'smtp.ethereal.email',
    port: parseInt(port || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: user || 'ethereal.user',
      pass: pass || 'ethereal.pass'
    }
  });
};

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  interest: string;
  projectType?: string;
  timeline?: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const transporter = createTransporter();

  // Email to company
  const companyEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1e40af 0%, #4f46e5 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Precision Manufacturing Inquiry</p>
      </div>

      <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
        <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 20px;">Contact Details</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 140px;"><strong>Name:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Email:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">
              <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Company:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.company}</td>
          </tr>
          ${data.phone ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Phone:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">
              <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">${data.phone}</a>
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Interest:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.interest.charAt(0).toUpperCase() + data.interest.slice(1)}</td>
          </tr>
          ${data.projectType ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Project Type:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.projectType.charAt(0).toUpperCase() + data.projectType.slice(1)}</td>
          </tr>
          ` : ''}
          ${data.timeline ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Timeline:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.timeline}</td>
          </tr>
          ` : ''}
        </table>

        <div style="margin-top: 25px; padding: 20px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #2563eb;">
          <h3 style="color: #1f2937; font-size: 16px; margin: 0 0 10px 0;">Message</h3>
          <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap; margin: 0;">${data.message}</p>
        </div>

        <div style="margin-top: 30px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border: 1px solid #fcd34d;">
          <p style="color: #92400e; margin: 0; font-size: 14px;">
            <strong>⚠️ Response Required:</strong> Please respond to this inquiry within 24 hours.
          </p>
        </div>
      </div>

      <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
        <p>This email was sent from the IIS Precision Manufacturing website contact form.</p>
        <p>© ${new Date().getFullYear()} Integrated Inspection Systems. All rights reserved.</p>
      </div>
    </div>
  `;

  // Confirmation email to customer
  const customerEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1e40af 0%, #4f46e5 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">Thank You for Contacting IIS</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your inquiry</p>
      </div>

      <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
        <p style="color: #1f2937; font-size: 16px; line-height: 1.6;">Dear ${data.name},</p>

        <p style="color: #4b5563; line-height: 1.6;">
          Thank you for reaching out to Integrated Inspection Systems. We've received your inquiry and our team will review it shortly.
        </p>

        <div style="margin: 25px 0; padding: 20px; background-color: #f0f9ff; border-radius: 8px; border-left: 4px solid #2563eb;">
          <h3 style="color: #1f2937; font-size: 16px; margin: 0 0 10px 0;">What's Next?</h3>
          <ul style="color: #4b5563; line-height: 1.8; margin: 10px 0; padding-left: 20px;">
            <li>Our team will review your inquiry within 24 hours</li>
            <li>A specialist will contact you to discuss your requirements</li>
            <li>We'll provide a detailed quote or proposal based on your needs</li>
          </ul>
        </div>

        <div style="margin: 25px 0; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
          <h3 style="color: #1f2937; font-size: 16px; margin: 0 0 10px 0;">Your Submission Details</h3>
          <p style="color: #6b7280; line-height: 1.6; margin: 10px 0;"><strong>Interest:</strong> ${data.interest.charAt(0).toUpperCase() + data.interest.slice(1)}</p>
          <p style="color: #6b7280; line-height: 1.6; margin: 10px 0;"><strong>Message:</strong><br>${data.message}</p>
        </div>

        <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px;">
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            <strong>Need immediate assistance?</strong><br>
            Call us at: <a href="tel:+15032319093" style="color: #2563eb; text-decoration: none;">(503) 231-9093</a><br>
            Email: <a href="mailto:officemgr@iismet.com" style="color: #2563eb; text-decoration: none;">officemgr@iismet.com</a>
          </p>
        </div>
      </div>

      <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
        <p>© ${new Date().getFullYear()} Integrated Inspection Systems. All rights reserved.</p>
        <p>AS9100D Certified | ITAR Registered | ISO 9001:2015</p>
      </div>
    </div>
  `;

  try {
    // Send email to company
    await transporter.sendMail({
      from: `"IIS Website" <noreply@iismet.com>`,
      to: process.env.COMPANY_EMAIL || 'officemgr@iismet.com',
      replyTo: data.email,
      subject: `New Contact Form Submission - ${data.interest} - ${data.company}`,
      html: companyEmailHtml,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: `"IIS Precision Manufacturing" <noreply@iismet.com>`,
      to: data.email,
      subject: 'Thank you for contacting IIS - We\'ve received your inquiry',
      html: customerEmailHtml,
    });

    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to send email' };
  }
}