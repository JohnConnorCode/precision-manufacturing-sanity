import { Users, Award, Target, Zap } from 'lucide-react';

export const companyStats = [
  { label: 'Years in Business', value: '30+', description: 'Decades of experience' },
  { label: 'Team Members', value: '150+', description: 'Skilled professionals' },
  { label: 'Annual Revenue', value: '$25M+', description: 'Consistent growth' },
  { label: 'Facility Size', value: '45,000', description: 'Square feet' }
];

export const timeline = [
  {
    year: '1993',
    title: 'Company Founded',
    description: 'Started as a small precision machining shop focusing on aerospace components'
  },
  {
    year: '1998',
    title: 'AS9100 Certification',
    description: 'Achieved aerospace quality certification and expanded defense contracts'
  },
  {
    year: '2005',
    title: 'Facility Expansion',
    description: 'Doubled facility size and added 5-axis CNC machining capabilities'
  },
  {
    year: '2012',
    title: 'ITAR Registration',
    description: 'Secured ITAR registration for defense manufacturing programs'
  },
  {
    year: '2018',
    title: 'Technology Innovation',
    description: 'Implemented adaptive machining and Industry 4.0 technologies'
  },
  {
    year: '2023',
    title: 'Sustainability Initiative',
    description: 'Launched comprehensive environmental sustainability program'
  }
];

export const values = [
  {
    title: 'Quality Excellence',
    description: 'Unwavering commitment to delivering components that exceed specifications and customer expectations.',
    icon: Award,
    principles: [
      'Zero-defect manufacturing mindset',
      'Continuous improvement culture',
      'Customer satisfaction focus',
      'Industry-leading standards'
    ]
  },
  {
    title: 'Innovation Leadership',
    description: 'Pioneering advanced manufacturing technologies and processes to stay ahead of industry demands.',
    icon: Zap,
    principles: [
      'Technology investment',
      'Process optimization',
      'Research & development',
      'Future-ready solutions'
    ]
  },
  {
    title: 'Reliability & Trust',
    description: 'Building long-term partnerships through consistent performance and transparent communication.',
    icon: Target,
    principles: [
      'On-time delivery commitment',
      'Transparent communication',
      'Long-term partnerships',
      'Dependable performance'
    ]
  },
  {
    title: 'Team Excellence',
    description: 'Investing in our people through training, development, and creating a culture of excellence.',
    icon: Users,
    principles: [
      'Skilled workforce development',
      'Safety-first culture',
      'Continuous training',
      'Team collaboration'
    ]
  }
];

export const leadership = [
  {
    name: 'John Anderson',
    title: 'Chief Executive Officer',
    experience: '25+ years',
    background: 'Former aerospace engineer with extensive manufacturing leadership experience',
    focus: 'Strategic vision and operational excellence'
  },
  {
    name: 'Sarah Mitchell',
    title: 'Chief Operating Officer',
    experience: '20+ years',
    background: 'Manufacturing operations expert with lean manufacturing expertise',
    focus: 'Production efficiency and quality systems'
  },
  {
    name: 'David Chen',
    title: 'Chief Technology Officer',
    experience: '18+ years',
    background: 'Advanced manufacturing technology and automation specialist',
    focus: 'Technology innovation and process optimization'
  },
  {
    name: 'Maria Rodriguez',
    title: 'Quality Director',
    experience: '22+ years',
    background: 'Quality management systems and aerospace certification expert',
    focus: 'Quality assurance and regulatory compliance'
  }
];

export const certifications = [
  'AS9100D Aerospace Quality Management',
  'ISO 9001:2015 Quality Management',
  'ITAR International Traffic in Arms',
  'NADCAP National Aerospace Defense',
  'ISO 14001 Environmental Management',
  'OSHA Safety Management System'
];

export const capabilities = [
  {
    category: 'Manufacturing',
    items: ['5-axis CNC machining', 'Adaptive manufacturing', 'Precision metrology', 'Surface treatments']
  },
  {
    category: 'Engineering',
    items: ['Design for manufacturing', 'Rapid prototyping', 'CAD/CAM programming', 'Process development']
  },
  {
    category: 'Quality',
    items: ['First article inspection', 'Statistical process control', 'Material traceability', 'Certification support']
  },
  {
    category: 'Industries',
    items: ['Aerospace systems', 'Defense platforms', 'Energy infrastructure', 'Industrial equipment']
  }
];
