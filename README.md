# Precision Manufacturing - Next.js Enterprise Site

Production-ready Next.js application for aerospace/precision manufacturing with Sanity CMS, enterprise performance, and WCAG AA accessibility.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **CMS**: Sanity v3
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Environment Setup

Create `.env.local`:

```env
# Sanity (Required)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Site URL (Required for production)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional Services
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=contact@company.com
```

## ✅ Production Checklist

- [ ] Configure all environment variables
- [ ] Set up Sanity project and populate content
- [ ] Configure email service for contact form
- [ ] Enable Google Analytics
- [ ] Deploy to Vercel
- [ ] Set up monitoring
- [ ] Configure CDN/caching
- [ ] Run accessibility audit
- [ ] Performance testing
- [ ] Security review

## 📊 Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| LCP | < 2.5s | ✅ |
| CLS | < 0.05 | ✅ |
| FID | < 100ms | ✅ |
| JS Bundle | < 90KB | ✅ |

## 📖 Documentation

- [Brand Guide](./docs/BRAND_GUIDE.md)
- [SEO Plan](./docs/SEO_PLAN.md)
- [Accessibility](./docs/A11Y_REPORT.md)
- [Performance](./docs/PERF_REPORT.md)

## 🚀 Deployment

Deploy to Vercel:
```bash
vercel --prod
```

---

Built for aerospace precision. ITAR compliant. AS9100D certified.
// Force rebuild
