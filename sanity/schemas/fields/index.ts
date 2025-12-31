/**
 * Reusable Field Factories
 *
 * These factory functions create standardized, typed field definitions
 * that can be reused across all schemas. This ensures consistency and
 * reduces code duplication.
 *
 * @example
 * import { imageWithAlt, seoFields, slugField } from './fields'
 *
 * export default defineType({
 *   name: 'myDocument',
 *   type: 'document',
 *   fields: [
 *     slugField(),
 *     imageWithAlt('heroImage', 'Hero Image'),
 *     seoFields(),
 *   ]
 * })
 */

import { defineField, defineArrayMember } from 'sanity'
import type { Rule, StringRule, ObjectRule, SlugRule, ImageRule } from 'sanity'
import IconPicker from '../../components/IconPicker'

// Re-export the existing icon field
export { iconField } from './iconField'

/**
 * Image field with required alt text and full metadata support.
 * Includes hotspot, crop, blurhash, lqip, and palette.
 */
export function imageWithAlt(
  name: string,
  title: string,
  options?: {
    description?: string
    group?: string
    fieldset?: string
    required?: boolean
  }
) {
  return defineField({
    name,
    type: 'image',
    title,
    description: options?.description,
    group: options?.group,
    fieldset: options?.fieldset,
    options: {
      hotspot: true,
      metadata: ['blurhash', 'lqip', 'palette'],
    },
    fields: [
      defineField({
        name: 'alt',
        type: 'string',
        title: 'Alternative Text',
        description: 'Describe the image for accessibility and SEO',
        validation: (rule: StringRule) =>
          options?.required !== false
            ? rule.required().error('Alt text is required for accessibility')
            : rule,
      }),
    ],
    validation: options?.required
      ? (rule: ImageRule) => rule.required().error(`${title} is required`)
      : undefined,
  })
}

/**
 * Background image field for hero sections.
 * Recommended dimensions included in description.
 */
export function backgroundImageField(
  name: string = 'backgroundImage',
  title: string = 'Background Image',
  options?: {
    description?: string
    group?: string
    fieldset?: string
    dimensions?: string
  }
) {
  const dims = options?.dimensions || '1920x1080px'
  return imageWithAlt(name, title, {
    description: options?.description || `Hero background image (recommended: ${dims})`,
    group: options?.group,
    fieldset: options?.fieldset,
    required: false,
  })
}

/**
 * Standardized slug field with auto-generation from title.
 */
export function slugField(
  options?: {
    source?: string
    group?: string
    maxLength?: number
  }
) {
  return defineField({
    name: 'slug',
    type: 'slug',
    title: 'Slug',
    description: 'URL-friendly identifier (auto-generated from title)',
    group: options?.group,
    options: {
      source: options?.source || 'title',
      maxLength: options?.maxLength || 96,
    },
    validation: (rule: SlugRule) =>
      rule.required().error('Slug is required - click "Generate" to create from title'),
  })
}

/**
 * Published toggle field for visibility control.
 */
export function publishedField(
  options?: {
    group?: string
  }
) {
  return defineField({
    name: 'published',
    type: 'boolean',
    title: 'Published',
    description: 'Controls whether this item appears on the website. Toggle off to hide without deleting.',
    group: options?.group,
    initialValue: true,
  })
}

/**
 * Enabled toggle for array items (buttons, benefits, etc.)
 */
export function enabledField(
  options?: {
    description?: string
  }
) {
  return defineField({
    name: 'enabled',
    type: 'boolean',
    title: 'Enabled',
    description: options?.description || 'Toggle off to hide without deleting',
    initialValue: true,
  })
}

/**
 * Complete SEO fields object.
 * Includes meta title, description, and OG image.
 */
export function seoFields(
  options?: {
    group?: string
  }
) {
  return defineField({
    name: 'seo',
    type: 'object',
    title: 'SEO & Sharing',
    description: 'Search engine metadata and social sharing defaults.',
    group: options?.group,
    options: {
      collapsible: true,
      collapsed: true,
    },
    fields: [
      defineField({
        name: 'metaTitle',
        type: 'string',
        title: 'Meta Title',
        description: 'Title shown in search results (50-60 characters recommended)',
        validation: (rule: StringRule) =>
          rule.max(60).warning('Meta title should be 60 characters or less'),
      }),
      defineField({
        name: 'metaDescription',
        type: 'text',
        title: 'Meta Description',
        description: 'Description shown in search results (150-160 characters recommended)',
        rows: 3,
        validation: (rule) =>
          rule.max(160).warning('Meta description should be 160 characters or less'),
      }),
      defineField({
        name: 'ogImage',
        type: 'image',
        title: 'Social Share Image',
        description: 'Image shown when shared on social media (1200x630px recommended)',
        options: {
          hotspot: true,
          metadata: ['blurhash', 'lqip', 'palette'],
        },
        fields: [
          defineField({
            name: 'alt',
            type: 'string',
            title: 'Alternative Text',
            validation: (rule: StringRule) =>
              rule.required().error('Alt text is required for social sharing'),
          }),
        ],
      }),
    ],
  })
}

/**
 * CTA Button field as an object.
 */
export function ctaButtonField(
  name: string,
  title: string,
  options?: {
    fieldset?: string
    variants?: { title: string; value: string }[]
  }
) {
  const defaultVariants = [
    { title: 'Primary (Blue Gradient)', value: 'primary' },
    { title: 'Secondary (Outline)', value: 'secondary' },
    { title: 'Ghost (Transparent)', value: 'ghost' },
  ]

  return defineField({
    name,
    type: 'object',
    title,
    fieldset: options?.fieldset,
    fields: [
      enabledField(),
      defineField({
        name: 'label',
        type: 'string',
        title: 'Button Label',
        validation: (rule: StringRule) => rule.required().error('Button label is required'),
      }),
      defineField({
        name: 'href',
        type: 'string',
        title: 'Button URL',
        description: 'Internal path (e.g., /contact) or external URL',
        validation: (rule: StringRule) => rule.required().error('Button URL is required'),
      }),
      defineField({
        name: 'variant',
        type: 'string',
        title: 'Button Style',
        options: {
          list: options?.variants || defaultVariants,
          layout: 'radio',
        },
        initialValue: 'primary',
      }),
    ],
    preview: {
      select: {
        title: 'label',
        subtitle: 'href',
        enabled: 'enabled',
      },
      prepare({ title, subtitle, enabled }) {
        return {
          title: enabled === false ? `${title} (disabled)` : title,
          subtitle,
        }
      },
    },
  })
}

/**
 * Array of CTA buttons with enable toggle.
 */
export function ctaButtonsArray(
  name: string = 'buttons',
  title: string = 'CTA Buttons',
  options?: {
    fieldset?: string
    group?: string
    max?: number
  }
) {
  return defineField({
    name,
    type: 'array',
    title,
    fieldset: options?.fieldset,
    group: options?.group,
    validation: options?.max
      ? (rule) => rule.max(options.max!).error(`Maximum ${options.max} buttons allowed`)
      : undefined,
    of: [
      defineArrayMember({
        type: 'object',
        fields: [
          enabledField(),
          defineField({
            name: 'label',
            type: 'string',
            title: 'Button Label',
            validation: (rule: StringRule) => rule.required(),
          }),
          defineField({
            name: 'href',
            type: 'string',
            title: 'Button URL',
            validation: (rule: StringRule) => rule.required(),
          }),
          defineField({
            name: 'variant',
            type: 'string',
            title: 'Style',
            options: {
              list: [
                { title: 'Primary', value: 'primary' },
                { title: 'Secondary', value: 'secondary' },
                { title: 'Ghost', value: 'ghost' },
              ],
            },
            initialValue: 'primary',
          }),
        ],
        preview: {
          select: {
            title: 'label',
            subtitle: 'href',
            enabled: 'enabled',
          },
          prepare({ title, subtitle, enabled }) {
            return {
              title: enabled === false ? `${title} (hidden)` : title,
              subtitle,
            }
          },
        },
      }),
    ],
  })
}

/**
 * Rich text field with portable text and custom blocks.
 */
export function richTextField(
  name: string,
  title: string,
  options?: {
    description?: string
    group?: string
    customBlocks?: string[]
    minimal?: boolean
  }
) {
  const defaultBlocks = options?.customBlocks || [
    'calloutBox',
    'toleranceTable',
    'processFlow',
    'materialData',
    'equipmentSpec',
    'ctaButton',
  ]

  const blockConfig = defineArrayMember({
    type: 'block',
    marks: {
      decorators: [
        { title: 'Strong', value: 'strong' },
        { title: 'Emphasis', value: 'em' },
        { title: 'Code', value: 'code' },
        { title: 'Underline', value: 'underline' },
        { title: 'Strike', value: 'strike-through' },
      ],
      annotations: [
        {
          name: 'link',
          type: 'object',
          title: 'Link',
          fields: [
            defineField({
              name: 'href',
              type: 'url',
              title: 'URL',
              validation: (rule) =>
                rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                  allowRelative: true,
                }),
            }),
            defineField({
              name: 'openInNewTab',
              type: 'boolean',
              title: 'Open in new tab',
              initialValue: false,
            }),
          ],
        },
      ],
    },
    styles: options?.minimal
      ? [{ title: 'Normal', value: 'normal' }]
      : [
          { title: 'Normal', value: 'normal' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Quote', value: 'blockquote' },
        ],
    lists: options?.minimal
      ? []
      : [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' },
        ],
  })

  const arrayOf = options?.minimal
    ? [blockConfig]
    : [
        blockConfig,
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (rule: StringRule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
          ],
        }),
        ...defaultBlocks.map((blockType) =>
          defineArrayMember({ type: blockType })
        ),
      ]

  return defineField({
    name,
    type: 'array',
    title,
    description: options?.description,
    group: options?.group,
    of: arrayOf,
  })
}

/**
 * Icon field with visual picker.
 * Wraps the existing IconPicker component.
 */
export function iconPickerField(
  name: string = 'iconName',
  title: string = 'Icon',
  options?: {
    description?: string
    group?: string
    fieldset?: string
  }
) {
  return defineField({
    name,
    type: 'string',
    title,
    description: options?.description || 'Select an icon from the Lucide library',
    group: options?.group,
    fieldset: options?.fieldset,
    components: {
      input: IconPicker,
    },
  })
}

/**
 * Order field for sortable collections.
 */
export function orderField(
  options?: {
    group?: string
  }
) {
  return defineField({
    name: 'order',
    type: 'number',
    title: 'Display Order',
    description: 'Lower numbers appear first',
    group: options?.group,
    initialValue: 0,
    validation: (rule) => rule.integer().min(0),
  })
}

/**
 * Featured toggle for highlighting items.
 */
export function featuredField(
  options?: {
    group?: string
    description?: string
  }
) {
  return defineField({
    name: 'featured',
    type: 'boolean',
    title: 'Featured',
    description: options?.description || 'Highlight this item in listings',
    group: options?.group,
    initialValue: false,
  })
}

/**
 * Highlight text field for emphasized text in cards/previews.
 */
export function highlightField(
  name: string = 'highlight',
  title: string = 'Highlight Text',
  options?: {
    description?: string
    group?: string
    fieldset?: string
  }
) {
  return defineField({
    name,
    type: 'string',
    title,
    description: options?.description || 'Short text for badge or highlight (e.g., "Most Popular", "New")',
    group: options?.group,
    fieldset: options?.fieldset,
  })
}

/**
 * Section visibility toggle.
 */
export function sectionEnabledField(
  fieldset?: string
) {
  return defineField({
    name: 'enabled',
    type: 'boolean',
    title: 'Show Section',
    description: 'Toggle to show/hide this entire section from the website',
    fieldset,
    initialValue: true,
  })
}
