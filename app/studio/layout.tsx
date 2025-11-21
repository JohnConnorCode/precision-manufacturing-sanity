export { metadata, viewport } from 'next-sanity/studio'

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Root layout provides html/body tags
  // This layout just wraps studio-specific content
  return <div style={{ margin: 0 }}>{children}</div>
}
