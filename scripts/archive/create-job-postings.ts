import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'
});

async function createJobPostings() {
  console.log('📝 Creating job posting documents...\n');

  const jobPostings = [
    {
      _type: 'jobPosting',
      title: 'Manufacturing Engineer',
      slug: { current: 'manufacturing-engineer' },
      department: 'Engineering',
      type: 'Full-Time',
      location: 'Clackamas, OR',
      published: true,
      featured: true,
      order: 1,
      shortDescription: 'Join our engineering team to design and optimize manufacturing processes for aerospace components.',
      description: 'We are seeking an experienced Manufacturing Engineer to join our growing team. You will be responsible for developing and optimizing manufacturing processes, improving production efficiency, and ensuring quality standards for aerospace and defense components.',
      responsibilities: [
        'Develop and optimize CNC machining processes for complex aerospace components',
        'Create detailed work instructions and process documentation',
        'Collaborate with quality engineering to ensure AS9100D compliance',
        'Design and implement tooling and fixtures for production',
        'Lead continuous improvement initiatives using lean manufacturing principles',
        'Support new product introduction and APQP processes',
        'Analyze production data to identify and resolve bottlenecks',
        'Work with cross-functional teams on DFM reviews'
      ],
      qualifications: [
        'Bachelor\'s degree in Manufacturing, Mechanical, or Industrial Engineering',
        '5+ years of experience in precision manufacturing, preferably aerospace',
        'Strong knowledge of CNC machining, particularly 5-axis milling',
        'Proficiency in CAD/CAM software (Mastercam, SolidWorks preferred)',
        'Understanding of GD&T and blueprint reading',
        'Experience with AS9100D quality management systems',
        'Strong problem-solving and analytical skills'
      ],
      preferredQualifications: [
        'Master\'s degree in relevant field',
        'Six Sigma Green or Black Belt certification',
        'Experience with ERP/MRP systems',
        'Knowledge of exotic materials (titanium, Inconel, etc.)',
        'ITAR/export control experience'
      ],
      benefits: [
        'Competitive salary based on experience',
        'Comprehensive health, dental, and vision insurance',
        '401(k) with company matching',
        'Professional development and training opportunities',
        'Paid time off and holidays',
        'Performance-based bonuses'
      ],
      salaryRange: '$85,000 - $115,000',
      applicationLink: '/contact?position=manufacturing-engineer',
      applicationInstructions: 'Please submit your resume and cover letter highlighting your relevant experience in aerospace manufacturing.',
      postedDate: new Date().toISOString(),
      closingDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString() // 60 days from now
    },
    {
      _type: 'jobPosting',
      title: 'Quality Engineer',
      slug: { current: 'quality-engineer' },
      department: 'Quality',
      type: 'Full-Time',
      location: 'Clackamas, OR',
      published: true,
      featured: true,
      order: 2,
      shortDescription: 'Lead quality assurance initiatives and ensure compliance with AS9100D and customer requirements.',
      description: 'We are looking for a detail-oriented Quality Engineer to maintain and improve our quality management systems. You will ensure all products meet stringent aerospace and defense industry standards while driving continuous improvement.',
      responsibilities: [
        'Develop and maintain quality control plans and inspection procedures',
        'Conduct first article inspections (FAI) per AS9102 requirements',
        'Manage non-conformance and corrective action processes',
        'Perform internal audits to ensure AS9100D compliance',
        'Lead root cause analysis and implement preventive actions',
        'Collaborate with customers on quality requirements and audits',
        'Maintain calibration systems and measurement system analysis',
        'Generate quality metrics and reports for management review'
      ],
      qualifications: [
        'Bachelor\'s degree in Engineering, Quality, or related field',
        '3+ years of quality engineering experience in aerospace/defense',
        'Strong knowledge of AS9100D and ISO 9001 standards',
        'Experience with CMM programming and operation',
        'Proficiency in statistical process control (SPC)',
        'Understanding of GD&T and blueprint interpretation',
        'Excellent documentation and communication skills'
      ],
      preferredQualifications: [
        'ASQ Certified Quality Engineer (CQE)',
        'Experience with Nadcap special processes',
        'Knowledge of FAIR and PPAP processes',
        'Familiarity with quality software systems',
        'Six Sigma certification'
      ],
      benefits: [
        'Competitive salary commensurate with experience',
        'Medical, dental, and vision coverage',
        '401(k) retirement plan with matching',
        'Professional certification support',
        'Paid vacation and sick leave',
        'Life and disability insurance'
      ],
      salaryRange: '$75,000 - $95,000',
      applicationLink: '/contact?position=quality-engineer',
      applicationInstructions: 'Submit your resume along with a cover letter describing your experience with aerospace quality systems.',
      postedDate: new Date().toISOString(),
      closingDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      _type: 'jobPosting',
      title: 'CNC Machinist',
      slug: { current: 'cnc-machinist' },
      department: 'Production',
      type: 'Full-Time',
      location: 'Clackamas, OR',
      published: true,
      featured: false,
      order: 3,
      shortDescription: 'Experienced CNC Machinist needed for precision aerospace component manufacturing.',
      description: 'Join our skilled production team as a CNC Machinist working with state-of-the-art equipment to produce high-precision aerospace and defense components. This role requires attention to detail and commitment to quality.',
      responsibilities: [
        'Set up and operate CNC mills and lathes (3, 4, and 5-axis)',
        'Read and interpret complex blueprints and work instructions',
        'Select appropriate tools and cutting parameters',
        'Perform in-process quality checks using precision measuring instruments',
        'Maintain tight tolerances (±0.0001") on critical features',
        'Complete production documentation and quality records',
        'Perform routine machine maintenance and housekeeping',
        'Collaborate with engineering on process improvements'
      ],
      qualifications: [
        'High school diploma or equivalent',
        '5+ years of CNC machining experience',
        'Proficiency in G-code and M-code programming',
        'Experience with Fanuc, Haas, or Mazak controls',
        'Ability to use micrometers, calipers, and other measuring tools',
        'Strong math skills and attention to detail',
        'Ability to lift 50 pounds and stand for extended periods'
      ],
      preferredQualifications: [
        'Technical degree or apprenticeship completion',
        'Experience with aerospace materials (titanium, Inconel)',
        'CAM programming experience',
        'Multi-axis machining expertise',
        'Lean manufacturing knowledge'
      ],
      benefits: [
        'Competitive hourly rate with overtime opportunities',
        'Health, dental, and vision insurance',
        '401(k) with company contribution',
        'Paid training and skill development',
        'Shift differential for 2nd/3rd shifts',
        'Tool allowance program'
      ],
      salaryRange: '$28 - $38 per hour',
      applicationLink: '/contact?position=cnc-machinist',
      applicationInstructions: 'Please submit your resume highlighting your CNC machining experience and any relevant certifications.',
      postedDate: new Date().toISOString(),
      closingDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString() // 45 days from now
    }
  ];

  try {
    for (const job of jobPostings) {
      const result = await client.create(job);
      console.log(`✅ Created job posting: ${job.title}`);
      console.log(`   ID: ${result._id}`);
      console.log(`   Department: ${job.department}`);
      console.log(`   Type: ${job.type}`);
      console.log(`   Salary: ${job.salaryRange}`);
    }

    console.log('\n✨ All job postings created successfully!');
    console.log('   The careers page will now show 3 open positions.');
    console.log('   Marketing team can edit these in Sanity Studio.');

  } catch (error: any) {
    console.error('❌ Error creating job postings:', error.message);
  }
}

createJobPostings().catch(console.error);