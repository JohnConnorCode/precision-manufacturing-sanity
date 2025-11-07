'use server';

import { z } from 'zod';
import { sendContactEmail, ContactFormData } from '@/lib/email';

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

    if (!emailResult.success) {
      // Log error but still show success to user (to prevent exposing email issues)
      console.error('Email send failed:', emailResult.error);

      // In production, you might want to save to a database as backup
      // await saveToDatabase(validatedData);
    }

    // Log submission for analytics (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.warn('Contact form submission:', {
        timestamp: new Date().toISOString(),
        company: validatedData.company,
        interest: validatedData.interest,
      });
    }

    return {
      success: true,
      message: 'Thank you for your inquiry. We will respond within 24 hours.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Please check your form inputs',
        errors: error.flatten().fieldErrors,
      };
    }

    console.error('Contact form error:', error);

    return {
      success: false,
      message: 'An error occurred. Please try again or call us at (503) 231-9093.',
    };
  }
}