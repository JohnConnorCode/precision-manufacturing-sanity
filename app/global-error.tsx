'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error:', error)
    }
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
              Something went wrong
            </h1>

            <p style={{
              color: '#64748b',
              marginBottom: '2rem'
            }}>
              A critical error occurred. Please try refreshing the page.
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
                Try again
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
                Need help?{' '}
                <a
                  href="mailto:officemgr@iismet.com"
                  style={{ color: '#2563eb', textDecoration: 'none' }}
                >
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
