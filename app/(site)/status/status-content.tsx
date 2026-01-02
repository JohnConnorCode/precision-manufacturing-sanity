'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, XCircle, RefreshCw, Copy, Check, Eye, EyeOff, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { typography, spacing, cn } from '@/lib/design-system'
import { getToneTypography } from '@/lib/typography'
import type { ServerLogEntry } from '@/lib/server-logger'

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
  logs?: ServerLogEntry[]
}

interface StatusContentProps {
  siteSettings: any
}

export default function StatusContent({ siteSettings }: StatusContentProps) {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
  const [showEnv, setShowEnv] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [envVars, setEnvVars] = useState<Record<string, string | boolean | null>>({})
  const darkTone = getToneTypography('dark')

  const refreshHealth = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/health/integrations', { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setHealth(data)
      setLastRefresh(new Date())

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
      <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 px-4 dark-section">
      <div className={spacing.containerWide}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 mb-4">
                <span className="text-sm font-medium text-blue-400">Admin Dashboard</span>
              </div>
              <h1 className={cn(typography.heroHeading, darkTone.heading, 'mb-3 uppercase')}>
                System <span style={{
                  background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Status</span>
              </h1>
              <p className={cn(typography.descriptionLight)}>
                Real-time monitoring for IIS precision manufacturing website
              </p>
            </div>
            <Button
              onClick={refreshHealth}
              disabled={loading}
              className={cn(
                'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/25',
                darkTone.heading
              )}
            >
              <RefreshCw className={cn('w-4 h-4 mr-2', loading && 'animate-spin')} />
              {loading ? 'Checking...' : 'Refresh Status'}
            </Button>
          </div>
          {lastRefresh && (
            <p className="text-xs text-slate-500">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          )}
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-red-500/10 border-red-500/20 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-300">Error checking system status</p>
                  <p className="text-red-400 text-sm mt-1">{error}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {health && (
          <div className="space-y-8">
            {/* Overall Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className={cn(
                'p-8 border-2',
                health.healthy
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-amber-500/10 border-amber-500/30'
              )}>
                <div className="flex items-center gap-4">
                  {health.healthy ? (
                    <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-amber-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className={cn(typography.h3, health.healthy ? 'text-green-300' : 'text-amber-300')}>
                      {health.healthy ? '✓ All Systems Operational' : '⚠ Some Systems Need Attention'}
                    </p>
                    <p className={cn(typography.small, health.healthy ? 'text-green-400' : 'text-amber-400')}>
                      {health.healthy
                        ? 'Website is running smoothly'
                        : 'Please review the items below and take appropriate action'}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Grid Layout */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Sanity Connection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="p-6 bg-slate-900/50 border-slate-800">
                  <div className="flex items-center gap-3 mb-4">
                    <StatusIcon ok={health.sanity.connected} />
                    <h3 className={cn(typography.h5, darkTone.heading)}>Sanity CMS</h3>
                  </div>
                  <p className={cn(typography.small, health.sanity.connected ? 'text-green-400' : 'text-red-400', 'mb-3')}>
                    {health.sanity.message}
                  </p>
                  <div className="text-xs text-slate-500">
                    Response time: <span className="text-slate-300 font-mono">{health.sanity.responseTime}ms</span>
                  </div>
                  {!health.sanity.connected && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-300">
                      ⚠️ Cannot connect to Sanity. Check internet connection or contact support.
                    </div>
                  )}
                </Card>
              </motion.div>

              {/* Email Configuration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="p-6 bg-slate-900/50 border-slate-800">
                  <div className="flex items-center gap-3 mb-4">
                    <StatusIcon ok={health.email.configured} />
                    <h3 className={cn(typography.h5, darkTone.heading)}>Email System</h3>
                  </div>
                  <p className={cn(typography.small, health.email.configured ? 'text-green-400' : 'text-amber-400', 'mb-3')}>
                    {health.email.message}
                  </p>
                  {!health.email.configured && (
                    <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm text-amber-300">
                      ⚠️ Email not configured. Contact form submissions cannot be emailed.
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>

            {/* API Endpoints */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6 bg-slate-900/50 border-slate-800">
                <h3 className={cn(typography.h5, darkTone.heading, 'mb-6 flex items-center gap-2')}>
                  <StatusIcon ok={health.apis.navigation && health.apis.footer && health.apis.siteSettings} />
                  Content APIs
                </h3>
                <div className="space-y-3">
                  {[
                    { ok: health.apis.navigation, name: 'Navigation API', endpoint: '/api/cms/navigation' },
                    { ok: health.apis.footer, name: 'Footer API', endpoint: '/api/cms/footer' },
                    { ok: health.apis.siteSettings, name: 'Site Settings API', endpoint: '/api/cms/site-settings' },
                  ].map((api) => (
                    <div key={api.name} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <StatusIcon ok={api.ok} />
                        <span className="text-slate-300">{api.name}</span>
                      </div>
                      <code className="text-xs bg-slate-900 px-3 py-1.5 rounded-lg text-blue-400">{api.endpoint}</code>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Configuration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="p-6 bg-slate-900/50 border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={cn(typography.h5, darkTone.heading)}>Configuration</h3>
                  <Button
                    onClick={() => setShowEnv(!showEnv)}
                    variant="ghost"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {showEnv ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showEnv ? 'Hide' : 'Show'}
                  </Button>
                </div>

                {showEnv ? (
                  <div className="space-y-2">
                    {Object.entries(envVars).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg font-mono text-sm"
                      >
                        <div>
                          <span className="text-amber-400">{key}</span>
                          <span className="text-slate-500 mx-2">=</span>
                          <span className={value === null ? 'text-red-400' : 'text-green-400'}>
                            {String(value) || '(not set)'}
                          </span>
                        </div>
                        {typeof value === 'string' && (
                          <button
                            onClick={() => copyToClipboard(value, key)}
                            className="text-slate-500 hover:text-slate-300 transition-colors"
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
                  <p className={cn(typography.small, 'text-slate-500')}>
                    Click &quot;Show&quot; to view environment variables
                  </p>
                )}
              </Card>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="p-6 bg-slate-900/50 border-slate-800">
                <h3 className={cn(typography.h5, darkTone.heading, 'mb-6')}>Quick Links</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { href: '/troubleshooting', label: '📋 Troubleshooting Guide' },
                    { href: '/api/health/integrations', label: '🔍 Health Check API' },
                    { href: '/contact', label: '💬 Contact Form' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl transition-all duration-300 text-center"
                    >
                      <span className="text-sm font-medium text-blue-400 group-hover:text-blue-300 inline-flex items-center gap-2">
                        {link.label}
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </span>
                    </Link>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recent Server Logs */}
            {health.logs && health.logs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
              >
                <Card className="p-6 bg-slate-900/50 border-slate-800">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={cn(typography.h5, darkTone.heading)}>Recent Server Logs</h3>
                    <span className={cn('text-xs font-mono', darkTone.muted)}>
                      Last {health.logs.length} events
                    </span>
                  </div>
                  <div className="space-y-3">
                    {health.logs.map((log) => (
                      <div
                        key={log.id}
                        className="p-4 rounded-xl bg-slate-900/70 border border-slate-800"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={cn(
                              'text-xs font-semibold uppercase tracking-wide',
                              log.level === 'error'
                                ? 'text-red-300'
                                : log.level === 'warn'
                                ? 'text-amber-300'
                                : 'text-blue-300'
                            )}
                          >
                            {log.level}
                          </span>
                          <span className="text-xs font-mono text-slate-500">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className={cn('text-sm font-medium', darkTone.body)}>
                          {log.message}
                        </p>
                        <p className={cn('text-xs mt-1', darkTone.muted)}>
                          {log.scope}
                          {log.context?.query != null && (
                            <>
                              {' '}
                              &mdash; <span>{String(log.context.query)}</span>
                            </>
                          )}
                        </p>
                        {log.stack && (
                          <pre className="mt-2 text-[11px] text-slate-500 font-mono whitespace-pre-wrap">
                            {log.stack.split('\n')[0]}
                          </pre>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Support Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="p-8 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border-blue-600/20">
                <h3 className={cn(typography.h4, 'text-blue-300 mb-4')}>Need Help?</h3>
                <div className="space-y-3 text-sm text-blue-100">
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${siteSettings?.contact?.supportEmail || 'officemgr@iismet.com'}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                      {siteSettings?.contact?.supportEmail || 'officemgr@iismet.com'}
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a href={`tel:${siteSettings?.contact?.phone?.replace(/\D/g, '')}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                      {siteSettings?.contact?.phone}
                    </a>
                  </p>
                  <p className="text-xs text-blue-300 mt-4 p-3 bg-blue-600/10 rounded-lg">
                    💡 <strong>Tip:</strong> Use this page to diagnose issues before contacting support.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {loading && !health && (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className={cn(typography.body, 'text-slate-400')}>Checking system health...</p>
          </div>
        )}
      </div>
    </div>
  )
}
