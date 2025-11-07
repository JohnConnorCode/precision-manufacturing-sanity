'use client'

import React from 'react'

export default function HelpDashboard() {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '8px', fontSize: '32px', fontWeight: 'bold' }}>
        Welcome to IIS Precision Manufacturing CMS
      </h1>
      <p style={{ marginBottom: '32px', color: '#666', fontSize: '16px' }}>
        Your complete guide to managing website content
      </p>

      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {/* Quick Start */}
        <div style={{ padding: '24px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>🚀 Quick Start</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <strong>Edit Homepage:</strong> Navigate to Globals → Homepage
            </li>
            <li>
              <strong>Add Service:</strong> Go to Collections → Services → Create New
            </li>
            <li>
              <strong>Upload Images:</strong> Collections → Media → Upload
            </li>
            <li>
              <strong>Preview Changes:</strong> Click &quot;Live Preview&quot; button when editing
            </li>
          </ul>
        </div>

        {/* Collections */}
        <div style={{ padding: '24px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>📁 Collections</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <strong>Services:</strong> Manage machining services (4 total)
            </li>
            <li>
              <strong>Industries:</strong> Edit industry pages (4 total)
            </li>
            <li>
              <strong>Resources:</strong> Blog articles and guides (50 total)
            </li>
            <li>
              <strong>Team Members:</strong> Staff profiles and photos
            </li>
            <li>
              <strong>Media:</strong> All images and files
            </li>
          </ul>
        </div>

        {/* Globals */}
        <div style={{ padding: '24px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>🌐 Globals</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <strong>Homepage:</strong> Hero section, stats, CTAs
            </li>
            <li>
              <strong>Site Settings:</strong> Company info, SEO, analytics
            </li>
            <li>
              <strong>Navigation:</strong> Header menu and top bar
            </li>
            <li>
              <strong>Footer:</strong> Footer links and content
            </li>
            <li>
              <strong>About/Contact:</strong> Page-specific content
            </li>
          </ul>
        </div>
      </div>

      {/* Common Tasks */}
      <div style={{ marginTop: '32px', padding: '24px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>📝 Common Tasks</h2>

        <div style={{ display: 'grid', gap: '32px' }}>
          {/* Task 1 */}
          <div>
            <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '600', color: '#2563eb' }}>
              1. How to Edit a Service
            </h3>
            <ol style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#374151' }}>
              <li>Navigate to <strong>Collections → Services</strong></li>
              <li>Click on the service you want to edit (e.g., &quot;5-Axis Machining&quot;)</li>
              <li>Update fields like title, description, specs, or images</li>
              <li>Click <strong>&quot;Live Preview&quot;</strong> to see changes in real-time</li>
              <li>Click <strong>&quot;Save&quot;</strong> when finished</li>
            </ol>
          </div>

          {/* Task 2 */}
          <div>
            <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '600', color: '#2563eb' }}>
              2. How to Upload and Use Images
            </h3>
            <ol style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#374151' }}>
              <li>Go to <strong>Collections → Media</strong></li>
              <li>Click <strong>&quot;Create New&quot;</strong> or drag and drop images</li>
              <li>Fill in <strong>Alt Text</strong> (required for accessibility)</li>
              <li>Optionally add a caption</li>
              <li>Click <strong>&quot;Create&quot;</strong> to upload</li>
              <li>To use the image: In any content page, select the image from the media picker</li>
            </ol>
          </div>

          {/* Task 3 */}
          <div>
            <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '600', color: '#2563eb' }}>
              3. How to Update Homepage Content
            </h3>
            <ol style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#374151' }}>
              <li>Navigate to <strong>Globals → Homepage</strong></li>
              <li>Edit sections like:</li>
              <ul style={{ marginLeft: '20px', marginTop: '4px' }}>
                <li><strong>Hero:</strong> Main headline and badges</li>
                <li><strong>Stats:</strong> Company statistics</li>
                <li><strong>Technical Specs:</strong> Capabilities showcase</li>
                <li><strong>CTA:</strong> Call-to-action section</li>
              </ul>
              <li>Use <strong>&quot;Live Preview&quot;</strong> to see changes</li>
              <li>Click <strong>&quot;Save&quot;</strong> to publish</li>
            </ol>
          </div>

          {/* Task 4 */}
          <div>
            <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '600', color: '#2563eb' }}>
              4. How to Create a New Resource Article
            </h3>
            <ol style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#374151' }}>
              <li>Go to <strong>Collections → Resources</strong></li>
              <li>Click <strong>&quot;Create New&quot;</strong></li>
              <li>Fill in required fields:</li>
              <ul style={{ marginLeft: '20px', marginTop: '4px' }}>
                <li><strong>Title:</strong> Article headline</li>
                <li><strong>Slug:</strong> URL-friendly name (e.g., &quot;cnc-machining-guide&quot;)</li>
                <li><strong>Category:</strong> manufacturing-processes, material-science, etc.</li>
                <li><strong>Excerpt:</strong> Short summary</li>
                <li><strong>Content:</strong> Full article body (use rich text editor)</li>
              </ul>
              <li>Set difficulty level and read time</li>
              <li>Add tags for better organization</li>
              <li>Click <strong>&quot;Create&quot;</strong> to publish</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Tips & Best Practices */}
      <div style={{ marginTop: '32px', padding: '24px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#fffbeb' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>💡 Tips & Best Practices</h2>
        <ul style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: '#374151' }}>
          <li>
            <strong>Always add Alt Text to images:</strong> This is crucial for SEO and accessibility
          </li>
          <li>
            <strong>Use Live Preview:</strong> Preview your changes before saving to ensure they look correct
          </li>
          <li>
            <strong>Slug format:</strong> Use lowercase letters, numbers, and hyphens only (e.g., &quot;5-axis-machining&quot;)
          </li>
          <li>
            <strong>Image optimization:</strong> Upload high-quality images - they&apos;re automatically optimized and resized
          </li>
          <li>
            <strong>Rich text editor:</strong> Use headings, bold, italics, and lists to format content professionally
          </li>
          <li>
            <strong>Draft vs Published:</strong> You can save drafts without publishing to production
          </li>
          <li>
            <strong>SEO fields:</strong> Fill in meta descriptions and titles for better search engine visibility
          </li>
        </ul>
      </div>

      {/* Important Notes */}
      <div style={{ marginTop: '32px', padding: '24px', border: '1px solid #dc2626', borderRadius: '8px', backgroundColor: '#fef2f2' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#dc2626' }}>⚠️ Important Notes</h2>
        <ul style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: '#374151' }}>
          <li>
            <strong>Changes are live immediately:</strong> When you click &quot;Save&quot;, changes appear on the website within seconds
          </li>
          <li>
            <strong>Media storage:</strong> All images are stored in Vercel Blob and are persistent across deployments
          </li>
          <li>
            <strong>Do not delete:</strong> Avoid deleting services or industries without consulting the tech team
          </li>
          <li>
            <strong>Backup:</strong> All content is automatically backed up to MongoDB Atlas
          </li>
        </ul>
      </div>

      {/* Need Help */}
      <div style={{ marginTop: '32px', padding: '24px', border: '1px solid #10b981', borderRadius: '8px', backgroundColor: '#ecfdf5', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#10b981' }}>📞 Need Help?</h2>
        <p style={{ color: '#374151', marginBottom: '16px' }}>
          If you encounter any issues or need assistance, please contact:
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <strong>Email:</strong>{' '}
            <a href="mailto:officemgr@iismet.com" style={{ color: '#2563eb', textDecoration: 'none' }}>
              officemgr@iismet.com
            </a>
          </div>
          <div>
            <strong>Phone:</strong>{' '}
            <a href="tel:+15032319093" style={{ color: '#2563eb', textDecoration: 'none' }}>
              (503) 231-9093
            </a>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p style={{ marginTop: '32px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
        This dashboard provides quick reference for managing your website content.
        <br />
        Navigate using the sidebar to access all collections and globals.
      </p>
    </div>
  )
}
