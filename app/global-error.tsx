'use client'

import { useEffect, useState } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [content, setContent] = useState({
    heading: 'Something went wrong',
    description: 'A critical error occurred. Please try refreshing the page.',
    tryAgainButtonText: 'Try again',
    supportMessagePrefix: 'Need help?',
    supportLinkText: 'Contact support',
    supportEmail: 'officemgr@iismet.com'
  })

  useEffect(() => {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error:', error)
    }

    // Fetch error pages content from CMS
    async function fetchContent() {
      try {
        const response = await fetch('/api/error-pages')
        if (response.ok) {
          const data = await response.json()
          if (data?.globalError) {
            setContent(prev => ({
              heading: data.globalError.heading || prev.heading,
              description: data.globalError.description || prev.description,
              tryAgainButtonText: data.globalError.tryAgainButtonText || prev.tryAgainButtonText,
              supportMessagePrefix: data.globalError.supportMessagePrefix || prev.supportMessagePrefix,
              supportLinkText: data.globalError.supportLinkText || prev.supportLinkText,
              supportEmail: data.siteSettings?.contact?.supportEmail || prev.supportEmail
            }))
          }
        }
      } catch {
        // Fail silently and use default content
      }
    }

    fetchContent()
  }, [error])

  return (
    <html>
      <body>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --ge-bg-from: #f8fafc;
            --ge-bg-to: #e2e8f0;
            --ge-card-bg: #ffffff;
            --ge-card-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
            --ge-heading: #0f172a;
            --ge-body: #64748b;
            --ge-btn-bg: #2563eb;
            --ge-btn-text: #ffffff;
            --ge-btn-secondary-bg: #ffffff;
            --ge-btn-secondary-text: #2563eb;
            --ge-btn-secondary-border: #e2e8f0;
            --ge-divider: #e2e8f0;
            --ge-muted: #94a3b8;
            --ge-link: #2563eb;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --ge-bg-from: #0f172a;
              --ge-bg-to: #1e293b;
              --ge-card-bg: #1e293b;
              --ge-card-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.4);
              --ge-heading: #f1f5f9;
              --ge-body: #94a3b8;
              --ge-btn-bg: #2563eb;
              --ge-btn-text: #ffffff;
              --ge-btn-secondary-bg: #1e293b;
              --ge-btn-secondary-text: #60a5fa;
              --ge-btn-secondary-border: #334155;
              --ge-divider: #334155;
              --ge-muted: #64748b;
              --ge-link: #60a5fa;
            }
          }
        `}} />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, var(--ge-bg-from), var(--ge-bg-to))',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '1rem'
        }}>
          <div style={{
            maxWidth: '32rem',
            width: '100%',
            background: 'var(--ge-card-bg)',
            borderRadius: '0.75rem',
            boxShadow: 'var(--ge-card-shadow)',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--ge-heading)',
              marginBottom: '1rem'
            }}>
              {content.heading}
            </h1>

            <p style={{
              color: 'var(--ge-body)',
              marginBottom: '2rem'
            }}>
              {content.description}
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => reset()}
                style={{
                  padding: '0.5rem 1.5rem',
                  background: 'var(--ge-btn-bg)',
                  color: 'var(--ge-btn-text)',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                {content.tryAgainButtonText}
              </button>
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  padding: '0.5rem 1.5rem',
                  background: 'var(--ge-btn-secondary-bg)',
                  color: 'var(--ge-btn-secondary-text)',
                  border: '1px solid var(--ge-btn-secondary-border)',
                  borderRadius: '0.375rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Go to homepage
              </button>
            </div>

            <div style={{
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--ge-divider)'
            }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--ge-muted)' }}>
                {content.supportMessagePrefix}{' '}
                <a
                  href={`mailto:${content.supportEmail}`}
                  style={{ color: 'var(--ge-link)', textDecoration: 'none' }}
                >
                  {content.supportLinkText}
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
