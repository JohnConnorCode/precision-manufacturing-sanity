'use client'

import { VisualEditing } from '@sanity/visual-editing/react'
import { useRouter } from 'next/navigation'

export default function VisualEditingClient() {
  const router = useRouter()

  return (
    <VisualEditing
      zIndex={1000000}
      portal={false}
      refresh={(_payload) => {
        // Refresh the page when content changes in the Studio
        router.refresh()
        return false
      }}
    />
  )
}

