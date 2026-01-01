'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, XCircle, RefreshCw, HelpCircle, BookOpen, MessageCircle, ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { typography, spacing, cn } from '@/lib/design-system'

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

interface TroubleshootingContentProps {
  siteSettings: any
}

export default function TroubleshootingContent({ siteSettings }: TroubleshootingContentProps) {
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
      <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    )

  const issues = [
    {
      title: "Content changes don't appear on website",
      steps: [
        "Changes in Sanity Studio publish instantly, but your browser may be caching the old version",
        <>Do a hard refresh: Press <code className="bg-slate-800 px-2 py-1 rounded text-xs font-mono text-blue-400">Cmd+Shift+R</code> (Mac) or <code className="bg-slate-800 px-2 py-1 rounded text-xs font-mono text-blue-400">Ctrl+Shift+R</code> (Windows)</>,
        <>Check that you clicked &quot;Publish&quot; in Sanity Studio, not just saved as draft</>,
        <>If still not showing after 30 seconds, click the &quot;Refresh&quot; button above to check API status</>
      ]
    },
    {
      title: "Contact form isn't sending emails",
      steps: [
        <>Check the &quot;Email System&quot; status above - if it shows red, email isn&apos;t configured</>,
        "Wait 5-10 seconds after submitting - emails may be slow",
        "Check your spam folder (emails may end up there)",
        "If the form shows an error message, read it carefully - it tells you what's wrong"
      ]
    },
    {
      title: "Website is very slow or not loading",
      steps: [
        "Check your internet connection - try a different network or device",
        "Clear browser cache: Settings → Privacy → Clear browsing data",
        <>Check the &quot;Sanity CMS Connection&quot; status above - if Sanity is down, the site won&apos;t load properly</>,
        "Try opening in an incognito/private window to rule out browser extensions"
      ]
    },
    {
      title: "Images or industry data missing",
      steps: [
        "In Sanity Studio, open the item and check that all required fields are filled (look for red asterisks)",
        "Make sure you uploaded an image and set alt text (important for accessibility)",
        <>Check that the &quot;Published&quot; toggle is ON - if it&apos;s off, the item won&apos;t show on the website</>,
        <>Click &quot;Publish&quot; after making changes</>
      ]
    },
    {
      title: "Page title or description looks wrong in Google/Social Media",
      steps: [
        <>Edit the page in Sanity Studio and find the &quot;SEO&quot; section</>,
        <>Set the &quot;Meta Title&quot; (appears in search results) and &quot;Meta Description&quot; (appears below title)</>,
        "Add an OG Image for how it looks when shared on social media",
        "Publish the changes, then wait 24-48 hours for Google to re-index"
      ]
    }
  ]

  const faqs = [
    {
      question: "How long does it take for changes to show on the website?",
      answer: "Changes publish instantly in Sanity Studio. The website updates automatically within 1-2 seconds. If you don't see changes, do a hard refresh of your browser (Cmd/Ctrl+Shift+R)."
    },
    {
      question: "Can I schedule content to publish at a specific time?",
      answer: "Not currently. Changes publish immediately when you click \"Publish\" in Sanity Studio. Contact support if you need scheduling features."
    },
    {
      question: "What if I accidentally delete something?",
      answer: "Sanity keeps a version history of all changes. Ask support to restore a deleted item - they can retrieve it from the backup."
    },
    {
      question: "How do I add a new service or industry?",
      answer: "In Sanity Studio, go to the \"Services\" or \"Industries\" section and click \"+ Create\". Fill in all required fields (marked with red asterisks), upload an image, then click \"Publish\"."
    },
    {
      question: "What's the difference between \"Save\" and \"Publish\"?",
      answer: "\"Save\" stores your draft in Sanity. \"Publish\" makes it live on the website. Always click \"Publish\" when you're done editing."
    }
  ]

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 mb-4">
            <HelpCircle className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Help Center</span>
          </div>
          <h1 className={cn(typography.heroHeading, 'text-tone-inverse mb-3 uppercase')}>
            Troubleshooting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">Guide</span>
          </h1>
          <p className={cn(typography.descriptionLight)}>
            Self-service solutions for common issues and system status monitoring
          </p>
        </motion.div>

        {/* Health Status Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="p-8 bg-slate-900/50 border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className={cn(typography.h4, 'text-tone-inverse')}>System Health Check</h2>
              <Button
                onClick={refreshHealth}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-tone-inverse shadow-lg shadow-blue-600/25"
              >
                <RefreshCw className={cn('w-4 h-4 mr-2', loading && 'animate-spin')} />
                {loading ? 'Checking...' : 'Refresh'}
              </Button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-300">Error checking system status</p>
                  <p className="text-red-400 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {health && (
              <div className="space-y-6">
                {/* Overall Status */}
                <div className={cn(
                  'rounded-xl p-4 border-2',
                  health.healthy ? 'bg-green-500/10 border-green-500/30' : 'bg-amber-500/10 border-amber-500/30'
                )}>
                  <div className="flex items-center gap-3">
                    {health.healthy ? (
                      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
                    )}
                    <div>
                      <p className={cn('font-bold', health.healthy ? 'text-green-300' : 'text-amber-300')}>
                        {health.healthy ? '✓ All Systems Operational' : '⚠ Some Systems Need Attention'}
                      </p>
                      <p className={cn('text-sm', health.healthy ? 'text-green-400' : 'text-amber-400')}>
                        Last checked: {new Date(health.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Individual Checks */}
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Sanity Connection */}
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                      <StatusIcon ok={health.sanity.connected} />
                      <h3 className="font-semibold text-tone-inverse">Sanity CMS</h3>
                    </div>
                    <p className="text-sm text-slate-400">
                      {health.sanity.message}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Response: <span className="font-mono text-slate-300">{health.sanity.responseTime}ms</span>
                    </p>
                  </div>

                  {/* API Status */}
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                      <StatusIcon ok={health.apis.navigation && health.apis.footer && health.apis.siteSettings} />
                      <h3 className="font-semibold text-tone-inverse">Content APIs</h3>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <StatusIcon ok={health.apis.navigation} />
                        <span className="text-slate-400">Navigation</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <StatusIcon ok={health.apis.footer} />
                        <span className="text-slate-400">Footer</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <StatusIcon ok={health.apis.siteSettings} />
                        <span className="text-slate-400">Site Settings</span>
                      </div>
                    </div>
                  </div>

                  {/* Email Status */}
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                      <StatusIcon ok={health.email.configured} />
                      <h3 className="font-semibold text-tone-inverse">Email System</h3>
                    </div>
                    <p className="text-sm text-slate-400">{health.email.message}</p>
                    {!health.email.configured && (
                      <p className="text-xs text-amber-400 mt-2">
                        Contact form emails disabled
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-500 text-center">
                  Last refresh: {lastRefresh?.toLocaleTimeString()}
                </p>
              </div>
            )}

            {loading && !health && (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-2" />
                <p className="text-slate-400">Checking system health...</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Common Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-8 bg-slate-900/50 border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className={cn(typography.h4, 'text-tone-inverse')}>Common Issues & Solutions</h2>
            </div>

            <div className="space-y-6">
              {issues.map((issue, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="border-l-4 border-blue-600 pl-6 py-2"
                >
                  <h3 className="font-bold text-tone-inverse mb-3">{issue.title}</h3>
                  <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
                    {issue.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ol>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <Card className="p-8 bg-slate-900/50 border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-indigo-400" />
              </div>
              <h2 className={cn(typography.h4, 'text-tone-inverse')}>Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="p-4 bg-slate-800/50 rounded-xl border border-slate-700"
                >
                  <h3 className="font-bold text-tone-inverse mb-2">{faq.question}</h3>
                  <p className="text-sm text-slate-400">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-8 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border-blue-600/20">
            <h2 className={cn(typography.h4, 'text-blue-300 mb-4')}>Need More Help?</h2>
            <div className="space-y-3 text-sm text-blue-100">
              <p>
                <strong>Email support:</strong>{' '}
                <a
                  href={`mailto:${siteSettings?.contact?.supportEmail || 'officemgr@iismet.com'}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {siteSettings?.contact?.supportEmail || 'officemgr@iismet.com'}
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a
                  href={`tel:${siteSettings?.contact?.phone?.replace(/\D/g, '')}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {siteSettings?.contact?.phone}
                </a>
              </p>
              <div className="mt-4 p-4 bg-blue-600/10 rounded-xl border border-blue-600/20">
                <p className="text-blue-200 mb-2"><strong>When contacting support, include:</strong></p>
                <ul className="list-disc list-inside text-blue-300 space-y-1">
                  <li>What you were trying to do</li>
                  <li>What went wrong (error message if available)</li>
                  <li>Screenshot if helpful</li>
                  <li>The timestamp from the System Health Check above</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <Link href="/">
                <Button className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-tone-inverse shadow-lg shadow-blue-600/25">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Website
                </Button>
              </Link>
              <Link href="/status">
                <Button variant="outline" className="border-blue-600/30 text-blue-400 hover:bg-blue-600/10">
                  View Full Status
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
