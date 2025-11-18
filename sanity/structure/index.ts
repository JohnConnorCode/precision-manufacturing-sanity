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
  Globe
} from 'lucide-react';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Main Content Section
      S.listItem()
        .title('Homepage')
        .icon(Home)
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),

      S.divider(),

      // Services & Industries
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

              S.divider(),

              S.listItem()
                .title('Manufacturing Processes')
                .child(
                  S.documentTypeList('resource')
                    .title('Manufacturing Processes')
                    .filter('_type == "resource" && category == "manufacturing-processes"')
                    .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                ),

              S.listItem()
                .title('Material Science')
                .child(
                  S.documentTypeList('resource')
                    .title('Material Science')
                    .filter('_type == "resource" && category == "material-science"')
                    .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                ),

              S.listItem()
                .title('Quality & Compliance')
                .child(
                  S.documentTypeList('resource')
                    .title('Quality & Compliance')
                    .filter('_type == "resource" && category == "quality-compliance"')
                    .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                ),

              S.listItem()
                .title('Industry Applications')
                .child(
                  S.documentTypeList('resource')
                    .title('Industry Applications')
                    .filter('_type == "resource" && category == "industry-applications"')
                    .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                ),

              S.listItem()
                .title('Calculators & Tools')
                .child(
                  S.documentTypeList('resource')
                    .title('Calculators & Tools')
                    .filter('_type == "resource" && category == "calculators-tools"')
                    .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
                ),
            ])
        ),

      S.divider(),

      // Team & About
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
        .title('About Page')
        .icon(Info)
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
        ),

      S.divider(),

      // Other Pages
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

      // Compliance & Legal
      S.listItem()
        .title('Compliance & Legal')
        .icon(FileCheck)
        .child(
          S.list()
            .title('Compliance & Legal')
            .items([
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

      // Site Configuration
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
