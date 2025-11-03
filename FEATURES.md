# 🚀 Sanity CMS - Advanced Features Guide

This Sanity CMS implementation includes enterprise-grade features for powerful content management, collaboration, and optimization.

## 📚 Table of Contents

- [Image Management](#-image-management)
- [Content Organization](#-content-organization)
- [Workflow & Publishing](#-workflow--publishing)
- [Collaboration](#-collaboration)
- [Analytics & Insights](#-analytics--insights)
- [Asset Management](#-asset-management)
- [Content Relationships](#-content-relationships)
- [Custom Actions](#-custom-actions)
- [Templates](#-templates)

---

## 🖼️ Image Management

### Hotspot & Crop Controls
**All 40+ image fields** include hotspot and crop controls:
- **Focal Point Selection**: Click to set the focal point that remains visible in responsive crops
- **Custom Cropping**: Define custom crop areas for different aspect ratios
- **Metadata Extraction**: Automatic blurhash, LQIP (Low Quality Image Placeholder), and color palette

**Usage in Studio:**
1. Upload an image
2. Click "Edit" on the image
3. Use the crosshair to set the focal point
4. Adjust crop handles for different sizes

### Image Optimization Presets
```typescript
thumbnail: 200x200 (crop)
card: 400x300 (crop)
hero: 1920x1080 (crop)
og: 1200x630 (crop for social sharing)
```

### Best Practices
- **Minimum size**: 400x300px
- **Recommended**: 1920x1080px for hero images
- **Max file size**: 10MB
- **Format**: JPEG, PNG, WebP, SVG

---

## 📁 Content Organization

### Custom Desk Structure
Content is organized into logical groups:

**Main Content**
- Homepage (singleton)
- Services (4 documents)
- Industries (3 documents)

**Resources by Category**
- Manufacturing Processes
- Material Science
- Quality & Compliance
- Industry Applications
- Calculators & Tools

**Pages**
- About
- Contact
- Careers
- Compliance & Legal

**Site Configuration**
- Site Settings
- Navigation
- Footer

### Smart Filtering
Resources automatically filter by category in the sidebar for easy content discovery.

---

## 📝 Workflow & Publishing

### Multi-Step Approval Process

**Workflow States:**
1. **Draft**: Initial content creation
2. **In Review**: Submitted for approval
3. **Approved**: Ready to publish
4. **Rejected**: Needs revisions
5. **Published**: Live on site

**Features:**
- Assign reviewers
- Add review notes
- Track approval history
- Email notifications (configurable)

### Scheduled Publishing

**Schedule content to publish/unpublish automatically:**
- Set future publish date
- Set automatic unpublish date
- Validation prevents scheduling conflicts
- Visual indicators for scheduled content

**Example Use Cases:**
- Product launches
- Seasonal content
- Time-sensitive promotions
- Event-based updates

---

## 🤝 Collaboration

### Real-Time Features

**Presence Indicators:**
- See who's viewing/editing documents
- Real-time cursor positions
- Active user avatars
- Field-level presence

**Document Locking:**
- 5-minute edit locks
- Warning before lock expires
- Automatic lock release

**Comments & Discussions:**
- Field-level comments
- Threaded discussions
- @mentions
- Reactions
- Mark as resolved

### Activity Feed
Track all changes:
- Document edits
- Publications
- Comments added
- Status changes
- User assignments

---

## 📊 Analytics & Insights

### Content Performance

**Track:**
- Page views per document
- Edit history
- Time on page
- Engagement metrics

**Get Insights:**
```typescript
// Most viewed content
getMostViewed('service', 10)

// Content needing attention
getContentNeedingAttention()

// Performance report
getPerformanceReport({ start, end })
```

### Search Analytics
- Track search queries
- Popular searches
- Failed searches (no results)
- Search-to-conversion metrics

### Performance Monitoring
- Page load times
- API latency
- Image loading performance
- Build times

**Export Options:**
- CSV export
- Date range filtering
- Custom metrics

---

## 🎨 Asset Management

### Advanced Organization

**Category System:**
- Product Images
- Team Photos
- Equipment
- Facilities
- Marketing Materials
- Technical Diagrams
- Logos & Branding

**Tagging:**
- Custom tags per asset
- Tag-based search
- Tag autocomplete
- Tag suggestions

### Asset Tracking

**Know where assets are used:**
- Automatic usage tracking
- Reference counting
- Find orphaned assets
- Most referenced assets

**SEO Optimization:**
- Alt text suggestions
- File naming best practices
- Size optimization alerts
- Format recommendations

---

## 🔗 Content Relationships

### Automatic Relationship Mapping

**Services can relate to:**
- Industries
- Resources
- Team Members (experts)

**Industries can relate to:**
- Services
- Resources

**Resources can relate to:**
- Services
- Industries
- Other Resources

### Relationship Queries

```typescript
// Get all related content
getRelatedDocuments(documentId, documentType)

// Get relationship graph
getRelationshipGraph(documentId)

// Find orphaned content
findOrphanedDocuments(documentType)

// Find broken references
findBrokenReferences()
```

### Smart Suggestions
AI-powered content relationship suggestions based on:
- Tags
- Categories
- Keywords
- Content similarity

---

## ⚡ Custom Actions

### Document Actions

**Duplicate**
- One-click document duplication
- Available for: Services, Industries, Resources, Team Members
- Automatically appends "(Copy)" to title

**Bulk Actions**
- Bulk publish
- Bulk unpublish
- Bulk delete (with confirmation)
- Multi-select documents

### Document Badges

**Status Indicators:**
- 🟢 **Published**: Live on site
- 🟡 **Draft**: Not published
- 🔵 **Edited**: Published with unpublished changes
- ⭐ **Featured**: Highlighted on homepage

---

## 📋 Templates

### Pre-configured Content Templates

**Service Template**
```typescript
{
  title, shortDescription, order,
  hero: { title, subtitle, description, backgroundImage },
  overview, capabilities, technicalSpecs
}
```

**Industry Template**
```typescript
{
  title, shortDescription, order,
  hero: { title, subtitle, backgroundImage },
  overview, applications, compliance
}
```

**Resource Template**
```typescript
{
  title, category, excerpt, content,
  tags, relatedServices
}
```

**Team Member Template**
```typescript
{
  name, role, order, bio,
  expertise, certifications, linkedin, email
}
```

**Usage:**
```typescript
import { applyTemplate } from '@/sanity/templates';

// Create new service with template
const newService = applyTemplate('service', {
  title: 'CNC Machining'
});
```

---

## 🛠️ Custom Input Components

### Slug Input
- Auto-generate from title
- Preview URL
- Manual override support

### Color Picker
- Visual color selection
- Preset color palette (12 colors)
- Hex code input
- Live preview

### Status Badge
- Visual workflow indicators
- Timestamp display
- Color-coded states

---

## 🎯 Live Preview

**One-click preview links** for all document types:
- Services: `/services/{slug}`
- Industries: `/industries/{slug}`
- Resources: `/resources/{category}/{slug}`
- Pages: Direct page URLs

**Opens in:**
- New tab
- Production or staging URL
- Configurable base URL

---

## 🔍 Search Configuration

### Weighted Search
```typescript
Title: 10x boost
Description: 5x boost
Content: 3x boost
Tags: 2.5x boost
```

### Search Operators
- Full-text search
- Field-specific search
- Type filtering
- Category filtering
- Status filtering
- Date range filtering

---

## 📦 Plugin Ecosystem

**Installed Plugins:**
- `@sanity/vision` - GROQ query playground
- `sanity-plugin-media` - Advanced media library
- `@sanity/google-maps-input` - Location fields
- Custom plugins:
  - Asset Manager
  - Content Relationships
  - Collaboration
  - Analytics
  - Preview Pane
  - Workflow System

---

## 🚦 Getting Started

### Access Sanity Studio
```bash
# Local development
http://localhost:3000/studio

# Production
https://precision-manufacturing-sanity.vercel.app/studio
```

### Create New Content

1. **Navigate to content type** (e.g., Services)
2. **Click "Create"**
3. **Fill in required fields** (marked with *)
4. **Add images** (with hotspot/crop)
5. **Set workflow status**
6. **Schedule publishing** (optional)
7. **Add relationships** (optional)
8. **Publish or Save as Draft**

### Best Practices

**Content:**
- Write SEO-friendly titles (50-60 chars)
- Meta descriptions (150-160 chars)
- Use hotspot on all images
- Add alt text for accessibility
- Tag content for discoverability

**Workflow:**
- Use Draft → In Review → Approved → Published
- Assign reviewers for important content
- Add review notes for context
- Schedule time-sensitive content

**Assets:**
- Organize with categories and tags
- Use descriptive file names
- Optimize images before upload
- Add proper alt text and captions

---

## 📈 Power User Tips

1. **Keyboard Shortcuts** in Studio:
   - `Cmd/Ctrl + S` - Save
   - `Cmd/Ctrl + P` - Publish
   - `Cmd/Ctrl + Shift + P` - Unpublish

2. **GROQ Queries** in Vision tool:
   - Test queries before implementing
   - Use Vision for debugging
   - Export query results as JSON

3. **Batch Operations:**
   - Select multiple documents
   - Use bulk actions
   - Export/import capabilities

4. **Performance:**
   - Use LQIP for smooth loading
   - Enable hotspot for responsive images
   - Set appropriate image sizes

---

## 🎓 Training Resources

**For Content Editors:**
- Create and edit content
- Upload and manage images
- Use workflow system
- Schedule publishing

**For Developers:**
- GROQ query language
- Schema customization
- Plugin development
- API integration

**For Administrators:**
- User permissions
- Workflow configuration
- Analytics setup
- Performance monitoring

---

## 🔐 Security & Permissions

**Role-Based Access** (future enhancement):
- Admin: Full access
- Editor: Edit all content
- Contributor: Create drafts, no publish
- Reviewer: Review and approve
- Viewer: Read-only access

---

## 📞 Support

**Issues & Questions:**
- GitHub Issues: [Create Issue](https://github.com/JohnConnorCode/precision-manufacturing-sanity/issues)
- Sanity Documentation: [docs.sanity.io](https://docs.sanity.io)

**Production Site:**
- https://precision-manufacturing-sanity.vercel.app

---

**Last Updated:** November 3, 2025
**Version:** 2.0.0 (Enterprise Edition)
