import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// Defense content
const defenseId = '907034f3-2fbc-4ff5-b007-8092f4b4b1b6';
const defenseUpdates = {
  title: 'Defense Manufacturing',
  published: true,
  order: 2,
  iconName: 'Shield',
  shortDescription: 'ITAR registered defense contractor delivering mission-critical components for national security applications with full compliance protocols.',
  hero: {
    badge: 'DEFENSE SYSTEMS',
    subtitle: 'Defense Manufacturing Excellence',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1541124356219-a0ca43e5b636?w=2400&q=90',
    descriptionRich: [{_type: 'block', _key: 'hero-desc', style: 'normal', children: [{_type: 'span', _key: 'span-1', text: 'Trusted defense contractor delivering mission-critical components for national security applications. ITAR registered facility with full security clearance and compliance protocols.'}]}],
    buttons: [
      {_key: 'btn-1', text: 'Request Defense Quote', href: '/contact', variant: 'primary', enabled: true},
      {_key: 'btn-2', text: 'View Capabilities', href: '#capabilities', variant: 'secondary', enabled: true}
    ]
  },
  statistics: [
    {_key: 'stat-1', value: '200+', label: 'Defense Contracts', description: 'Active defense programs'},
    {_key: 'stat-2', value: 'Secret', label: 'Security Clearance', description: 'DoD cleared facility'},
    {_key: 'stat-3', value: '100%', label: 'ITAR Compliance', description: 'Fully registered'},
    {_key: 'stat-4', value: '99.8%', label: 'Quality Rating', description: 'Defense supplier score'}
  ],
  overview: {
    description: 'Delivering mission-critical defense components with comprehensive security compliance, quality assurance, and full traceability for national security applications.',
    marketSize: 'U.S. defense manufacturing market exceeds $350 billion annually',
    keyDrivers: [
      {_key: 'drv-1', driver: 'Military modernization programs'},
      {_key: 'drv-2', driver: 'National security priorities'},
      {_key: 'drv-3', driver: 'Technology upgrades and replacements'},
      {_key: 'drv-4', driver: 'Global threat environment evolution'}
    ],
    challenges: [
      {_key: 'chl-1', challenge: 'Stringent security and compliance requirements'},
      {_key: 'chl-2', challenge: 'Complex material specifications and traceability'},
      {_key: 'chl-3', challenge: 'Rigorous quality and testing standards'},
      {_key: 'chl-4', challenge: 'Supply chain security and vetting'}
    ]
  },
  components: [
    {_key: 'comp-1', category: 'Weapons Systems', description: 'Advanced weapons platforms requiring extreme precision and reliability', imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=90',
      parts: [{_key:'p1',part:'Missile guidance components'},{_key:'p2',part:'Fire control systems'},{_key:'p3',part:'Targeting assemblies'},{_key:'p4',part:'Launcher mechanisms'},{_key:'p5',part:'Precision optics mounts'},{_key:'p6',part:'Electronic warfare components'}],
      materials: [{_key:'m1',material:'Titanium Ti-6Al-4V'},{_key:'m2',material:'Aluminum 7075-T651'},{_key:'m3',material:'Steel 4340'},{_key:'m4',material:'Inconel 718'}],
      requirements: [{_key:'r1',requirement:'Shock resistance'},{_key:'r2',requirement:'Temperature cycling'},{_key:'r3',requirement:'EMI shielding'},{_key:'r4',requirement:'Corrosion protection'}]
    },
    {_key: 'comp-2', category: 'Vehicle & Platform Components', description: 'Military vehicle and naval system components demanding extreme durability', imageUrl: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=1200&q=90',
      parts: [{_key:'p1',part:'Armored vehicle components'},{_key:'p2',part:'Tank transmission parts'},{_key:'p3',part:'Naval system housings'},{_key:'p4',part:'Radar mount assemblies'},{_key:'p5',part:'Antenna positioning systems'},{_key:'p6',part:'Communications equipment'}],
      materials: [{_key:'m1',material:'Steel AISI 4140'},{_key:'m2',material:'Aluminum 5083-H131'},{_key:'m3',material:'Bronze C95400'},{_key:'m4',material:'Stainless 17-4 PH'}],
      requirements: [{_key:'r1',requirement:'Ballistic resistance'},{_key:'r2',requirement:'Environmental sealing'},{_key:'r3',requirement:'Vibration tolerance'},{_key:'r4',requirement:'Long service life'}]
    },
    {_key: 'comp-3', category: 'Surveillance & Intelligence', description: 'Precision optical and sensor systems for intelligence gathering', imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=90',
      parts: [{_key:'p1',part:'Optical instrument housings'},{_key:'p2',part:'Sensor mounts and gimbals'},{_key:'p3',part:'Camera stabilization systems'},{_key:'p4',part:'Antenna feed assemblies'},{_key:'p5',part:'Signal processing enclosures'},{_key:'p6',part:'Night vision components'}],
      materials: [{_key:'m1',material:'Aluminum 6061-T6'},{_key:'m2',material:'Magnesium AZ31B'},{_key:'m3',material:'Invar 36'},{_key:'m4',material:'Kovar 29-17'}],
      requirements: [{_key:'r1',requirement:'Dimensional stability'},{_key:'r2',requirement:'Thermal management'},{_key:'r3',requirement:'Electromagnetic compatibility'},{_key:'r4',requirement:'Optical precision'}]
    }
  ],
  regulatory: {
    certifications: [
      {_key:'cert-1', name:'ITAR Registration', description:'International Traffic in Arms Regulations', scope:'Defense articles manufacturing, State Department registration, export compliance'},
      {_key:'cert-2', name:'NISPOM Compliance', description:'National Industrial Security Program Operating Manual', scope:'Classified information handling, facility clearance, personnel security'},
      {_key:'cert-3', name:'CMMC Readiness', description:'Cybersecurity Maturity Model Certification', scope:'Network security, access control, data protection, incident response'}
    ],
    standards: [
      {_key:'std-1', name:'AS9100D', description:'Aerospace quality management system'},
      {_key:'std-2', name:'ISO 9001:2015', description:'Quality management certified'},
      {_key:'std-3', name:'DCMA QA', description:'Defense Contract Management Agency oversight'}
    ]
  },
  capabilities: [
    {_key:'cap-1', title:'Prime Contractor', description:'Direct DoD and military branch contracts', technicalDetails:[{_key:'d1',detail:'System assemblies'},{_key:'d2',detail:'Technical data packages'},{_key:'d3',detail:'Program management'}]},
    {_key:'cap-2', title:'Subcontractor Support', description:'Supporting major defense contractors', technicalDetails:[{_key:'d1',detail:'Precision parts manufacturing'},{_key:'d2',detail:'Assembly and testing'},{_key:'d3',detail:'Supply chain management'}]},
    {_key:'cap-3', title:'R&D Prototyping', description:'Prototype development and technology demonstration', technicalDetails:[{_key:'d1',detail:'Concept validation'},{_key:'d2',detail:'Rapid prototyping'},{_key:'d3',detail:'Technology transfer'}]}
  ],
  processBenefits: [
    {_key:'b1', title:'Security & Compliance', description:'Comprehensive facility and personnel security protocols', features:[{_key:'f1',feature:'Secret-level clearances'},{_key:'f2',feature:'Cybersecurity controls'},{_key:'f3',feature:'Visitor management'},{_key:'f4',feature:'Information security'}]},
    {_key:'b2', title:'Mission-Critical Quality', description:'Zero-defect manufacturing processes', features:[{_key:'f1',feature:'Extensive testing protocols'},{_key:'f2',feature:'Complete traceability'},{_key:'f3',feature:'Statistical process control'},{_key:'f4',feature:'First article inspection'}]},
    {_key:'b3', title:'Specialized Capabilities', description:'Advanced manufacturing for complex defense requirements', features:[{_key:'f1',feature:'Exotic material expertise'},{_key:'f2',feature:'Complex geometry machining'},{_key:'f3',feature:'Environmental testing'},{_key:'f4',feature:'Rapid response capabilities'}]}
  ],
  qualityStandards: [
    {_key:'std-1', title:'MIL-STD Compliance'},
    {_key:'std-2', title:'First Article Inspection'},
    {_key:'std-3', title:'Statistical Process Control'},
    {_key:'std-4', title:'Material Traceability'},
    {_key:'std-5', title:'NDT Inspection'},
    {_key:'std-6', title:'Certificate of Conformance'}
  ]
};

// Energy content
const energyId = 'dd2cb0ac-1b6c-4e73-bcb7-f0ba4477cac6';
const energyUpdates = {
  title: 'Energy Manufacturing',
  published: true,
  order: 3,
  iconName: 'Zap',
  shortDescription: 'Precision components for power generation, oil & gas, and renewable energy systems supporting critical infrastructure with proven reliability.',
  hero: {
    badge: 'ENERGY SECTOR SOLUTIONS',
    subtitle: 'Energy Manufacturing',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=2400&q=90',
    descriptionRich: [{_type:'block',_key:'hero-desc',style:'normal',children:[{_type:'span',_key:'span-1',text:'Precision components for power generation, oil & gas, and renewable energy systems. Supporting critical infrastructure with proven reliability and industry compliance.'}]}],
    buttons: [
      {_key:'btn-1', text:'Request Energy Quote', href:'/contact', variant:'primary', enabled:true},
      {_key:'btn-2', text:'View Capabilities', href:'#capabilities', variant:'secondary', enabled:true}
    ]
  },
  statistics: [
    {_key:'stat-1', value:'25%', label:'Energy Volume', description:'of production capacity'},
    {_key:'stat-2', value:'500MW+', label:'Power Supported', description:'generation equipment'},
    {_key:'stat-3', value:'1200°F', label:'Max Temperature', description:'operating capability'},
    {_key:'stat-4', value:'15,000 PSI', label:'Pressure Rating', description:'high-pressure systems'}
  ],
  overview: {
    description: 'Manufacturing precision components for critical energy infrastructure including power generation, oil & gas extraction, and renewable energy systems.',
    marketSize: 'Global energy manufacturing market exceeds $2 trillion annually',
    keyDrivers: [
      {_key:'drv-1', driver:'Energy transition and grid modernization'},
      {_key:'drv-2', driver:'Renewable energy expansion'},
      {_key:'drv-3', driver:'Oil & gas infrastructure upgrades'},
      {_key:'drv-4', driver:'Power generation efficiency improvements'}
    ],
    challenges: [
      {_key:'chl-1', challenge:'Extreme operating environments'},
      {_key:'chl-2', challenge:'High-temperature and pressure requirements'},
      {_key:'chl-3', challenge:'Corrosion resistance demands'},
      {_key:'chl-4', challenge:'Extended service life expectations'}
    ]
  },
  components: [
    {_key:'comp-1', category:'Power Generation', description:'Critical components for gas turbines, steam turbines, and power plant systems', imageUrl:'https://images.unsplash.com/photo-1509390006747-f339cd40e1c9?w=1200&q=90',
      parts: [{_key:'p1',part:'Gas turbine components'},{_key:'p2',part:'Steam turbine parts'},{_key:'p3',part:'Generator components'},{_key:'p4',part:'Heat exchanger tubes'},{_key:'p5',part:'Valve bodies and stems'},{_key:'p6',part:'Pump impellers'}],
      materials: [{_key:'m1',material:'Inconel 718'},{_key:'m2',material:'Stainless Steel 316L'},{_key:'m3',material:'Hastelloy C-276'},{_key:'m4',material:'Titanium Grade 2'}],
      requirements: [{_key:'r1',requirement:'High temperature operation'},{_key:'r2',requirement:'Corrosion resistance'},{_key:'r3',requirement:'Thermal cycling'},{_key:'r4',requirement:'Precision machining'}]
    },
    {_key:'comp-2', category:'Oil & Gas', description:'Downstream and upstream components for drilling, extraction, and processing', imageUrl:'https://images.unsplash.com/photo-1545431781-3e1b506e9a37?w=1200&q=90',
      parts: [{_key:'p1',part:'Downhole tools'},{_key:'p2',part:'Valve components'},{_key:'p3',part:'Pump parts'},{_key:'p4',part:'Wellhead equipment'},{_key:'p5',part:'Pipeline fittings'},{_key:'p6',part:'Drilling equipment'}],
      materials: [{_key:'m1',material:'Duplex Stainless Steel'},{_key:'m2',material:'Inconel 625'},{_key:'m3',material:'Monel 400'},{_key:'m4',material:'17-4 PH Stainless'}],
      requirements: [{_key:'r1',requirement:'Corrosive environments'},{_key:'r2',requirement:'High pressure systems'},{_key:'r3',requirement:'Wear resistance'},{_key:'r4',requirement:'Material traceability'}]
    },
    {_key:'comp-3', category:'Renewable Energy', description:'Components for wind, solar, and hydroelectric power generation systems', imageUrl:'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=90',
      parts: [{_key:'p1',part:'Wind turbine components'},{_key:'p2',part:'Solar tracking systems'},{_key:'p3',part:'Hydroelectric parts'},{_key:'p4',part:'Battery housing'},{_key:'p5',part:'Power electronics'},{_key:'p6',part:'Control systems'}],
      materials: [{_key:'m1',material:'Aluminum 6061'},{_key:'m2',material:'Stainless Steel 304'},{_key:'m3',material:'Carbon Steel'},{_key:'m4',material:'Copper Alloys'}],
      requirements: [{_key:'r1',requirement:'Weather resistance'},{_key:'r2',requirement:'Long service life'},{_key:'r3',requirement:'Cost optimization'},{_key:'r4',requirement:'Environmental compliance'}]
    }
  ],
  regulatory: {
    certifications: [
      {_key:'cert-1', name:'API Specifications', description:'American Petroleum Institute standards', scope:'API 6A, API 16A, API Q1 compliance for oil & gas equipment'},
      {_key:'cert-2', name:'ASME Compliance', description:'American Society of Mechanical Engineers', scope:'ASME Section VIII, B31.3 for pressure vessels and piping'},
      {_key:'cert-3', name:'ISO 14001', description:'Environmental Management System', scope:'Environmental compliance and sustainability practices'}
    ],
    standards: [
      {_key:'std-1', name:'ASME Y14.5', description:'GD&T standards compliance'},
      {_key:'std-2', name:'OSHA', description:'Workplace safety compliance'},
      {_key:'std-3', name:'EPA', description:'Environmental regulations'}
    ]
  },
  capabilities: [
    {_key:'cap-1', title:'High-Temperature Materials', description:'Superalloy and high-temperature resistant material machining', technicalDetails:[{_key:'d1',detail:'Inconel and Hastelloy expertise'},{_key:'d2',detail:'Heat treatment services'},{_key:'d3',detail:'Thermal barrier coatings'},{_key:'d4',detail:'High-temperature testing'}]},
    {_key:'cap-2', title:'Pressure Vessel Components', description:'ASME code compliance manufacturing', technicalDetails:[{_key:'d1',detail:'Pressure testing capabilities'},{_key:'d2',detail:'Weld procedure qualification'},{_key:'d3',detail:'Non-destructive testing'},{_key:'d4',detail:'Material certification'}]},
    {_key:'cap-3', title:'Large Component Machining', description:'Large capacity CNC machines for heavy components', technicalDetails:[{_key:'d1',detail:'Precision boring and turning'},{_key:'d2',detail:'Heavy component handling'},{_key:'d3',detail:'Assembly services'},{_key:'d4',detail:'Full testing capabilities'}]}
  ],
  processBenefits: [
    {_key:'b1', title:'Material Traceability', description:'Complete documentation and certification tracking', features:[{_key:'f1',feature:'Mill test certificates'},{_key:'f2',feature:'Chemical composition verification'},{_key:'f3',feature:'Heat number tracking'},{_key:'f4',feature:'Material property testing'}]},
    {_key:'b2', title:'Extreme Environment Expertise', description:'Components designed for harsh operating conditions', features:[{_key:'f1',feature:'High-temperature capability'},{_key:'f2',feature:'Corrosion resistance'},{_key:'f3',feature:'Pressure containment'},{_key:'f4',feature:'Thermal cycling tolerance'}]},
    {_key:'b3', title:'Industry Standards', description:'Comprehensive compliance with energy sector requirements', features:[{_key:'f1',feature:'API specifications'},{_key:'f2',feature:'ASME code compliance'},{_key:'f3',feature:'Environmental standards'},{_key:'f4',feature:'Quality management systems'}]}
  ],
  qualityStandards: [
    {_key:'std-1', title:'Material Certifications'},
    {_key:'std-2', title:'Pressure Testing'},
    {_key:'std-3', title:'NDT Inspection'},
    {_key:'std-4', title:'Dimensional Verification'},
    {_key:'std-5', title:'Weld Qualification'},
    {_key:'std-6', title:'Heat Treatment Records'}
  ]
};

async function updateAll() {
  console.log('🚀 Updating all industry pages...\n');
  
  try {
    console.log('🛡️  Updating Defense...');
    await client.patch(defenseId).set(defenseUpdates).commit();
    console.log('✅ Defense updated!');
  } catch (e) {
    console.error(`❌ Defense error: ${e.message}`);
  }
  
  try {
    console.log('\n⚡ Updating Energy...');
    await client.patch(energyId).set(energyUpdates).commit();
    console.log('✅ Energy updated!');
  } catch (e) {
    console.error(`❌ Energy error: ${e.message}`);
  }
  
  console.log('\n🎉 All industries updated!');
  console.log('\n👀 View pages:');
  console.log('   - http://localhost:3000/industries/aerospace');
  console.log('   - http://localhost:3000/industries/defense');
  console.log('   - http://localhost:3000/industries/energy');
}

updateAll();
