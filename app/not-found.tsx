'use client';

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 md:p-12 text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <FileQuestion className="w-12 h-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-slate-900 mb-2">404</h1>

        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/">
            <Button className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white">
              <Home className="w-4 h-4 mr-2" />
              Go to homepage
            </Button>
          </Link>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go back
          </Button>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-500 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <Link href="/services" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-cyan-400 font-medium">
              Services
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/industries" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-cyan-400 font-medium">
              Industries
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/resources" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-cyan-400 font-medium">
              Resources
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/about" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-cyan-400 font-medium">
              About
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/contact" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-cyan-400 font-medium">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} IIS Precision Manufacturing
          </p>
        </div>
      </div>
    </div>
  )
}
