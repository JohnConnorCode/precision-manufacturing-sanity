'use server';

import { z } from 'zod';
import { sendContactEmail, ContactFormData } from '@/lib/email';
import { logContactSubmission } from '@/lib/contact-logger';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  phone: z.string().optional(),
  interest: z.enum(['general', 'quote', 'partnership', 'supplier', 'career', 'technical']),
  projectType: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function submitContactForm(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    phone: formData.get('phone') || undefined,
    interest: formData.get('interest'),
    projectType: formData.get('projectType') || undefined,
    timeline: formData.get('timeline') || undefined,
    message: formData.get('message'),
  };

  try {
    const validatedData = contactSchema.parse(rawData);

    // Send email notification
    const emailResult = await sendContactEmail(validatedData as ContactFormData);

    // Log submission regardless of email result
    await logContactSubmission({
      ...validatedData,
      emailSuccess: emailResult.success,
      emailError: emailResult.error,
      smtpConfigured: !!process.env.SMTP_HOST && !!process.env.SMTP_USER && !!process.env.SMTP_PASS,
    });

    if (!emailResult.success) {
      // Log error with details
      const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
      console.error('[CONTACT FORM] Email send failed:', {
        timestamp: new Date().toISOString(),
        company: validatedData.company,
        error: emailResult.error,
        smtpConfigured: !!smtpConfigured,
      });

      // If SMTP isn't configured, tell user to contact manually
      if (!smtpConfigured) {
        return {
          success: true,
          message: 'Your inquiry has been received. Due to a temporary email configuration issue, please call us at (503) 231-9093 to ensure we process your request.',
          partialSuccess: true,
        };
      }

      // Otherwise still show success but note the email issue
      return {
        success: true,
        message: 'Thank you for your inquiry. We will respond within 24 hours.',
        warning: 'Note: We may not have received your email confirmation. If you don\'t hear from us within 24 hours, please call (503) 231-9093.',
      };
    }

    return {
      success: true,
      message: 'Thank you for your inquiry. We will respond within 24 hours. A confirmation email has been sent to ' + validatedData.email,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Please check your form inputs',
        errors: error.flatten().fieldErrors,
      };
    }

    console.error('[CONTACT FORM] Unexpected error:', {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error),
    });

    return {
      success: false,
      message: 'An error occurred. Please try again or call us at (503) 231-9093.',
    };
  }
}