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
      } catch (err) {
        // Fail silently and use default content
        console.error('Failed to fetch error page content:', err)
      }
    }

    fetchContent()
  }, [error])

  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '1rem'
        }}>
          <div style={{
            maxWidth: '32rem',
            width: '100%',
            background: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#0f172a',
              marginBottom: '1rem'
            }}>
              {content.heading}
            </h1>

            <p style={{
              color: '#64748b',
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
                  background: '#2563eb',
                  color: 'white',
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
                  background: 'white',
                  color: '#2563eb',
                  border: '1px solid #e2e8f0',
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
              borderTop: '1px solid #e2e8f0'
            }}>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                {content.supportMessagePrefix}{' '}
                <a
                  href={`mailto:${content.supportEmail}`}
                  style={{ color: '#2563eb', textDecoration: 'none' }}
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
