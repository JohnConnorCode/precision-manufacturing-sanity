import { StructureBuilder } from 'sanity/structure';
import {
  Cog,
  Plane,
  FileText,
  Users,
  Home,
  Info,
  Mail,
  Briefcase,
  FileCheck,
  Settings,
  Navigation,
  Layout,
  Type,
  File,
  Globe,
  Quote,
  Shield,
  FolderOpen,
  BookOpen,
  AlertTriangle,
  BarChart3,
  Award,
} from 'lucide-react';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Homepage
      S.listItem()
        .title('Homepage')
        .icon(Home)
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),

      S.divider(),

      // Collections
      S.listItem()
        .title('Services')
        .icon(Cog)
        .child(
          S.documentTypeList('service')
            .title('Services')
            .filter('_type == "service"')
            .defaultOrdering([{field: 'order', direction: 'asc'}])
        ),

      S.listItem()
        .title('Industries')
        .icon(Plane)
        .child(
          S.documentTypeList('industry')
            .title('Industries')
            .filter('_type == "industry"')
            .defaultOrdering([{field: 'order', direction: 'asc'}])
        ),

      S.listItem()
        .title('Case Studies')
        .icon(BookOpen)
        .child(
          S.documentTypeList('caseStudy')
            .title('Case Studies')
            .filter('_type == "caseStudy"')
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
        ),

      S.listItem()
        .title('Testimonials')
        .icon(Quote)
        .child(
          S.documentTypeList('testimonial')
            .title('Testimonials')
            .filter('_type == "testimonial"')
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
        ),

      S.listItem()
        .title('Certifications')
        .icon(Award)
        .child(
          S.documentTypeList('certification')
            .title('Certifications')
            .filter('_type == "certification"')
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
        ),

      S.divider(),

      // Resources by Category
      S.listItem()
        .title('Resources')
        .icon(FileText)
        .child(
          S.list()
            .title('Resources by Category')
            .items([
              S.listItem()
                .title('All Resources')
                .icon(FileText)
                .child(
                  S.documentTypeList('resource')
                    .title('All Resources')
                    .filter('_type == "resource"')
                    .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                ),

              S.listItem()
                .title('Resource Categories')
                .icon(FolderOpen)
                .child(
                  S.documentTypeList('resourceCategory')
                    .title('Resource Categories')
                    .filter('_type == "resourceCategory"')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),

              S.divider(),

              S.listItem()
                .title('Machining Processes')
                .icon(Cog)
                .child(
                  S.documentTypeList('resource')
                    .title('Machining Processes')
                    .filter('_type == "resource" && category == "manufacturing-processes"')
                    .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                ),

              S.listItem()
                .title('Material Science')
                .icon(Shield)
                .child(
                  S.documentTypeList('resource')
                    .title('Material Science')
                    .filter('_type == "resource" && category == "material-science"')
                    .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                ),

              S.listItem()
                .title('Quality & Compliance')
                .icon(FileCheck)
                .child(
                  S.documentTypeList('resource')
                    .title('Quality & Compliance')
                    .filter('_type == "resource" && category == "quality-compliance"')
                    .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                ),

              S.listItem()
                .title('Industry Applications')
                .icon(Plane)
                .child(
                  S.documentTypeList('resource')
                    .title('Industry Applications')
                    .filter('_type == "resource" && category == "industry-applications"')
                    .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                ),

              S.listItem()
                .title('Calculators & Tools')
                .icon(BarChart3)
                .child(
                  S.documentTypeList('resource')
                    .title('Calculators & Tools')
                    .filter('_type == "resource" && category == "calculators-tools"')
                    .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                ),
            ])
        ),

      S.divider(),

      // Team & Jobs
      S.listItem()
        .title('Team Members')
        .icon(Users)
        .child(
          S.documentTypeList('teamMember')
            .title('Team Members')
            .filter('_type == "teamMember"')
            .defaultOrdering([{field: 'order', direction: 'asc'}])
        ),

      S.listItem()
        .title('Job Postings')
        .icon(Briefcase)
        .child(
          S.documentTypeList('jobPosting')
            .title('Job Postings')
            .filter('_type == "jobPosting"')
            .defaultOrdering([{field: 'featured', direction: 'desc'}, {field: 'order', direction: 'asc'}])
        ),

      S.divider(),

      // Pages group
      S.listItem()
        .title('Pages')
        .icon(File)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('About Page')
                .icon(Info)
                .child(
                  S.document()
                    .schemaType('about')
                    .documentId('about')
                ),
              S.listItem()
                .title('Contact Page')
                .icon(Mail)
                .child(
                  S.document()
                    .schemaType('contact')
                    .documentId('contact')
                ),
              S.listItem()
                .title('Careers Page')
                .icon(Briefcase)
                .child(
                  S.document()
                    .schemaType('careers')
                    .documentId('careers')
                ),

              S.divider(),

              S.listItem()
                .title('Services Page')
                .icon(Cog)
                .child(
                  S.document()
                    .schemaType('servicesPage')
                    .documentId('servicesPage')
                ),
              S.listItem()
                .title('Industries Page')
                .icon(Plane)
                .child(
                  S.document()
                    .schemaType('industriesPage')
                    .documentId('industriesPage')
                ),
              S.listItem()
                .title('Case Studies Page')
                .icon(BookOpen)
                .child(
                  S.document()
                    .schemaType('caseStudiesPage')
                    .documentId('caseStudiesPage')
                ),
              S.listItem()
                .title('Certifications Page')
                .icon(Award)
                .child(
                  S.document()
                    .schemaType('certificationsPage')
                    .documentId('certificationsPage')
                ),
              S.listItem()
                .title('Metbase Page')
                .icon(BarChart3)
                .child(
                  S.document()
                    .schemaType('metbase')
                    .documentId('metbase')
                ),

              S.divider(),

              S.listItem()
                .title('Error Pages')
                .icon(AlertTriangle)
                .child(
                  S.document()
                    .schemaType('errorPages')
                    .documentId('errorPages')
                ),
            ])
        ),

      S.divider(),

      // Compliance & Legal
      S.listItem()
        .title('Compliance & Legal')
        .icon(FileCheck)
        .child(
          S.list()
            .title('Compliance & Legal')
            .items([
              S.listItem()
                .title('Compliance Page')
                .icon(FileCheck)
                .child(
                  S.document()
                    .schemaType('compliancePage')
                    .documentId('compliancePage')
                ),
              S.listItem()
                .title('Terms & Conditions')
                .child(
                  S.document()
                    .schemaType('terms')
                    .documentId('terms')
                ),
              S.listItem()
                .title('Supplier Requirements')
                .child(
                  S.document()
                    .schemaType('supplierRequirements')
                    .documentId('supplierRequirements')
                ),
            ])
        ),

      S.divider(),

      // Site Configuration (config only)
      S.listItem()
        .title('Site Configuration')
        .icon(Settings)
        .child(
          S.list()
            .title('Site Configuration')
            .items([
              S.listItem()
                .title('Site Settings')
                .icon(Settings)
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              S.listItem()
                .title('Navigation')
                .icon(Navigation)
                .child(
                  S.document()
                    .schemaType('navigation')
                    .documentId('navigation')
                ),
              S.listItem()
                .title('Footer')
                .icon(Layout)
                .child(
                  S.document()
                    .schemaType('footer')
                    .documentId('footer')
                ),
              S.listItem()
                .title('UI Text')
                .icon(Type)
                .child(
                  S.document()
                    .schemaType('uiText')
                    .documentId('uiText')
                ),
              S.listItem()
                .title('Page Content')
                .icon(File)
                .child(
                  S.document()
                    .schemaType('pageContent')
                    .documentId('pageContent')
                ),
            ])
        ),

      S.divider(),

      // Generic Pages Collection
      S.listItem()
        .title('Generic Pages')
        .icon(Globe)
        .child(
          S.documentTypeList('page')
            .title('Generic Pages')
            .filter('_type == "page"')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
    ]);
