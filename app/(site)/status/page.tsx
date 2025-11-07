'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle2, XCircle, RefreshCw, Copy, Check, Eye, EyeOff } from 'lucide-react'
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

export default function StatusPage() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
  const [showEnv, setShowEnv] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [envVars, setEnvVars] = useState<Record<string, string | boolean | null>>({})

  const refreshHealth = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/health/integrations', { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setHealth(data)
      setLastRefresh(new Date())

      // Load environment variables info (what's configured)
      setEnvVars({
        'SMTP_HOST': process.env.NEXT_PUBLIC_SMTP_HOST ? '✓ Configured' : null,
        'SMTP_USER': process.env.NEXT_PUBLIC_SMTP_USER ? '✓ Configured' : null,
        'SMTP_PASS': process.env.NEXT_PUBLIC_SMTP_PASS ? '✓ Configured' : null,
        'NODE_ENV': process.env.NODE_ENV,
        'NEXT_PUBLIC_SANITY_PROJECT_ID': process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'Not set',
        'NEXT_PUBLIC_SANITY_DATASET': process.env.NEXT_PUBLIC_SANITY_DATASET || 'Not set',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch health status')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshHealth()
  }, [])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const StatusIcon = ({ ok }: { ok: boolean }) =>
    ok ? (
      <CheckCircle2 className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-600" />
    )

  const HealthBar = ({ ok }: { ok: boolean }) => (
    <div className={`h-2 rounded-full ${ok ? 'bg-green-600' : 'bg-red-600'}`} />
  )

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold mb-2">System Status Dashboard</h1>
              <p className="text-zinc-400">Real-time monitoring for IIS precision manufacturing website</p>
            </div>
            <button
              onClick={refreshHealth}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Checking...' : 'Refresh Status'}
            </button>
          </div>
          {lastRefresh && (
            <p className="text-xs text-zinc-500">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-950 border border-red-800 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-200">Error checking system status</p>
              <p className="text-red-300 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {health && (
          <div className="space-y-6">
            {/* Overall Status Card */}
            <div className={`rounded-lg p-6 border-2 ${health.healthy ? 'bg-green-950 border-green-800' : 'bg-yellow-950 border-yellow-800'}`}>
              <div className="flex items-center gap-4">
                {health.healthy ? (
                  <CheckCircle2 className="w-8 h-8 text-green-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className={`text-2xl font-bold ${health.healthy ? 'text-green-200' : 'text-yellow-200'}`}>
                    {health.healthy ? '✓ All Systems Operational' : '⚠ Some Systems Need Attention'}
                  </p>
                  <p className={`text-sm ${health.healthy ? 'text-green-300' : 'text-yellow-300'}`}>
                    {health.healthy
                      ? 'Website is running smoothly'
                      : 'Please review the items below and take appropriate action'}
                  </p>
                </div>
              </div>
              <HealthBar ok={health.healthy} />
            </div>

            {/* Grid Layout */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Sanity Connection */}
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <div className="flex items-center gap-3 mb-4">
                  <StatusIcon ok={health.sanity.connected} />
                  <h3 className="text-lg font-semibold text-white">Sanity CMS</h3>
                </div>
                <p className={`text-sm mb-3 ${health.sanity.connected ? 'text-green-400' : 'text-red-400'}`}>
                  {health.sanity.message}
                </p>
                <div className="text-xs text-zinc-500">
                  Response time: <span className="text-zinc-300 font-mono">{health.sanity.responseTime}ms</span>
                </div>
                {!health.sanity.connected && (
                  <div className="mt-3 p-3 bg-red-950 border border-red-800 rounded text-sm text-red-200">
                    ⚠️ Cannot connect to Sanity. Check internet connection or contact support.
                  </div>
                )}
              </div>

              {/* Email Configuration */}
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <div className="flex items-center gap-3 mb-4">
                  <StatusIcon ok={health.email.configured} />
                  <h3 className="text-lg font-semibold text-white">Email System</h3>
                </div>
                <p className={`text-sm mb-3 ${health.email.configured ? 'text-green-400' : 'text-yellow-400'}`}>
                  {health.email.message}
                </p>
                {!health.email.configured && (
                  <div className="mt-3 p-3 bg-yellow-950 border border-yellow-800 rounded text-sm text-yellow-200">
                    ⚠️ Email not configured. Contact form submissions cannot be emailed. Set up SendGrid SMTP credentials.
                  </div>
                )}
              </div>
            </div>

            {/* API Endpoints */}
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <StatusIcon ok={health.apis.navigation && health.apis.footer && health.apis.siteSettings} />
                Content APIs
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-800 rounded">
                  <div className="flex items-center gap-3">
                    <StatusIcon ok={health.apis.navigation} />
                    <span>Navigation API</span>
                  </div>
                  <code className="text-xs bg-zinc-950 px-3 py-1 rounded text-blue-400">/api/cms/navigation</code>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800 rounded">
                  <div className="flex items-center gap-3">
                    <StatusIcon ok={health.apis.footer} />
                    <span>Footer API</span>
                  </div>
                  <code className="text-xs bg-zinc-950 px-3 py-1 rounded text-blue-400">/api/cms/footer</code>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800 rounded">
                  <div className="flex items-center gap-3">
                    <StatusIcon ok={health.apis.siteSettings} />
                    <span>Site Settings API</span>
                  </div>
                  <code className="text-xs bg-zinc-950 px-3 py-1 rounded text-blue-400">/api/cms/site-settings</code>
                </div>
              </div>
            </div>

            {/* Environment Variables */}
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Configuration</h3>
                <button
                  onClick={() => setShowEnv(!showEnv)}
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {showEnv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showEnv ? 'Hide' : 'Show'}
                </button>
              </div>

              {showEnv ? (
                <div className="space-y-2">
                  {Object.entries(envVars).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-3 bg-zinc-800 rounded font-mono text-sm"
                    >
                      <div>
                        <span className="text-yellow-400">{key}</span>
                        <span className="text-zinc-500 mx-2">=</span>
                        <span className={value === null ? 'text-red-400' : 'text-green-400'}>
                          {String(value) || '(not set)'}
                        </span>
                      </div>
                      {typeof value === 'string' && (
                        <button
                          onClick={() => copyToClipboard(value, key)}
                          className="text-zinc-500 hover:text-zinc-300 transition-colors"
                          title="Copy to clipboard"
                        >
                          {copiedText === key ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-400">Click "Show" to view environment variables</p>
              )}
            </div>

            {/* Quick Links */}
            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Link
                  href="/troubleshooting"
                  className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors text-center text-sm font-medium text-blue-400"
                >
                  📋 Troubleshooting Guide
                </Link>
                <Link
                  href="/api/health/integrations"
                  className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors text-center text-sm font-medium text-blue-400"
                >
                  🔍 Health Check API
                </Link>
                <Link
                  href="/contact"
                  className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors text-center text-sm font-medium text-blue-400"
                >
                  💬 Contact Form
                </Link>
              </div>
            </div>

            {/* Support Info */}
            <div className="bg-blue-950 border border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-200 mb-3">Need Help?</h3>
              <div className="space-y-2 text-sm text-blue-100">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:officemgr@iismet.com" className="text-blue-400 hover:underline">
                    officemgr@iismet.com
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+1-503-231-9093" className="text-blue-400 hover:underline">
                    +1-503-231-9093
                  </a>
                </p>
                <p className="text-xs text-blue-300 mt-3">
                  💡 <strong>Tip:</strong> Use this page to diagnose issues before contacting support. Share the timestamp and status information when reporting problems.
                </p>
              </div>
            </div>
          </div>
        )}

        {loading && !health && (
          <div className="flex flex-col items-center justify-center py-12">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-zinc-400">Checking system health...</p>
          </div>
        )}
      </div>
    </div>
  )
}
