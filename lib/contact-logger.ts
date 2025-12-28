import { ContactFormData } from './email';

export interface ContactSubmissionLog extends ContactFormData {
  emailSuccess: boolean;
  emailError?: string;
  smtpConfigured: boolean;
}

/**
 * Log contact form submissions for debugging and analytics
 * In production, you might want to:
 * - Send to a cloud logging service (DataDog, Sentry, etc)
 * - Store in a database with a dashboard
 * - Send alerts for failures
 */
export async function logContactSubmission(data: ContactSubmissionLog) {
  const timestamp = new Date().toISOString();

  const logEntry = {
    timestamp,
    name: data.name,
    email: data.email,
    company: data.company,
    interest: data.interest,
    emailSuccess: data.emailSuccess,
    emailError: data.emailError || null,
    smtpConfigured: data.smtpConfigured,
  };

  // In development, log to console for easy debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('[CONTACT SUBMISSION]', JSON.stringify(logEntry, null, 2));
  }

  // In production, silently log for server-side monitoring
  // Contact submissions are stored via email delivery - no additional logging needed
  if (process.env.NODE_ENV === 'production' && !data.emailSuccess) {
    // Only log failures for debugging - successful submissions are tracked via email
    console.error('[CONTACT FORM] Email delivery failed:', {
      timestamp,
      company: data.company,
      error: data.emailError,
    });
  }

  // Always log validation/email errors for monitoring
  if (!data.emailSuccess || !data.smtpConfigured) {
    console.warn('[CONTACT FORM ERROR ALERT]', {
      timestamp,
      company: data.company,
      reason: !data.smtpConfigured ? 'SMTP_NOT_CONFIGURED' : 'EMAIL_SEND_FAILED',
      error: data.emailError,
      smtpConfigured: data.smtpConfigured,
    });
  }
}

/**
 * Check contact form health - useful for the status page
 * Returns information about recent submission attempts
 */
export async function checkContactFormHealth() {
  const smtpConfigured = !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );

  return {
    smtpConfigured,
    message: smtpConfigured
      ? 'Contact form email is configured'
      : 'Contact form email is NOT configured - submissions cannot be emailed',
    status: smtpConfigured ? 'healthy' : 'degraded',
  };
}
