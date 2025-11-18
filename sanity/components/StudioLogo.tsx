import React from 'react'

export default function StudioLogo() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 0'
    }}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Industrial gear/precision icon */}
        <circle cx="16" cy="16" r="14" fill="#2563eb" opacity="0.1"/>
        <path
          d="M16 4L18 8L22 8L19 11L20 15L16 13L12 15L13 11L10 8L14 8L16 4Z"
          fill="#2563eb"
        />
        <circle cx="16" cy="16" r="4" fill="#2563eb"/>
        <circle cx="16" cy="16" r="2" fill="white"/>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
        <span style={{
          fontWeight: 700,
          fontSize: '15px',
          color: '#1e293b',
          letterSpacing: '-0.02em'
        }}>
          IIS Precision
        </span>
        <span style={{
          fontSize: '11px',
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontWeight: 600
        }}>
          Content Studio
        </span>
      </div>
    </div>
  )
}
