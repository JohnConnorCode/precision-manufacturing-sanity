'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContactForm } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { theme, styles, cn } from '@/lib/theme';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  Shield,
  Award,
  Activity,
  Upload,
  X,
  FileText,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

// Icon mapping for bottom stats
const iconMap: Record<string, any> = {
  pulse: Activity,
  Activity,
  Award,
  Shield,
  CheckCircle,
};

// Default fallback data
const defaultContactData = {
  hero: {
    backgroundImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=2400&q=80',
    imageAlt: 'Contact our precision manufacturing team',
    badge: 'GET STARTED',
    badgeIconName: 'Activity',
    title: 'Contact',
    titleHighlight: 'Our Team',
    description: 'Connect with Integrated Inspection Systems for precision manufacturing solutions, technical consultations, and project quotes.',
    buttonLabel: 'Start Your Project',
    buttonHref: '#contact-form'
  },
  contactInfo: {
    heading: 'Get in Touch',
    description: 'Our engineering team is ready to discuss your precision manufacturing needs.',
    addressLine1: 'Integrated Inspection Systems, Inc.',
    addressLine2: '12345 Precision Way',
    addressLine3: 'Torrance, CA 90501',
    phone: '(503) 231-9093',
    phoneLink: 'tel:+15032319093',
    email: 'officemgr@iismet.com',
    hoursLine1: 'Monday - Friday: 7:00 AM - 5:00 PM PST',
    hoursLine2: '24/7 Production Facility'
  },
  certifications: [
    { certification: 'AS9100D' },
    { certification: 'ISO 9001:2015' },
    { certification: 'ITAR Registered' },
    { certification: 'CMMC Compliant' }
  ],
  bottomStats: [
    { iconName: 'pulse', text: 'Quote Response in 24 Hours', animated: true },
    { iconName: 'Award', text: '30+ Years | 1000+ Projects', animated: false },
    { iconName: 'Shield', text: '99.8% First-Pass Yield', animated: false },
    { iconName: 'CheckCircle', text: 'AS9100D | ITAR Certified', animated: false }
  ]
};

interface ContactPageClientProps {
  data?: typeof defaultContactData | null;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// Accepted file types for contact form uploads
const _ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/step',
  'application/sla',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  phone: z.string().optional(),
  interest: z.enum(['general', 'quote', 'partnership', 'supplier', 'career', 'technical']),
  projectType: z.enum(['aerospace', 'defense', 'medical', 'energy', 'other']).optional(),
  timeline: z.enum(['immediate', '1-3months', '3-6months', '6months+']).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  files: z.any().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPageClient({ data }: ContactPageClientProps) {
  const contactData = data || defaultContactData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const interest = watch('interest');
  const formValues = watch();

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(dirtyFields).length > 0) {
        localStorage.setItem('contact-form-draft', JSON.stringify(formValues));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formValues, dirtyFields]);

  // Load saved draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('contact-form-draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        Object.entries(draft).forEach(([key, value]) => {
          if (value) setValue(key as any, value);
        });
      } catch (e) {
        console.error('Failed to load draft', e);
      }
    }
  }, [setValue]);

  // File upload handlers
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });
    setUploadedFiles(prev => [...prev, ...validFiles].slice(0, 3)); // Max 3 files
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });
    setUploadedFiles(prev => [...prev, ...validFiles].slice(0, 3));
  }, []);

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    // Add files to form data
    uploadedFiles.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });

    const result = await submitContactForm(formData);
    setSubmitResult(result);
    setIsSubmitting(false);

    if (result.success) {
      reset();
      setUploadedFiles([]);
      localStorage.removeItem('contact-form-draft');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage={(contactData as any)?.hero?.backgroundImageUrl || contactData.hero.backgroundImage}
        imageAlt={contactData.hero.imageAlt}
        badge={{
          text: contactData.hero.badge,
          icon: Activity
        }}
        title={
          <span className="text-white">
            {contactData.hero.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">{contactData.hero.titleHighlight}</span>
          </span>
        }
        description={contactData.hero.description}
        buttons={[
          {
            label: contactData.hero.buttonLabel,
            href: contactData.hero.buttonHref,
            variant: "primary"
          }
        ]}
        height="large"
        alignment="center"
      />

      {/* Main Content */}
      <section id="contact-form" className={styles.sectionDark}>
        <div className={theme.spacing.container}>
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className={cn(theme.typography.h3, "text-white mb-6")}>{contactData.contactInfo.heading}</h2>
                <p className={cn(theme.typography.body, "text-slate-400 mb-8")}>
                  {contactData.contactInfo.description}
                </p>
              </div>

              {/* Contact Cards */}
              <Card className={cn(theme.components.card.form, "p-6")}>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className={cn(theme.typography.label, "text-white mb-1")}>Headquarters</h3>
                      <p className={theme.typography.small}>
                        {contactData.contactInfo.addressLine1}<br />
                        {contactData.contactInfo.addressLine2}<br />
                        {contactData.contactInfo.addressLine3}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className={cn(theme.typography.label, "text-white mb-1")}>Phone</h3>
                      <a href={contactData.contactInfo.phoneLink} className={cn(theme.typography.small, "hover:text-blue-600 transition-colors")}>
                        {contactData.contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className={cn(theme.typography.label, "text-white mb-1")}>Email</h3>
                      <a href={`mailto:${contactData.contactInfo.email}`} className={cn(theme.typography.small, "hover:text-blue-600 transition-colors")}>
                        {contactData.contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className={cn(theme.typography.label, "text-white mb-1")}>Business Hours</h3>
                      <p className={theme.typography.small}>
                        {contactData.contactInfo.hoursLine1}<br />
                        {contactData.contactInfo.hoursLine2}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Certifications */}
              <Card className={cn(theme.components.card.form, "p-6")}>
                <h3 className={cn(theme.typography.label, "text-white mb-4")}>Certifications</h3>
                <div className="space-y-3">
                  {contactData.certifications.map((cert) => (
                    <div key={cert.certification} className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className={theme.typography.small}>{cert.certification}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className={cn(theme.components.card.form, "p-8")}>
                <h2 className={cn(theme.typography.h3, "text-white mb-6")}>Send a Message</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <Label htmlFor="name" className={styles.form.label}>Full Name *</Label>
                      <div className="relative">
                        <Input
                          id="name"
                          {...register('name')}
                          placeholder="John Doe"
                          className={cn(
                            styles.form.input,
                            "mt-1 pr-10",
                            !errors.name && watch('name')?.length >= 2 && "border-green-500/50"
                          )}
                        />
                        {!errors.name && watch('name')?.length >= 2 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5"
                          >
                            <Check className="w-4 h-4 text-green-500" />
                          </motion.div>
                        )}
                      </div>
                      {errors.name && (
                        <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="relative">
                      <Label htmlFor="email" className={styles.form.label}>Email Address *</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="john@company.com"
                          className={cn(
                            styles.form.input,
                            "mt-1 pr-10",
                            !errors.email && watch('email')?.includes('@') && "border-green-500/50"
                          )}
                        />
                        {!errors.email && watch('email')?.includes('@') && watch('email')?.includes('.') && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5"
                          >
                            <Check className="w-4 h-4 text-green-500" />
                          </motion.div>
                        )}
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <Label htmlFor="company" className={styles.form.label}>Company *</Label>
                      <div className="relative">
                        <Input
                          id="company"
                          {...register('company')}
                          placeholder="Acme Aerospace"
                          className={cn(
                            styles.form.input,
                            "mt-1 pr-10",
                            !errors.company && watch('company')?.length >= 2 && "border-green-500/50"
                          )}
                        />
                        {!errors.company && watch('company')?.length >= 2 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5"
                          >
                            <Check className="w-4 h-4 text-green-500" />
                          </motion.div>
                        )}
                      </div>
                      {errors.company && (
                        <p className="text-sm text-red-400 mt-1">{errors.company.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className={styles.form.label}>Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        placeholder="+1 (555) 123-4567"
                        className={cn(styles.form.input, "mt-1")}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="interest" className={styles.form.label}>Inquiry Type *</Label>
                    <Select onValueChange={(value) => setValue('interest', value as ContactFormData['interest'])}>
                      <SelectTrigger id="interest" aria-label="Inquiry Type" className={cn(styles.form.select.trigger, "mt-1")}>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent className={styles.form.select.content}>
                        <SelectItem className={styles.form.select.item} value="quote">Request Quote</SelectItem>
                        <SelectItem className={styles.form.select.item} value="technical">Technical Consultation</SelectItem>
                        <SelectItem className={styles.form.select.item} value="partnership">Strategic Partnership</SelectItem>
                        <SelectItem className={styles.form.select.item} value="supplier">Supplier Inquiry</SelectItem>
                        <SelectItem className={styles.form.select.item} value="career">Career Opportunities</SelectItem>
                        <SelectItem className={styles.form.select.item} value="general">General Information</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.interest && (
                      <p className="text-sm text-red-400 mt-1">{errors.interest.message}</p>
                    )}
                  </div>

                  {(interest === 'quote' || interest === 'technical') && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="projectType" className={styles.form.label}>Industry</Label>
                        <Select onValueChange={(value) => setValue('projectType', value as ContactFormData['projectType'])}>
                          <SelectTrigger id="projectType" aria-label="Industry" className={cn(styles.form.select.trigger, "mt-1")}>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent className={styles.form.select.content}>
                            <SelectItem className={styles.form.select.item} value="aerospace">Aerospace</SelectItem>
                            <SelectItem className={styles.form.select.item} value="defense">Defense</SelectItem>
                            <SelectItem className={styles.form.select.item} value="medical">Medical Devices</SelectItem>
                            <SelectItem className={styles.form.select.item} value="energy">Energy</SelectItem>
                            <SelectItem className={styles.form.select.item} value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="timeline" className={styles.form.label}>Timeline</Label>
                        <Select onValueChange={(value) => setValue('timeline', value as ContactFormData['timeline'])}>
                          <SelectTrigger id="timeline" aria-label="Timeline" className={cn(styles.form.select.trigger, "mt-1")}>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent className={styles.form.select.content}>
                            <SelectItem className={styles.form.select.item} value="immediate">Immediate</SelectItem>
                            <SelectItem className={styles.form.select.item} value="1-3months">1-3 Months</SelectItem>
                            <SelectItem className={styles.form.select.item} value="3-6months">3-6 Months</SelectItem>
                            <SelectItem className={styles.form.select.item} value="6months+">6+ Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* File Upload */}
                  <div>
                    <Label className={styles.form.label}>
                      Attach Files <span className="text-slate-500 text-xs">(Optional - CAD files, drawings, specs)</span>
                    </Label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={cn(
                        "mt-2 border-2 border-dashed rounded-lg p-6 transition-all duration-300",
                        isDragging
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-slate-700 bg-slate-800/30 hover:border-slate-600"
                      )}
                    >
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.step,.stp,.sla,.stl,.xls,.xlsx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center gap-3"
                      >
                        <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                          <Upload className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-white font-medium mb-1">
                            Drop files here or click to browse
                          </p>
                          <p className="text-xs text-slate-400">
                            PDF, JPG, PNG, STEP, STL, Excel (max 10MB, up to 3 files)
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Uploaded Files List */}
                    <AnimatePresence>
                      {uploadedFiles.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 space-y-2"
                        >
                          {uploadedFiles.map((file, index) => (
                            <motion.div
                              key={`${file.name}-${index}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3 border border-slate-700"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="w-4 h-4 text-blue-400" />
                                <div>
                                  <p className="text-sm text-white">{file.name}</p>
                                  <p className="text-xs text-slate-400">
                                    {(file.size / 1024).toFixed(1)} KB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="p-1 hover:bg-slate-700 rounded transition-colors"
                                aria-label="Remove file"
                              >
                                <X className="w-4 h-4 text-slate-400" />
                              </button>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <Label htmlFor="message" className={styles.form.label}>Message *</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder="Please describe your project requirements..."
                      rows={6}
                      className={cn(styles.form.textarea, "mt-1")}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-400 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className={cn(theme.typography.small, "text-xs text-slate-500")}>
                      * Required fields
                    </p>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(styles.ctaPrimary, "group h-12 px-8")}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          {interest === 'quote' ? 'Get Quote in 24 Hours' :
                           interest === 'technical' ? 'Schedule Consultation' :
                           interest === 'partnership' ? 'Discuss Partnership' :
                           'Send Message'}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </div>

                  {submitResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${
                        submitResult.success
                          ? 'bg-green-500/10 border border-green-500/20'
                          : 'bg-red-500/10 border border-red-500/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 ${
                          submitResult.success ? 'text-green-400' : 'text-red-400'
                        }`} />
                        <p className={`text-sm ${
                          submitResult.success ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {submitResult.message}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </form>
              </Card>
            </motion.div>
          </div>

          {/* Bottom Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex flex-wrap justify-center gap-8 text-sm font-medium">
              {contactData.bottomStats.map((stat, index) => {
                const IconComponent = iconMap[stat.iconName] || Activity;
                return (
                  <div key={index} className="flex items-center gap-2">
                    {stat.animated ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    ) : (
                      <IconComponent className="w-4 h-4 text-blue-400" />
                    )}
                    <span className="text-white">{stat.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
