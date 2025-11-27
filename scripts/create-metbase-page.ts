/**
 * Script to create the Metbase page document in Sanity
 * Run with: npx sanity@latest exec scripts/create-metbase-page.ts --with-user-token
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
})

async function createMetbasePage() {
  console.log('Creating Metbase page document...')

  const metbaseDoc = {
    _id: 'metbase',
    _type: 'metbase',
    hero: {
      badge: 'Proprietary Software',
      badgeIconName: 'Database',
      title: 'Metbase',
      titleHighlight: 'Software',
      description: 'A powerful in-house database system providing ISO 9001 & AS9100 compliance for complete traceability and retrievability of inspection data and robotic programming.',
      buttons: [
        {
          _key: 'btn-contact',
          enabled: true,
          label: 'Contact Us',
          href: '/contact',
          variant: 'primary'
        },
        {
          _key: 'btn-services',
          enabled: true,
          label: 'Our Services',
          href: '/services',
          variant: 'secondary'
        }
      ]
    },
    overview: {
      title: 'What is Metbase?',
      description: 'Metbase is our proprietary database software developed in-house to meet the rigorous demands of precision manufacturing. It provides complete ISO 9001 & AS9100 compliance for traceability and retrievability of inspection data and all robotic programming.',
      highlights: [
        { _key: 'hl-1', enabled: true, text: 'ISO 9001 & AS9100 Compliant', iconName: 'Shield' },
        { _key: 'hl-2', enabled: true, text: 'Full Traceability', iconName: 'GitBranch' },
        { _key: 'hl-3', enabled: true, text: '15+ Years Historical Data', iconName: 'History' },
        { _key: 'hl-4', enabled: true, text: 'Custom Reporting', iconName: 'FileText' }
      ]
    },
    features: {
      title: 'Core Capabilities',
      description: 'Metbase delivers comprehensive data management and analysis tools for precision manufacturing.',
      items: [
        {
          _key: 'feat-1',
          enabled: true,
          title: 'Revision Control',
          description: 'Full forward and backward revision control on all CMM and CNC programs, ensuring complete version history and audit trails.',
          iconName: 'GitBranch'
        },
        {
          _key: 'feat-2',
          enabled: true,
          title: 'Historical Data Access',
          description: 'Access over 15 years of historical inspection and manufacturing data for trend analysis and quality assurance.',
          iconName: 'History'
        },
        {
          _key: 'feat-3',
          enabled: true,
          title: 'Custom Reporting',
          description: 'Generate detailed custom reports tailored to your specific requirements and compliance needs.',
          iconName: 'FileText'
        },
        {
          _key: 'feat-4',
          enabled: true,
          title: 'Automatic Data Export',
          description: 'Seamless automatic exports from CMM operations for streamlined data collection and analysis.',
          iconName: 'Download'
        },
        {
          _key: 'feat-5',
          enabled: true,
          title: 'Statistical Analysis',
          description: 'External line fitting and comprehensive statistical analysis tools for engineering insights and process optimization.',
          iconName: 'LineChart'
        },
        {
          _key: 'feat-6',
          enabled: true,
          title: 'Data Mining',
          description: 'Advanced data mining functionality to extract valuable engineering insights from your manufacturing data.',
          iconName: 'Database'
        }
      ]
    },
    analysisTool: {
      title: 'Metbase Analysis Tool',
      description: 'Our analysis tool is primarily designed for customer capability studies and machining process monitoring. It generates various on-the-fly analytical charts from datasets, enabling real-time decision making and quality control.',
      capabilities: [
        { _key: 'cap-1', enabled: true, text: 'Bell curve distribution analysis' },
        { _key: 'cap-2', enabled: true, text: 'Scatter plot generation' },
        { _key: 'cap-3', enabled: true, text: 'Process capability studies (Cp, Cpk)' },
        { _key: 'cap-4', enabled: true, text: 'Real-time SPC charts' },
        { _key: 'cap-5', enabled: true, text: 'Trend analysis and forecasting' }
      ]
    },
    systemIntegration: {
      title: 'Seamless System Integration',
      description: 'Metbase connects multiple pieces of equipment, enabling machines to communicate and share data seamlessly. A notable capability includes obtaining custom CMM alignments that are transferable to CNC machines, with built-in safeguards preventing serial/lot number mixups.',
      benefits: [
        {
          _key: 'ben-1',
          enabled: true,
          title: 'Equipment Connectivity',
          description: 'Connect CMM, CNC, and other equipment for unified data management.',
          iconName: 'Link2'
        },
        {
          _key: 'ben-2',
          enabled: true,
          title: 'Alignment Transfer',
          description: 'Transfer custom CMM alignments directly to CNC machines.',
          iconName: 'RefreshCw'
        },
        {
          _key: 'ben-3',
          enabled: true,
          title: 'Error Prevention',
          description: 'Built-in safeguards prevent serial and lot number mixups.',
          iconName: 'Shield'
        }
      ]
    },
    closedLoop: {
      title: 'Closed-Loop Manufacturing System',
      description: 'Metbase creates a relational database linking all equipment and data, facilitating continuous process improvement. This closed-loop system ensures that every measurement, adjustment, and outcome is tracked and connected, enabling true continuous improvement in your manufacturing processes.'
    },
    cta: {
      title: 'Experience the Power of Metbase',
      description: 'Learn how our proprietary database software can transform your manufacturing data management and quality control processes.',
      buttons: [
        {
          _key: 'cta-btn-1',
          enabled: true,
          label: 'Request a Demo',
          href: '/contact',
          variant: 'primary'
        },
        {
          _key: 'cta-btn-2',
          enabled: true,
          label: 'Learn More',
          href: '/services',
          variant: 'secondary'
        }
      ]
    },
    seo: {
      metaTitle: 'Metbase - Proprietary Database Software | IIS Precision Manufacturing',
      metaDescription: 'Metbase is IIS proprietary database software providing ISO 9001 and AS9100 compliance for traceability, inspection data management, and robotic programming with over 15 years of historical data access.'
    }
  }

  try {
    const result = await client.createOrReplace(metbaseDoc)
    console.log('Metbase page created successfully:', result._id)
  } catch (error) {
    console.error('Error creating Metbase page:', error)
    throw error
  }
}

async function updateNavigation() {
  console.log('Updating navigation to add Metbase link under About...')

  try {
    // Fetch current navigation
    const navigation = await client.fetch(`*[_type == "navigation"][0]`)

    if (!navigation) {
      console.log('Navigation document not found')
      return
    }

    // Find the About menu item
    const menuItems = navigation.menuItems || []
    const aboutIndex = menuItems.findIndex((item: any) => item.name === 'About' || item.href === '/about')

    if (aboutIndex === -1) {
      console.log('About menu item not found')
      return
    }

    // Add Metbase as a child of About
    const aboutItem = menuItems[aboutIndex]
    const existingChildren = aboutItem.children || []

    // Check if Metbase already exists
    const metbaseExists = existingChildren.some((child: any) =>
      child.href === '/about/metbase' || child.name === 'Metbase'
    )

    if (metbaseExists) {
      console.log('Metbase link already exists in navigation')
      return
    }

    // Add Metbase to children
    const updatedChildren = [
      ...existingChildren,
      {
        _key: 'nav-metbase',
        _type: 'navItem',
        name: 'Metbase',
        href: '/about/metbase',
        description: 'Our proprietary database software',
        iconPreset: 'custom',
        iconName: 'Database',
        linkType: 'internal',
        openInNewTab: false,
        showInHeader: true,
        showInMobile: true,
        showInFooter: false
      }
    ]

    // Update the navigation document
    await client.patch(navigation._id)
      .set({
        [`menuItems[${aboutIndex}].children`]: updatedChildren
      })
      .commit()

    console.log('Navigation updated successfully')
  } catch (error) {
    console.error('Error updating navigation:', error)
  }
}

async function updateFooter() {
  console.log('Updating footer to add Metbase link...')

  try {
    // Fetch current footer
    const footer = await client.fetch(`*[_type == "footer"][0]`)

    if (!footer) {
      console.log('Footer document not found')
      return
    }

    const quickLinks = footer.quickLinks || []

    // Check if Metbase already exists
    const metbaseExists = quickLinks.some((link: any) =>
      link.href === '/about/metbase' || link.label === 'Metbase' || link.text === 'Metbase'
    )

    if (metbaseExists) {
      console.log('Metbase link already exists in footer')
      return
    }

    // Add Metbase to quickLinks (after About Us)
    const aboutIndex = quickLinks.findIndex((link: any) =>
      link.href === '/about' || link.text === 'About Us' || link.label === 'About Us'
    )

    const newLink = {
      _key: 'quick-metbase',
      enabled: true,
      label: 'Metbase',
      text: 'Metbase',
      href: '/about/metbase'
    }

    let updatedQuickLinks
    if (aboutIndex !== -1) {
      // Insert after About Us
      updatedQuickLinks = [
        ...quickLinks.slice(0, aboutIndex + 1),
        newLink,
        ...quickLinks.slice(aboutIndex + 1)
      ]
    } else {
      // Add at the end
      updatedQuickLinks = [...quickLinks, newLink]
    }

    // Update the footer document
    await client.patch(footer._id)
      .set({ quickLinks: updatedQuickLinks })
      .commit()

    console.log('Footer updated successfully')
  } catch (error) {
    console.error('Error updating footer:', error)
  }
}

async function main() {
  try {
    await createMetbasePage()
    await updateNavigation()
    await updateFooter()
    console.log('\n✅ All tasks completed successfully!')
    console.log('The Metbase page is now available at /about/metbase')
  } catch (error) {
    console.error('Script failed:', error)
    process.exit(1)
  }
}

main()
