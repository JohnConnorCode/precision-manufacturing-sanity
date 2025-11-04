import { draftMode } from 'next/headers'
import Link from 'next/link'

export default async function PreviewBanner() {
  const { isEnabled } = await draftMode()
  if (!isEnabled) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-[200]">
      <div className="mx-auto max-w-screen-xl px-4 pb-4">
        <div className="rounded-lg border border-amber-300 bg-amber-50 text-amber-900 shadow-sm flex items-center justify-between px-4 py-3">
          <p className="text-sm font-medium">Preview mode is ON. Content is live-editable.</p>
          <div className="flex items-center gap-3">
            <Link href="/api/exit-preview" className="text-sm font-semibold text-amber-900 underline">Exit preview</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

