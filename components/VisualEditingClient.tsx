'use client'

import { VisualEditing } from 'next-sanity'
import { useRouter } from 'next/navigation'

export default function VisualEditingClient() {
  const router = useRouter()

  return (
    <VisualEditing
      refresh={(_payload) => {
        // Refresh the page when content changes in the Studio
        router.refresh()
        return false
      }}
    />
  )
}

