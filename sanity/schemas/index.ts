// Collections
import service from './service'
import industry from './industry'
import resource from './resource'
import teamMember from './team-member'
import jobPosting from './job-posting'
import caseStudy from './case-study'
import resourceCategory from './resource-category'
import testimonial from './testimonial'
import certification from './certification'

// Globals
import siteSettings from './site-settings'
import navigation from './navigation'
import homepage from './homepage'
import servicesPage from './services-page'
import industriesPage from './industries-page'
import footer from './footer'
import about from './about'
import contact from './contact'
import careersPage from './careers'
import termsPage from './terms'
import supplierRequirementsPage from './supplier-requirements'
import errorPages from './error-pages'
import metbasePage from './metbase'
import caseStudiesPage from './case-studies-page'
import certificationsPage from './certifications-page'
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
  // Style Objects (must be first - used by other schemas)
  colorStyle,
  typographyStyle,
  sectionTheme,

  // Custom Blocks and Objects
  calloutBox,
  toleranceTable,
  processFlow,
  materialData,
  equipmentSpec,
  ctaButton,
  navItem,
  navGroup,

  // Section schemas
  heroSection,
  richTextSection,
  ctaSection,

  // Collections
  service,
  industry,
  resource,
  teamMember,
  jobPosting,
  caseStudy,
  resourceCategory,
  testimonial,
  certification,

  // Globals
  siteSettings,
  navigation,
  homepage,
  servicesPage,
  industriesPage,
  footer,
  about,
  contact,
  careersPage,
  termsPage,
  supplierRequirementsPage,
  errorPages,
  metbasePage,
  caseStudiesPage,
  certificationsPage,
  uiText,
  pageContent,
  page,
]
