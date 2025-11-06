// Collections
import service from './service'
import industry from './industry'
import resource from './resource'
import teamMember from './team-member'

// Globals
import siteSettings from './site-settings'
import navigation from './navigation'
import homepage from './homepage'
import footer from './footer'
import about from './about'
import contact from './contact'
import careers from './careers'
import terms from './terms'
import supplierRequirements from './supplier-requirements'
import uiText from './ui-text'
import pageContent from './page-content'
import page from './page'
import heroSection from './sections/heroSection'
import richTextSection from './sections/richTextSection'
import ctaSection from './sections/ctaSection'
import navItem from './objects/navItem'
import navGroup from './objects/navGroup'
import colorStyle from './objects/colorStyle'
import typographyStyle from './objects/typographyStyle'
import sectionTheme from './objects/sectionTheme'

// Custom Blocks
import calloutBox from './blocks/calloutBox'
import toleranceTable from './blocks/toleranceTable'
import processFlow from './blocks/processFlow'
import materialData from './blocks/materialData'
import equipmentSpec from './blocks/equipmentSpec'
import ctaButton from './blocks/ctaButton'

export const schemaTypes = [
  // Collections
  service,
  industry,
  resource,
  teamMember,

  // Globals
  siteSettings,
  navigation,
  homepage,
  footer,
  about,
  contact,
  careers,
  terms,
  supplierRequirements,
  uiText,
  pageContent,
  page,
  heroSection,
  richTextSection,
  ctaSection,

  // Custom Blocks
  calloutBox,
  toleranceTable,
  processFlow,
  materialData,
  equipmentSpec,
  ctaButton,
  navItem,
  navGroup,

  // Style Objects
  colorStyle,
  typographyStyle,
  sectionTheme,
]
