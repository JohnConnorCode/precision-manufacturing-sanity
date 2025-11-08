'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error)
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Something went wrong
        </h1>

        <p className="text-slate-600 mb-6">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-6 p-4 bg-slate-50 rounded border border-slate-200 text-left">
            <p className="text-xs font-mono text-slate-700 break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => reset()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Try again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            Go to homepage
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Need help?{' '}
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
