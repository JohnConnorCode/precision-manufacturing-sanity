'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle2, XCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'

interface HealthStatus {
  timestamp: string
  sanity: {
    connected: boolean
    message: string
    responseTime: number
  }
  apis: {
    navigation: boolean
    footer: boolean
    siteSettings: boolean
  }
  email: {
    configured: boolean
    message: string
  }
  healthy: boolean
}

export default function TroubleshootingPage() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  const refreshHealth = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/health/integrations', { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setHealth(data)
      setLastRefresh(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch health status')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshHealth()
  }, [])

  const StatusIcon = ({ ok }: { ok: boolean }) =>
    ok ? (
      <CheckCircle2 className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-600" />
    )

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 mb-2">Troubleshooting & System Status</h1>
          <p className="text-lg text-zinc-600">
            For marketing team to self-serve and debug common issues
          </p>
        </div>

        {/* Health Status Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-zinc-900">System Health Check</h2>
            <button
              onClick={refreshHealth}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Checking...' : 'Refresh'}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Error checking system status</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {health && (
            <div className="space-y-6">
              {/* Overall Status */}
              <div className={`rounded-lg p-4 border-2 ${health.healthy ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                <div className="flex items-center gap-3">
                  {health.healthy ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  )}
                  <div>
                    <p className={`font-bold ${health.healthy ? 'text-green-900' : 'text-yellow-900'}`}>
                      {health.healthy ? '✓ All Systems Operational' : '⚠ Some Systems Need Attention'}
                    </p>
                    <p className={`text-sm ${health.healthy ? 'text-green-700' : 'text-yellow-700'}`}>
                      Last checked: {new Date(health.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Individual Checks */}
              <div className="grid gap-4">
                {/* Sanity Connection */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <StatusIcon ok={health.sanity.connected} />
                    <h3 className="font-semibold text-zinc-900">Sanity CMS Connection</h3>
                  </div>
                  <p className="text-sm text-zinc-600 ml-8">
                    {health.sanity.message} ({health.sanity.responseTime}ms)
                  </p>
                  {!health.sanity.connected && (
                    <p className="text-sm text-red-600 ml-8 mt-2">
                      <strong>Action:</strong> The website cannot connect to the content management system. Check internet connection or contact support.
                    </p>
                  )}
                </div>

                {/* API Endpoints */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-zinc-900 mb-3">Content APIs</h3>
                  <div className="space-y-2 ml-8">
                    <div className="flex items-center gap-3">
                      <StatusIcon ok={health.apis.navigation} />
                      <span className="text-sm text-zinc-700">Navigation & Menu</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusIcon ok={health.apis.footer} />
                      <span className="text-sm text-zinc-700">Footer Information</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusIcon ok={health.apis.siteSettings} />
                      <span className="text-sm text-zinc-700">Site Settings & Contact</span>
                    </div>
                  </div>
                  {(!health.apis.navigation || !health.apis.footer || !health.apis.siteSettings) && (
                    <p className="text-sm text-red-600 ml-8 mt-3">
                      <strong>Action:</strong> Some content is not loading properly. Try refreshing the page, then contact support if issue persists.
                    </p>
                  )}
                </div>

                {/* Email Configuration */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <StatusIcon ok={health.email.configured} />
                    <h3 className="font-semibold text-zinc-900">Email System</h3>
                  </div>
                  <p className="text-sm text-zinc-600 ml-8">{health.email.message}</p>
                  {!health.email.configured && (
                    <p className="text-sm text-yellow-600 ml-8 mt-2">
                      <strong>Note:</strong> Contact form submissions are not being sent. This needs to be configured with your email provider.
                    </p>
                  )}
                </div>
              </div>

              <p className="text-xs text-zinc-500 text-center">
                Last refresh: {lastRefresh?.toLocaleTimeString()}
              </p>
            </div>
          )}

          {loading && !health && (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
              <p className="text-zinc-600">Checking system health...</p>
            </div>
          )}
        </div>

        {/* Common Issues */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Common Issues & Solutions</h2>

          <div className="space-y-6">
            {/* Issue 1 */}
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="font-bold text-zinc-900 mb-2">Content changes don't appear on website</h3>
              <ol className="space-y-2 text-zinc-700 text-sm list-decimal list-inside">
                <li>Changes in Sanity Studio publish instantly, but your browser may be caching the old version</li>
                <li>Do a hard refresh: Press <code className="bg-zinc-100 px-2 py-1 rounded text-xs font-mono">Cmd+Shift+R</code> (Mac) or <code className="bg-zinc-100 px-2 py-1 rounded text-xs font-mono">Ctrl+Shift+R</code> (Windows)</li>
                <li>Check that you clicked "Publish" in Sanity Studio, not just saved as draft</li>
                <li>If still not showing after 30 seconds, click the "Refresh" button above to check API status</li>
              </ol>
            </div>

            {/* Issue 2 */}
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="font-bold text-zinc-900 mb-2">Contact form isn't sending emails</h3>
              <ol className="space-y-2 text-zinc-700 text-sm list-decimal list-inside">
                <li>Check the "Email System" status above - if it shows red, email isn't configured</li>
                <li>Wait 5-10 seconds after submitting - emails may be slow</li>
                <li>Check your spam folder (emails may end up there)</li>
                <li>If the form shows an error message, read it carefully - it tells you what's wrong</li>
              </ol>
            </div>

            {/* Issue 3 */}
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="font-bold text-zinc-900 mb-2">Website is very slow or not loading</h3>
              <ol className="space-y-2 text-zinc-700 text-sm list-decimal list-inside">
                <li>Check your internet connection - try a different network or device</li>
                <li>Clear browser cache: Settings → Privacy → Clear browsing data</li>
                <li>Check the "Sanity CMS Connection" status above - if Sanity is down, the site won't load properly</li>
                <li>Try opening in an incognito/private window to rule out browser extensions</li>
              </ol>
            </div>

            {/* Issue 4 */}
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="font-bold text-zinc-900 mb-2">Images or industry data missing</h3>
              <ol className="space-y-2 text-zinc-700 text-sm list-decimal list-inside">
                <li>In Sanity Studio, open the item and check that all required fields are filled (look for red asterisks)</li>
                <li>Make sure you uploaded an image and set alt text (important for accessibility)</li>
                <li>Check that the "Published" toggle is ON - if it's off, the item won't show on the website</li>
                <li>Click "Publish" after making changes</li>
              </ol>
            </div>

            {/* Issue 5 */}
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="font-bold text-zinc-900 mb-2">Page title or description looks wrong in Google/Social Media</h3>
              <ol className="space-y-2 text-zinc-700 text-sm list-decimal list-inside">
                <li>Edit the page in Sanity Studio and find the "SEO" section</li>
                <li>Set the "Meta Title" (appears in search results) and "Meta Description" (appears below title)</li>
                <li>Add an OG Image for how it looks when shared on social media</li>
                <li>Publish the changes, then wait 24-48 hours for Google to re-index</li>
              </ol>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-zinc-900 mb-2">How long does it take for changes to show on the website?</h3>
              <p className="text-zinc-700 text-sm">
                Changes publish instantly in Sanity Studio. The website updates automatically within 1-2 seconds. If you don't see changes, do a hard refresh of your browser (Cmd/Ctrl+Shift+R).
              </p>
            </div>

            <div>
              <h3 className="font-bold text-zinc-900 mb-2">Can I schedule content to publish at a specific time?</h3>
              <p className="text-zinc-700 text-sm">
                Not currently. Changes publish immediately when you click "Publish" in Sanity Studio. Contact support if you need scheduling features.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-zinc-900 mb-2">What if I accidentally delete something?</h3>
              <p className="text-zinc-700 text-sm">
                Sanity keeps a version history of all changes. Ask support to restore a deleted item - they can retrieve it from the backup.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-zinc-900 mb-2">How do I add a new service or industry?</h3>
              <p className="text-zinc-700 text-sm">
                In Sanity Studio, go to the "Services" or "Industries" section and click "+ Create". Fill in all required fields (marked with red asterisks), upload an image, then click "Publish".
              </p>
            </div>

            <div>
              <h3 className="font-bold text-zinc-900 mb-2">What's the difference between "Save" and "Publish"?</h3>
              <p className="text-zinc-700 text-sm">
                "Save" stores your draft in Sanity. "Publish" makes it live on the website. Always click "Publish" when you're done editing.
              </p>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Need Help?</h2>
          <div className="space-y-2 text-blue-900 text-sm">
            <p>
              <strong>Email support:</strong>{' '}
              <a href="mailto:officemgr@iismet.com" className="underline hover:no-underline">
                officemgr@iismet.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              <a href="tel:+1-503-231-9093" className="underline hover:no-underline">
                +1-503-231-9093
              </a>
            </p>
            <p className="mt-4 text-blue-800">
              When contacting support, include:
              <ul className="list-disc list-inside mt-2 ml-2">
                <li>What you were trying to do</li>
                <li>What went wrong (error message if available)</li>
                <li>Screenshot if helpful</li>
                <li>The timestamp from the "System Health Check" above</li>
              </ul>
            </p>
          </div>

          <Link
            href="/"
            className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            Back to Website
          </Link>
        </div>
      </div>
    </div>
  )
}
