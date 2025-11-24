import * as dotenv from 'dotenv';
import { createClient } from '@sanity/client';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vgacjlhu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const pt = (text: string, key: string) => ([
  {
    _key: key,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: `${key}-child`,
        _type: 'span',
        marks: [],
        text,
      },
    ],
  },
]);

const services = [
  {
    id: '35a2dd2b-ea03-4c3d-94ac-783c58abf56e',
    title: '5-Axis Machining',
    data: {
      'hero.backgroundImageUrl': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2400&q=90',
      'hero.backgroundImage.alt': 'Advanced 5-axis CNC machining center in operation',
      'hero.badge': 'ADVANCED MACHINING SERVICES',
      'hero.title': '5-Axis Machining',
      'hero.subtitle': 'Precision Manufacturing Excellence',
      'hero.descriptionRich': pt(
        'Advanced 5-axis simultaneous machining capabilities for the most complex aerospace and defense components. Uncompromising quality and precision for mission-critical applications.',
        'five-hero-desc'
      ),
      'hero.buttons': [
        { _key: 'five-hero-btn1', text: 'Get Quote', href: '/contact', variant: 'primary', enabled: true },
        { _key: 'five-hero-btn2', text: 'View Capabilities', href: '/services', variant: 'secondary', enabled: true },
      ],
      capabilities: [
        { _key: 'five-cap-axes', label: 'Simultaneous Axes', value: '5-Axis', description: 'Full simultaneous' },
        { _key: 'five-cap-accuracy', label: 'Machining Accuracy', value: '±0.0001\"', description: 'Precision tolerance capability' },
        { _key: 'five-cap-envelope', label: 'Work Envelope', value: '48\" x 26\" x 20\"', description: 'Maximum capacity' },
        { _key: 'five-cap-spindle', label: 'Spindle Speed', value: '12,000 RPM', description: 'High-speed capability' },
      ],
      servicesHeading: '5-Axis Machining Services',
      servicesDescription: 'Comprehensive 5-axis machining capabilities for complex components requiring precision and reliability in aerospace and defense applications.',
      services: [
        {
          _key: 'five-complex-components',
          title: 'Complex Aerospace Components',
          description: 'Advanced 5-axis machining for turbine blades, impellers, and complex geometries requiring continuous contouring.',
          featuresLabel: 'Key Features',
          capabilitiesLabel: 'Capabilities',
          features: [
            { _key: 'five-complex-f1', feature: 'Turbine blade manufacturing' },
            { _key: 'five-complex-f2', feature: 'Impeller machining' },
            { _key: 'five-complex-f3', feature: 'Complex curve generation' },
            { _key: 'five-complex-f4', feature: 'Simultaneous 5-axis contouring' },
          ],
          capabilities: [
            { _key: 'five-complex-c1', capability: 'Hermle C42U 5-axis machining center' },
            { _key: 'five-complex-c2', capability: 'Heidenhain control with collision avoidance' },
            { _key: 'five-complex-c3', capability: '±0.0001\" positioning accuracy' },
            { _key: 'five-complex-c4', capability: 'Automatic tool changer (60 tools)' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1600&q=90',
        },
        {
          _key: 'five-defense-parts',
          title: 'Precision Defense Parts',
          description: 'High-precision machining of defense components with complex angles and tight tolerances for critical applications.',
          featuresLabel: 'Key Features',
          capabilitiesLabel: 'Capabilities',
          features: [
            { _key: 'five-defense-f1', feature: 'Defense component machining' },
            { _key: 'five-defense-f2', feature: 'Complex angle programming' },
            { _key: 'five-defense-f3', feature: 'Tight tolerance manufacturing' },
            { _key: 'five-defense-f4', feature: 'ITAR compliance' },
          ],
          capabilities: [
            { _key: 'five-defense-c1', capability: 'ITAR registered facility' },
            { _key: 'five-defense-c2', capability: 'Security-cleared personnel' },
            { _key: 'five-defense-c3', capability: 'Traceability documentation' },
            { _key: 'five-defense-c4', capability: 'Quality assurance protocols' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=90',
        },
        {
          _key: 'five-prototype',
          title: 'Prototype Development',
          description: 'Rapid prototyping and low-volume production using advanced 5-axis capabilities for complex part geometries.',
          featuresLabel: 'Key Features',
          capabilitiesLabel: 'Capabilities',
          features: [
            { _key: 'five-prototype-f1', feature: 'Rapid prototyping' },
            { _key: 'five-prototype-f2', feature: 'Complex geometry machining' },
            { _key: 'five-prototype-f3', feature: 'Material optimization' },
            { _key: 'five-prototype-f4', feature: 'Design validation' },
          ],
          capabilities: [
            { _key: 'five-prototype-c1', capability: 'CAD/CAM integration' },
            { _key: 'five-prototype-c2', capability: 'Multiple material capability' },
            { _key: 'five-prototype-c3', capability: 'Surface finish optimization' },
            { _key: 'five-prototype-c4', capability: 'Dimensional verification' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=90',
        },
        {
          _key: 'five-production',
          title: 'Production Machining',
          description: 'High-volume production capabilities with consistent quality and repeatability for complex manufactured parts.',
          featuresLabel: 'Key Features',
          capabilitiesLabel: 'Capabilities',
          features: [
            { _key: 'five-production-f1', feature: 'High-volume production' },
            { _key: 'five-production-f2', feature: 'Process optimization' },
            { _key: 'five-production-f3', feature: 'Quality consistency' },
            { _key: 'five-production-f4', feature: 'Automated workflows' },
          ],
          capabilities: [
            { _key: 'five-production-c1', capability: 'Statistical process control' },
            { _key: 'five-production-c2', capability: 'Automated inspection' },
            { _key: 'five-production-c3', capability: 'Production scheduling' },
            { _key: 'five-production-c4', capability: 'Continuous improvement' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=90',
        },
      ],
      materialsHeading: 'Material Capabilities',
      materialsDescription: 'Expert machining across a wide range of materials from standard aluminum to exotic superalloys.',
      materials: [
        {
          _key: 'five-mat-aluminum',
          category: 'Aluminum Alloys',
          types: [
            { _key: 'five-mat-al-6061', type: '6061-T6' },
            { _key: 'five-mat-al-7075', type: '7075-T6' },
            { _key: 'five-mat-al-2024', type: '2024-T3' },
            { _key: 'five-mat-al-mic6', type: 'Mic-6 tooling plate' },
          ],
          applications: 'Aerospace structures, defense components, tooling',
        },
        {
          _key: 'five-mat-titanium',
          category: 'Titanium Alloys',
          types: [
            { _key: 'five-mat-ti-64', type: 'Ti-6Al-4V' },
            { _key: 'five-mat-ti-6242', type: 'Ti-6Al-2Sn-4Zr-2Mo' },
            { _key: 'five-mat-ti-cp', type: 'Commercial pure titanium' },
          ],
          applications: 'Aerospace engines, medical implants, defense',
        },
        {
          _key: 'five-mat-stainless',
          category: 'Stainless Steel',
          types: [
            { _key: 'five-mat-ss-316', type: '316L' },
            { _key: 'five-mat-ss-174', type: '17-4 PH' },
            { _key: 'five-mat-ss-155', type: '15-5 PH' },
            { _key: 'five-mat-ss-304', type: '304/304L' },
          ],
          applications: 'Food processing, medical, marine applications',
        },
        {
          _key: 'five-mat-superalloy',
          category: 'Superalloys',
          types: [
            { _key: 'five-mat-sup-in718', type: 'Inconel 718' },
            { _key: 'five-mat-sup-in625', type: 'Inconel 625' },
            { _key: 'five-mat-sup-hastx', type: 'Hastelloy X' },
            { _key: 'five-mat-sup-wasp', type: 'Waspaloy' },
          ],
          applications: 'High-temperature aerospace, power generation',
        },
      ],
      processHeading: 'Manufacturing Process',
      processDescription: 'Our comprehensive approach ensures optimal results from initial programming through final inspection.',
      processes: [
        {
          _key: 'five-process-programming',
          title: 'Programming & Setup',
          description: 'Advanced CAD/CAM programming with collision detection and optimization for complex 5-axis toolpaths. Key elements: Mastercam programming, tool path optimization, collision avoidance, simulation verification.',
        },
        {
          _key: 'five-process-fixturing',
          title: 'Fixturing & Workholding',
          description: 'Custom fixture design and precision workholding solutions for complex part geometries. Key elements: custom fixture design, modular workholding, accessibility optimization, vibration dampening.',
        },
        {
          _key: 'five-process-quality',
          title: 'Quality Assurance',
          description: 'In-process monitoring and final inspection ensuring dimensional accuracy and surface finish requirements. Key elements: CMM inspection, surface finish measurement, GD&T verification, statistical analysis.',
        },
        {
          _key: 'five-process-finishing',
          title: 'Finishing Operations',
          description: 'Secondary operations including deburring, surface treatments, and assembly preparation. Key elements: precision deburring, surface treatments, assembly preparation, packaging coordination.',
        },
      ],
      qualityStandardsHeading: 'Certifications & Quality Systems',
      qualityStandardsDescription: 'Certified processes and continuous monitoring ensure every 5-axis program meets aerospace and defense quality requirements.',
      qualityStandards: [
        { _key: 'five-qs1', title: 'AS9100D Certified' },
        { _key: 'five-qs2', title: 'ISO 9001:2015 Quality Management' },
        { _key: 'five-qs3', title: 'ITAR Registered Facility' },
        { _key: 'five-qs4', title: 'NADCAP-Compliant Processes' },
        { _key: 'five-qs5', title: '3-Sigma Manufacturing System' },
      ],
      qualityImage: {
        imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=90',
        alt: 'Quality assurance lab validating 5-axis parts'
      },
      cta: {
        badge: '',
        title: 'Ready for Complex Machining?',
        description: 'Partner with IIS for advanced 5-axis machining solutions that meet the most demanding aerospace and defense requirements.',
        buttons: [
          { _key: 'five-cta-btn1', text: 'Get Technical Quote', href: '/contact?interest=quote', variant: 'primary', enabled: true },
          { _key: 'five-cta-btn2', text: 'View All Services', href: '/services', variant: 'secondary', enabled: true },
        ],
      },
    },
  },
  {
    id: '38627f97-5bcd-4c27-a570-dfbd0b6df7e3',
    title: 'Metrology & Inspection',
    data: {
      'hero.backgroundImage.alt': 'Precision metrology and CMM inspection equipment',
      'hero.badge': 'PRECISION MEASUREMENT SERVICES',
      'hero.title': 'Precision Metrology',
      'hero.subtitle': 'Quality Assurance Excellence',
      'hero.descriptionRich': pt(
        'Advanced measurement and inspection services ensuring dimensional accuracy and quality compliance for aerospace and defense manufacturing.',
        'met-hero-desc'
      ),
      'hero.buttons': [
        { _key: 'met-hero-btn-primary', text: 'Get Quote', href: '/contact', variant: 'primary', enabled: true },
        { _key: 'met-hero-btn-secondary', text: 'View Services', href: '/services', variant: 'secondary', enabled: true },
      ],
      capabilities: [
        { _key: 'met-cap-accuracy', label: 'Measurement Accuracy', value: '±0.00005"', description: 'CMM precision' },
        { _key: 'met-cap-scanning', label: 'Scanning Resolution', value: '0.001"', description: 'Laser scanning' },
        { _key: 'met-cap-temperature', label: 'Temperature Control', value: '68°F ±1°F', description: 'Climate controlled' },
        { _key: 'met-cap-certification', label: 'Certification Level', value: 'ISO 17025', description: 'Accredited lab' },
      ],
      services: [
        {
          _key: 'met-cmm',
          title: 'Coordinate Measuring Machine (CMM)',
          description: 'High-precision dimensional inspection using state-of-the-art CMM systems for complex geometries.',
          featuresLabel: 'Key Features',
          capabilitiesLabel: 'Equipment Capabilities',
          features: [
            { _key: 'met-cmm-f1', feature: '3D coordinate measurement' },
            { _key: 'met-cmm-f2', feature: 'GD&T inspection' },
            { _key: 'met-cmm-f3', feature: 'Statistical analysis' },
            { _key: 'met-cmm-f4', feature: 'Automated reporting' },
          ],
          capabilities: [
            { _key: 'met-cmm-cap1', capability: 'Zeiss CONTURA G2 RDS CMM' },
            { _key: 'met-cmm-cap2', capability: 'Working volume: 700x1000x600mm' },
            { _key: 'met-cmm-cap3', capability: 'Accuracy: ±(0.9+L/350)μm' },
            { _key: 'met-cmm-cap4', capability: 'VAST XXT scanning probe' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=90',
        },
        {
          _key: 'met-laser',
          title: 'Laser Scanning & Reverse Engineering',
          description: 'Advanced 3D laser scanning for rapid inspection, reverse engineering, and digital documentation.',
          featuresLabel: 'Key Features',
          capabilitiesLabel: 'Equipment Capabilities',
          features: [
            { _key: 'met-laser-f1', feature: 'Point cloud generation' },
            { _key: 'met-laser-f2', feature: 'CAD comparison' },
            { _key: 'met-laser-f3', feature: 'Surface analysis' },
            { _key: 'met-laser-f4', feature: 'Digital archiving' },
          ],
          capabilities: [
            { _key: 'met-laser-cap1', capability: 'ATOS Triple Scan system' },
            { _key: 'met-laser-cap2', capability: '5 megapixel resolution' },
            { _key: 'met-laser-cap3', capability: '0.01mm accuracy' },
            { _key: 'met-laser-cap4', capability: 'Blue light technology' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1600&q=90',
        },
        {
          _key: 'met-optical',
          title: 'Optical Measurement Systems',
          description: 'Non-contact optical measurement for delicate parts and surface characteristics analysis.',
          featuresLabel: 'Key Features',
          capabilitiesLabel: 'Equipment Capabilities',
          features: [
            { _key: 'met-opt-f1', feature: 'Surface roughness' },
            { _key: 'met-opt-f2', feature: 'Profile measurement' },
            { _key: 'met-opt-f3', feature: 'Edge detection' },
            { _key: 'met-opt-f4', feature: 'Multi-sensor integration' },
          ],
          capabilities: [
            { _key: 'met-opt-cap1', capability: 'Keyence IM Series' },
            { _key: 'met-opt-cap2', capability: 'Sub-micron accuracy' },
            { _key: 'met-opt-cap3', capability: 'Multi-wavelength scanning' },
            { _key: 'met-opt-cap4', capability: 'Real-time analysis' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=90',
        },
        {
          _key: 'met-calibration',
          title: 'Gauge & Tool Calibration',
          description: 'Comprehensive calibration services for measuring instruments and production tooling.',
          featuresLabel: 'Key Features',
          capabilitiesLabel: 'Equipment Capabilities',
          features: [
            { _key: 'met-cal-f1', feature: 'NIST traceable' },
            { _key: 'met-cal-f2', feature: 'Calibration certificates' },
            { _key: 'met-cal-f3', feature: 'Tool verification' },
            { _key: 'met-cal-f4', feature: 'Gage R&R studies' },
          ],
          capabilities: [
            { _key: 'met-cal-cap1', capability: 'NIST traceable standards' },
            { _key: 'met-cal-cap2', capability: 'Environmental controls' },
            { _key: 'met-cal-cap3', capability: 'Automated calibration' },
            { _key: 'met-cal-cap4', capability: 'Digital certificates' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=90',
        },
      ],
      servicesHeading: 'Metrology Services',
      servicesDescription: 'Comprehensive measurement and inspection capabilities supporting all phases of manufacturing from first article to final inspection.',
      applicationsHeading: 'Inspection Services',
      applicationsDescription: 'Comprehensive inspection protocols tailored to aerospace and defense quality requirements.',
      applicationsListLabel: 'Deliverables',
      applications: [
        {
          _key: 'met-fai',
          title: 'First Article Inspection (FAI)',
          description: 'Complete dimensional verification per AS9102 requirements',
          challenges: [
            { _key: 'met-fai-d1', challenge: 'AS9102 Forms 1-3' },
            { _key: 'met-fai-d2', challenge: 'Dimensional report' },
            { _key: 'met-fai-d3', challenge: 'Material certificates' },
            { _key: 'met-fai-d4', challenge: 'Process documentation' },
          ],
        },
        {
          _key: 'met-inprocess',
          title: 'In-Process Inspection',
          description: 'Real-time quality monitoring during manufacturing',
          challenges: [
            { _key: 'met-inprocess-d1', challenge: 'Statistical control charts' },
            { _key: 'met-inprocess-d2', challenge: 'Trend analysis' },
            { _key: 'met-inprocess-d3', challenge: 'Process capability studies' },
            { _key: 'met-inprocess-d4', challenge: 'Corrective actions' },
          ],
        },
        {
          _key: 'met-final',
          title: 'Final Inspection',
          description: 'Comprehensive verification before shipment',
          challenges: [
            { _key: 'met-final-d1', challenge: 'Certificate of conformance' },
            { _key: 'met-final-d2', challenge: 'Inspection report' },
            { _key: 'met-final-d3', challenge: 'Dimensional data' },
            { _key: 'met-final-d4', challenge: 'Test results' },
          ],
        },
        {
          _key: 'met-incoming',
          title: 'Incoming Inspection',
          description: 'Vendor part verification and material validation',
          challenges: [
            { _key: 'met-incoming-d1', challenge: 'Supplier scorecards' },
            { _key: 'met-incoming-d2', challenge: 'Non-conformance reports' },
            { _key: 'met-incoming-d3', challenge: 'Material verification' },
            { _key: 'met-incoming-d4', challenge: 'Dimensional check' },
          ],
        },
      ],
      qualityStandardsHeading: 'Quality Standards & Certifications',
      qualityStandardsDescription: 'Our metrology lab maintains the highest standards of accuracy and traceability, with certifications that meet aerospace and defense requirements.',
      qualityStandards: [
        { _key: 'met-qs1', title: 'AS9100D Quality Management' },
        { _key: 'met-qs2', title: 'ISO 9001:2015 Certified' },
        { _key: 'met-qs3', title: 'ISO 17025 Measurement Lab' },
        { _key: 'met-qs4', title: 'NADCAP Accredited Processes' },
        { _key: 'met-qs5', title: 'ITAR Registered Facility' },
        { _key: 'met-qs6', title: 'Statistical Process Control' },
      ],
      qualityImage: {
        imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=90',
        alt: 'Quality control laboratory'
      },
      processHeading: 'Metrology Process',
      processDescription: 'Our systematic approach ensures accurate measurements and comprehensive documentation for every inspection.',
      processes: [
        {
          _key: 'met-process-planning',
          title: 'Planning',
          description: 'Review drawings and specifications',
        },
        {
          _key: 'met-process-setup',
          title: 'Setup',
          description: 'Equipment calibration and preparation',
        },
        {
          _key: 'met-process-measure',
          title: 'Measurement',
          description: 'Precision data collection',
        },
        {
          _key: 'met-process-analysis',
          title: 'Analysis',
          description: 'Statistical evaluation and comparison',
        },
        {
          _key: 'met-process-reporting',
          title: 'Reporting',
          description: 'Documentation and certification',
        },
      ],
      cta: {
        badge: '',
        title: 'Precision You Can Trust',
        description: 'Partner with our certified metrology lab for accurate measurements and comprehensive quality documentation.',
        buttons: [
          { _key: 'met-cta-btn1', text: 'Request Inspection', href: '/contact?interest=metrology', variant: 'primary', enabled: true },
          { _key: 'met-cta-btn2', text: 'View All Services', href: '/services', variant: 'secondary', enabled: true },
        ],
      },
      materials: [],
    },
  },
  {
    id: '6bf1b3c8-9166-4119-89e2-dd6efcd5fd33',
    title: 'Adaptive Machining Technology',
    data: {
      'hero.backgroundImageUrl': 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=2400&q=90',
      'hero.backgroundImage.alt': 'Smart adaptive machining with AI control systems',
      'hero.badge': 'INTELLIGENT MANUFACTURING',
      'hero.title': 'Adaptive Machining',
      'hero.subtitle': 'AI-Driven Manufacturing Excellence',
      'hero.descriptionRich': pt(
        'Next-generation manufacturing technology that continuously adapts and optimizes machining processes in real-time for superior quality and efficiency.',
        'adaptive-hero-desc'
      ),
      'hero.buttons': [
        { _key: 'adaptive-hero-btn1', text: 'Start Project', href: '/contact', variant: 'primary', enabled: true },
        { _key: 'adaptive-hero-btn2', text: 'View Services', href: '/services', variant: 'secondary', enabled: true },
      ],
      capabilities: [
        { _key: 'adaptive-cap-cycle', label: 'Cycle Time Reduction', value: '35%', description: 'Average improvement' },
        { _key: 'adaptive-cap-tool', label: 'Tool Life Extension', value: '60%', description: 'Optimized parameters' },
        { _key: 'adaptive-cap-quality', label: 'First-Pass Yield', value: '99.8%', description: 'Quality improvement' },
        { _key: 'adaptive-cap-monitoring', label: 'Real-time Monitoring', value: '24/7', description: 'Continuous oversight' },
      ],
      servicesHeading: 'Smart Manufacturing Technology',
      servicesDescription: 'Our adaptive machining systems combine advanced sensors, AI algorithms, and real-time control to optimize every aspect of the manufacturing process.',
      services: [
        {
          _key: 'adaptive-monitoring',
          title: 'Real-Time Process Monitoring',
          description: 'Advanced sensor networks continuously monitor cutting forces, vibration, temperature, and tool condition.',
          featuresLabel: 'Features',
          capabilitiesLabel: 'Benefits',
          features: [
            { _key: 'adaptive-monitoring-f1', feature: 'Force sensors' },
            { _key: 'adaptive-monitoring-f2', feature: 'Vibration monitoring' },
            { _key: 'adaptive-monitoring-f3', feature: 'Temperature tracking' },
            { _key: 'adaptive-monitoring-f4', feature: 'Tool wear detection' },
          ],
          capabilities: [
            { _key: 'adaptive-monitoring-c1', capability: 'Early problem detection' },
            { _key: 'adaptive-monitoring-c2', capability: 'Reduced scrap' },
            { _key: 'adaptive-monitoring-c3', capability: 'Improved surface finish' },
            { _key: 'adaptive-monitoring-c4', capability: 'Predictive maintenance' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1600&q=90',
        },
        {
          _key: 'adaptive-control',
          title: 'Intelligent Control Systems',
          description: 'AI-powered algorithms automatically adjust cutting parameters for optimal performance and quality.',
          featuresLabel: 'Features',
          capabilitiesLabel: 'Benefits',
          features: [
            { _key: 'adaptive-control-f1', feature: 'Machine learning' },
            { _key: 'adaptive-control-f2', feature: 'Adaptive algorithms' },
            { _key: 'adaptive-control-f3', feature: 'Parameter optimization' },
            { _key: 'adaptive-control-f4', feature: 'Predictive analytics' },
          ],
          capabilities: [
            { _key: 'adaptive-control-c1', capability: 'Optimal performance' },
            { _key: 'adaptive-control-c2', capability: 'Reduced operator intervention' },
            { _key: 'adaptive-control-c3', capability: 'Consistent quality' },
            { _key: 'adaptive-control-c4', capability: 'Process optimization' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=90',
        },
        {
          _key: 'adaptive-toolpath',
          title: 'Dynamic Tool Path Adjustment',
          description: 'Real-time toolpath modification based on material conditions and cutting feedback.',
          featuresLabel: 'Features',
          capabilitiesLabel: 'Benefits',
          features: [
            { _key: 'adaptive-toolpath-f1', feature: 'Path optimization' },
            { _key: 'adaptive-toolpath-f2', feature: 'Feed rate adjustment' },
            { _key: 'adaptive-toolpath-f3', feature: 'Stepover modification' },
            { _key: 'adaptive-toolpath-f4', feature: 'Depth control' },
          ],
          capabilities: [
            { _key: 'adaptive-toolpath-c1', capability: 'Improved efficiency' },
            { _key: 'adaptive-toolpath-c2', capability: 'Better surface finish' },
            { _key: 'adaptive-toolpath-c3', capability: 'Extended tool life' },
            { _key: 'adaptive-toolpath-c4', capability: 'Reduced cycle time' },
          ],
        },
        {
          _key: 'adaptive-quality',
          title: 'Quality Assurance Integration',
          description: 'Continuous quality monitoring with automatic corrections and process validation.',
          featuresLabel: 'Features',
          capabilitiesLabel: 'Benefits',
          features: [
            { _key: 'adaptive-quality-f1', feature: 'In-process inspection' },
            { _key: 'adaptive-quality-f2', feature: 'Statistical control' },
            { _key: 'adaptive-quality-f3', feature: 'Automatic correction' },
            { _key: 'adaptive-quality-f4', feature: 'Quality prediction' },
          ],
          capabilities: [
            { _key: 'adaptive-quality-c1', capability: 'Zero-defect manufacturing' },
            { _key: 'adaptive-quality-c2', capability: 'Reduced inspection time' },
            { _key: 'adaptive-quality-c3', capability: 'Lower cost of quality' },
            { _key: 'adaptive-quality-c4', capability: 'Process certification' },
          ],
        },
      ],
      applicationsHeading: 'Industry Applications',
      applicationsDescription: 'Adaptive machining technology delivers superior results across demanding industrial applications requiring exceptional precision and reliability.',
      applicationsListLabel: 'Key Challenges',
      applications: [
        {
          _key: 'adaptive-app-aero',
          title: 'Aerospace Engine Components',
          description: 'Critical turbine parts requiring exceptional precision and surface quality.',
          challenges: [
            { _key: 'adaptive-app-aero-c1', challenge: 'Complex geometries' },
            { _key: 'adaptive-app-aero-c2', challenge: 'Difficult materials' },
            { _key: 'adaptive-app-aero-c3', challenge: 'Tight tolerances' },
            { _key: 'adaptive-app-aero-c4', challenge: 'Surface requirements' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=90',
        },
        {
          _key: 'adaptive-app-defense',
          title: 'Defense System Parts',
          description: 'High-reliability components for mission-critical defense applications.',
          challenges: [
            { _key: 'adaptive-app-defense-c1', challenge: 'Material hardness' },
            { _key: 'adaptive-app-defense-c2', challenge: 'Precision requirements' },
            { _key: 'adaptive-app-defense-c3', challenge: 'Traceability' },
            { _key: 'adaptive-app-defense-c4', challenge: 'Quality standards' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=90',
        },
        {
          _key: 'adaptive-app-energy',
          title: 'Energy Sector Components',
          description: 'Power generation and oil & gas industry precision components.',
          challenges: [
            { _key: 'adaptive-app-energy-c1', challenge: 'Large part size' },
            { _key: 'adaptive-app-energy-c2', challenge: 'Complex features' },
            { _key: 'adaptive-app-energy-c3', challenge: 'Material properties' },
            { _key: 'adaptive-app-energy-c4', challenge: 'Durability requirements' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=90',
        },
      ],
      processHeading: 'Adaptive Process Flow',
      processDescription: 'Our adaptive machining process continuously learns and optimizes throughout the manufacturing cycle.',
      processes: [
        {
          _key: 'adaptive-process-setup',
          title: 'Setup & Calibration',
          description: 'System calibration and baseline parameter establishment for each workpiece.',
        },
        {
          _key: 'adaptive-process-monitoring',
          title: 'Real-Time Monitoring',
          description: 'Continuous data collection and process monitoring across every axis.',
        },
        {
          _key: 'adaptive-process-control',
          title: 'Adaptive Control',
          description: 'AI-driven parameter adjustments and optimization during cutting.',
        },
        {
          _key: 'adaptive-process-validation',
          title: 'Quality Validation',
          description: 'Automated inspection and process validation with corrective feedback.',
        },
      ],
      qualityStandardsHeading: 'Adaptive Advantage',
      qualityStandardsDescription: 'Our adaptive machining technology delivers measurable improvements in quality, efficiency, and cost-effectiveness across all manufacturing operations.',
      qualityStandards: [
        { _key: 'adaptive-advantage-1', title: 'Reduced Cycle Times – AI-optimized cutting parameters cut machining time by up to 35%' },
        { _key: 'adaptive-advantage-2', title: 'Improved Quality – Real-time monitoring achieves 99.8% first-pass yield' },
        { _key: 'adaptive-advantage-3', title: 'Extended Tool Life – Adaptive control extends tool life by an average of 60%' },
        { _key: 'adaptive-advantage-4', title: 'Lower Operating Costs – Reduced waste, rework, and maintenance costs' },
      ],
      qualityImage: {
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=90',
        alt: 'Smart manufacturing control center'
      },
      cta: {
        badge: '',
        title: 'Experience Adaptive Manufacturing',
        description: 'Discover how our intelligent manufacturing systems can transform your production capabilities and quality outcomes.',
        buttons: [
          { _key: 'adaptive-cta-btn1', text: 'Schedule Demo', href: '/contact?interest=demo', variant: 'primary', enabled: true },
          { _key: 'adaptive-cta-btn2', text: 'View All Services', href: '/services', variant: 'secondary', enabled: true },
        ],
      },
      materials: [],
    },
  },
  {
    id: '90cd7631-50b6-4966-b583-609f3180dab5',
    title: 'Engineering Support',
    data: {
      'hero.backgroundImage.alt': 'Advanced CAD engineering and design services workstation',
      'hero.badge': 'COMPREHENSIVE DESIGN SERVICES',
      'hero.title': 'Engineering Services',
      'hero.subtitle': 'From Concept to Production',
      'hero.descriptionRich': pt(
        'Complete engineering solutions from initial concept through final production, including design optimization, rapid prototyping, and manufacturing process development.',
        'eng-hero-desc'
      ),
      'hero.buttons': [
        { _key: 'eng-hero-btn1', text: 'Start Project', href: '/contact?interest=engineering', variant: 'primary', enabled: true },
        { _key: 'eng-hero-btn2', text: 'View Capabilities', href: '/services', variant: 'secondary', enabled: true },
      ],
      capabilities: [
        { _key: 'eng-cap-projects', label: 'Design Projects', value: '500+', description: 'Completed annually' },
        { _key: 'eng-cap-software', label: 'CAD Software', value: '12+', description: 'Platforms supported' },
        { _key: 'eng-cap-prototype', label: 'Prototype Time', value: '48hrs', description: 'Rapid turnaround' },
        { _key: 'eng-cap-dfm', label: 'DFM Analysis', value: '100%', description: 'Manufacturing optimized' },
      ],
      servicesHeading: 'Engineering Capabilities',
      servicesDescription: 'From initial concept to production-ready designs, our engineering team delivers comprehensive solutions optimized for manufacturing excellence.',
      services: [
        {
          _key: 'eng-dfm',
          title: 'Design for Manufacturing (DFM)',
          description: 'Optimize part designs for efficient manufacturing while maintaining performance requirements.',
          featuresLabel: 'Services',
          capabilitiesLabel: 'Benefits',
          features: [
            { _key: 'eng-dfm-s1', feature: 'Cost optimization' },
            { _key: 'eng-dfm-s2', feature: 'Tolerance analysis' },
            { _key: 'eng-dfm-s3', feature: 'Material selection' },
            { _key: 'eng-dfm-s4', feature: 'Process optimization' },
          ],
          capabilities: [
            { _key: 'eng-dfm-b1', capability: 'Reduced manufacturing costs' },
            { _key: 'eng-dfm-b2', capability: 'Improved producibility' },
            { _key: 'eng-dfm-b3', capability: 'Shorter lead times' },
            { _key: 'eng-dfm-b4', capability: 'Enhanced quality' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=90',
        },
        {
          _key: 'eng-prototype',
          title: 'Rapid Prototyping',
          description: 'Fast-track product development with advanced prototyping technologies and processes.',
          featuresLabel: 'Services',
          capabilitiesLabel: 'Benefits',
          features: [
            { _key: 'eng-prototype-s1', feature: '3D printing' },
            { _key: 'eng-prototype-s2', feature: 'CNC prototypes' },
            { _key: 'eng-prototype-s3', feature: 'Functional testing' },
            { _key: 'eng-prototype-s4', feature: 'Design validation' },
          ],
          capabilities: [
            { _key: 'eng-prototype-b1', capability: 'Accelerated development' },
            { _key: 'eng-prototype-b2', capability: 'Design verification' },
            { _key: 'eng-prototype-b3', capability: 'Risk mitigation' },
            { _key: 'eng-prototype-b4', capability: 'Faster time-to-market' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=1600&q=90',
        },
        {
          _key: 'eng-cadcam',
          title: 'CAD/CAM Programming',
          description: 'Expert programming services for complex machining operations and toolpath optimization.',
          featuresLabel: 'Services',
          capabilitiesLabel: 'Benefits',
          features: [
            { _key: 'eng-cadcam-s1', feature: 'Multi-axis programming' },
            { _key: 'eng-cadcam-s2', feature: 'Toolpath optimization' },
            { _key: 'eng-cadcam-s3', feature: 'Simulation & verification' },
            { _key: 'eng-cadcam-s4', feature: 'Post-processing' },
          ],
          capabilities: [
            { _key: 'eng-cadcam-b1', capability: 'Optimized cycle times' },
            { _key: 'eng-cadcam-b2', capability: 'Improved surface finish' },
            { _key: 'eng-cadcam-b3', capability: 'Reduced tool wear' },
            { _key: 'eng-cadcam-b4', capability: 'Minimized setup time' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=90',
        },
        {
          _key: 'eng-process',
          title: 'Process Development',
          description: 'Comprehensive manufacturing process development and optimization for new products.',
          featuresLabel: 'Services',
          capabilitiesLabel: 'Benefits',
          features: [
            { _key: 'eng-process-s1', feature: 'Process planning' },
            { _key: 'eng-process-s2', feature: 'Tooling design' },
            { _key: 'eng-process-s3', feature: 'Fixture development' },
            { _key: 'eng-process-s4', feature: 'Quality planning' },
          ],
          capabilities: [
            { _key: 'eng-process-b1', capability: 'Robust processes' },
            { _key: 'eng-process-b2', capability: 'Quality assurance' },
            { _key: 'eng-process-b3', capability: 'Cost effectiveness' },
            { _key: 'eng-process-b4', capability: 'Scalable production' },
          ],
          imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=90',
        },
      ],
      materialsHeading: 'Design & Manufacturing Tools',
      materialsDescription: 'State-of-the-art software and technologies supporting every phase of product development.',
      materials: [
        {
          _key: 'eng-tools-cad',
          category: 'CAD Software Expertise',
          types: [
            { _key: 'eng-tools-cad1', type: 'SolidWorks Premium' },
            { _key: 'eng-tools-cad2', type: 'Siemens NX' },
            { _key: 'eng-tools-cad3', type: 'Autodesk Inventor' },
            { _key: 'eng-tools-cad4', type: 'CATIA V5/V6' },
            { _key: 'eng-tools-cad5', type: 'Fusion 360' },
            { _key: 'eng-tools-cad6', type: 'KeyShot Rendering' },
          ],
          applications: 'Advanced 3D modeling and visualization workflows.',
        },
        {
          _key: 'eng-tools-cam',
          category: 'CAM Programming',
          types: [
            { _key: 'eng-tools-cam1', type: 'Mastercam' },
            { _key: 'eng-tools-cam2', type: 'NX CAM' },
            { _key: 'eng-tools-cam3', type: 'PowerMill' },
            { _key: 'eng-tools-cam4', type: 'EdgeCAM' },
            { _key: 'eng-tools-cam5', type: 'HSMWorks' },
            { _key: 'eng-tools-cam6', type: 'FeatureCAM' },
          ],
          applications: 'Precision programming for multi-axis machining.',
        },
        {
          _key: 'eng-tools-sim',
          category: 'Simulation & Analysis',
          types: [
            { _key: 'eng-tools-sim1', type: 'SolidWorks Simulation' },
            { _key: 'eng-tools-sim2', type: 'ANSYS Workbench' },
            { _key: 'eng-tools-sim3', type: 'Autodesk CFD' },
            { _key: 'eng-tools-sim4', type: 'VERICUT / CGTech' },
            { _key: 'eng-tools-sim5', type: 'Machining Advisor' },
          ],
          applications: 'Structural, thermal, and machining verification.',
        },
        {
          _key: 'eng-tools-proto',
          category: 'Prototyping Technologies',
          types: [
            { _key: 'eng-tools-proto1', type: 'FDM 3D Printing' },
            { _key: 'eng-tools-proto2', type: 'SLA Stereolithography' },
            { _key: 'eng-tools-proto3', type: 'SLS Laser Sintering' },
            { _key: 'eng-tools-proto4', type: 'CNC Prototyping' },
            { _key: 'eng-tools-proto5', type: 'Sheet Metal Prototypes' },
            { _key: 'eng-tools-proto6', type: 'Rapid Tooling' },
          ],
          applications: 'Rapid validation for complex assemblies.',
        },
      ],
      applicationsHeading: 'Project Types',
      applicationsDescription: 'Flexible engagement models to meet diverse engineering needs from concept development to production optimization.',
      applicationsListLabel: 'Typical Deliverables',
      applications: [
        {
          _key: 'eng-project-new',
          title: 'New Product Development',
          description: 'Complete design and development from concept to production',
          timeline: '4-12 weeks',
          challenges: [
            { _key: 'eng-project-new1', challenge: 'Concept design' },
            { _key: 'eng-project-new2', challenge: '3D models' },
            { _key: 'eng-project-new3', challenge: 'Drawings' },
            { _key: 'eng-project-new4', challenge: 'Prototypes' },
            { _key: 'eng-project-new5', challenge: 'Manufacturing plan' },
          ],
        },
        {
          _key: 'eng-project-opt',
          title: 'Design Optimization',
          description: 'Improve existing designs for better performance or manufacturability',
          timeline: '2-6 weeks',
          challenges: [
            { _key: 'eng-project-opt1', challenge: 'DFM analysis' },
            { _key: 'eng-project-opt2', challenge: 'Revised designs' },
            { _key: 'eng-project-opt3', challenge: 'Cost analysis' },
            { _key: 'eng-project-opt4', challenge: 'Process improvements' },
          ],
        },
        {
          _key: 'eng-project-re',
          title: 'Reverse Engineering',
          description: 'Recreate CAD models from existing parts or legacy components',
          timeline: '1-4 weeks',
          challenges: [
            { _key: 'eng-project-re1', challenge: '3D scanning' },
            { _key: 'eng-project-re2', challenge: 'CAD models' },
            { _key: 'eng-project-re3', challenge: 'Technical drawings' },
            { _key: 'eng-project-re4', challenge: 'Material analysis' },
          ],
        },
        {
          _key: 'eng-project-tooling',
          title: 'Tooling & Fixture Design',
          description: 'Custom tooling solutions for manufacturing processes',
          timeline: '2-8 weeks',
          challenges: [
            { _key: 'eng-project-tool1', challenge: 'Tooling design' },
            { _key: 'eng-project-tool2', challenge: 'Fixture models' },
            { _key: 'eng-project-tool3', challenge: 'Assembly drawings' },
            { _key: 'eng-project-tool4', challenge: 'Manufacturing specs' },
          ],
        },
      ],
      processHeading: 'Our Engineering Process',
      processDescription: 'Structured approach ensuring successful project outcomes from initial consultation to final delivery.',
      processes: [
        {
          _key: 'eng-process-consult',
          title: 'Consultation',
          description: 'Requirements analysis and project planning.',
          features: [
            { _key: 'eng-process-consult-f1', feature: 'Stakeholder alignment' },
            { _key: 'eng-process-consult-f2', feature: 'Scope definition' },
          ],
        },
        {
          _key: 'eng-process-concept',
          title: 'Concept Design',
          description: 'Initial design concepts and feasibility study.',
          features: [
            { _key: 'eng-process-concept-f1', feature: 'Concept exploration' },
            { _key: 'eng-process-concept-f2', feature: 'Feasibility review' },
          ],
        },
        {
          _key: 'eng-process-development',
          title: 'Development',
          description: 'Detailed design and engineering analysis.',
          features: [
            { _key: 'eng-process-development-f1', feature: 'Detailed CAD output' },
            { _key: 'eng-process-development-f2', feature: 'Analysis reports' },
          ],
        },
        {
          _key: 'eng-process-proto',
          title: 'Prototyping',
          description: 'Rapid prototypes and design validation.',
          features: [
            { _key: 'eng-process-proto-f1', feature: 'Functional builds' },
            { _key: 'eng-process-proto-f2', feature: 'Validation testing' },
          ],
        },
        {
          _key: 'eng-process-opt',
          title: 'Optimization',
          description: 'DFM analysis and design refinement.',
          features: [
            { _key: 'eng-process-opt-f1', feature: 'Manufacturing alignment' },
            { _key: 'eng-process-opt-f2', feature: 'Cost reduction' },
          ],
        },
        {
          _key: 'eng-process-production',
          title: 'Production',
          description: 'Manufacturing support and documentation.',
          features: [
            { _key: 'eng-process-production-f1', feature: 'Release packages' },
            { _key: 'eng-process-production-f2', feature: 'Supplier coordination' },
          ],
        },
      ],
      cta: {
        badge: '',
        title: 'Ready to Start Your Project?',
        description: 'Partner with our engineering team to transform your concepts into production-ready designs optimized for manufacturing success.',
        buttons: [
          { _key: 'eng-cta-btn1', text: 'Start Engineering Project', href: '/contact?interest=engineering', variant: 'primary', enabled: true },
          { _key: 'eng-cta-btn2', text: 'View All Services', href: '/services', variant: 'secondary', enabled: true },
        ],
      },
    },
  },
];

async function updateServices() {
  for (const service of services) {
    console.log(`\nUpdating ${service.title} (${service.id})...`);

    await client
      .patch(service.id)
      .set(service.data)
      .commit();

    await client
      .patch(`drafts.${service.id}`)
      .set(service.data)
      .commit()
      .catch(() => {});

    console.log(`✓ Updated ${service.title}`);
  }
}

updateServices()
  .then(() => {
    console.log('\nAll services updated successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to update services:', error);
    process.exit(1);
  });
