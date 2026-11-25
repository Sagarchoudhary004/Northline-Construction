import Admin from '../models/Admin.js';
import SiteContent from '../models/SiteContent.js';
import Project from '../models/Project.js';
import Media from '../models/Media.js';
import Enquiry from '../models/Enquiry.js';
import env from '../config/env.js';

export const DEFAULT_SITE_CONTENT = {
  key: 'primary',
  home: {
    hero: {
      eyebrow: 'CONSTRUCTION / ENGINEERING / PROJECT DELIVERY',
      headline: 'Built around what comes next.',
      supportingText:
        'We bring planning, engineering and on-site execution together to create spaces that work harder, last longer and move businesses forward.',
      primaryCtaLabel: 'EXPLORE OUR WORK',
      primaryCtaLink: '#selected-work',
      secondaryCtaLabel: 'START A PROJECT',
      secondaryCtaLink: '/contact',
      heroImage: '/uploads/seed/hero-architecture.jpg',
      heroImageAlt: 'Contemporary architectural concrete and glass commercial structure at twilight',
    },
    approach: {
      label: 'OUR APPROACH',
      headline: 'A better build starts long before the first pour.',
      description:
        'Every project carries a purpose, a deadline and a set of demands. The challenge is bringing them together without losing sight of the details. We turn requirements into a clear plan—aligning people, materials and processes so every stage has direction.',
      image: '/uploads/seed/approach-blueprint.jpg',
      imageAlt: 'Architectural blueprints, material samples, and structural planning desk',
    },
    capabilities: {
      label: 'WHAT WE DO',
      headline: 'From the first line to the final handover.',
      introduction:
        'A successful project is a sequence of connected decisions. We keep the process moving by bringing each essential stage into focus.',
      items: [
        {
          number: '01',
          title: 'PLAN',
          description:
            'We begin by understanding the brief, site conditions, intended use and delivery priorities. The result is a project plan with a clear scope, sequence and direction.',
        },
        {
          number: '02',
          title: 'ENGINEER',
          description:
            'We translate requirements into practical technical solutions, considering structure, buildability, coordination and the details that influence long-term performance.',
        },
        {
          number: '03',
          title: 'BUILD',
          description:
            'We coordinate site activities, specialist teams, materials and construction workstreams around the agreed programme, keeping communication and progress in view.',
        },
        {
          number: '04',
          title: 'DELIVER',
          description:
            'We bring the final details together through reviews, completion checks and a structured handover—so the finished space is ready for its intended purpose.',
        },
      ],
    },
    sectors: {
      label: 'WHERE WE WORK',
      headline: 'Different spaces. Different demands. One considered approach.',
      introduction:
        'From workplaces to large-scale facilities, every environment asks something different of the build. We shape the process around the purpose, people and practical requirements of each space.',
      items: [
        {
          title: 'Industrial & Manufacturing',
          description:
            'Facilities designed around operations, movement, production and the demands of daily work.',
          image: '/uploads/seed/project-foundry.jpg',
          imageAlt: 'Modern industrial manufacturing facility exterior',
        },
        {
          title: 'Commercial',
          description:
            'Workplaces and business environments where function, experience and efficiency need to work together.',
          image: '/uploads/seed/project-meridian.jpg',
          imageAlt: 'Contemporary commercial workplace architecture',
        },
        {
          title: 'Institutional',
          description:
            'Spaces created to support learning, public use and the needs of the communities they serve.',
          image: '/uploads/seed/sector-institutional.jpg',
          imageAlt: 'Institutional campus building with sunlit plaza',
        },
        {
          title: 'Healthcare',
          description:
            'Purpose-led environments where planning, coordination and attention to detail are essential.',
          image: '/uploads/seed/project-civic.jpg',
          imageAlt: 'Modern healthcare centre building facade',
        },
        {
          title: 'Hospitality',
          description:
            'Places shaped around comfort, experience and the many details that make a space welcoming.',
          image: '/uploads/seed/hero-architecture.jpg',
          imageAlt: 'Welcoming architectural hospitality environment',
        },
        {
          title: 'Residential',
          description:
            'Thoughtfully planned spaces designed around everyday life, comfort and lasting use.',
          image: '/uploads/seed/sector-residential.jpg',
          imageAlt: 'Modern residential pavilion with concrete and timber',
        },
      ],
    },
    selectedWork: {
      label: 'SELECTED WORK',
      headline: 'The work speaks in structures.',
      introduction:
        'Every project begins with a different brief. Explore a selection of sample projects that demonstrate how the right planning and execution bring an idea into the built environment.',
      disclaimer:
        'Concept Showcase: The portfolio entries below are fictional demonstration concepts illustrating Northline Build’s planning and execution methodology.',
    },
    whyNorthline: {
      label: 'THE NORTHLINE DIFFERENCE',
      headline: 'Good construction is measured in more than concrete and steel.',
      items: [
        {
          title: 'Clarity before construction',
          description:
            'A well-defined brief, scope and programme give every team a shared understanding of what needs to happen next.',
        },
        {
          title: 'Coordination at every stage',
          description:
            'Construction depends on people, materials and specialist workstreams moving together. We make coordination part of the process.',
        },
        {
          title: 'Details are part of the design',
          description:
            'Buildability, interfaces, materials and finishing all influence how a space performs. The details deserve attention from the start.',
        },
        {
          title: 'Progress you can follow',
          description:
            'Clear communication and structured reviews help clients understand progress, decisions and upcoming milestones.',
        },
      ],
    },
    closingCta: {
      headline: 'Have a project taking shape?',
      supportingText:
        'Tell us what you need to build, where you plan to build it and what success looks like. We’ll start with the right questions.',
      buttonLabel: 'DISCUSS YOUR PROJECT',
      buttonLink: '/contact',
    },
  },
  about: {
    hero: {
      eyebrow: 'ABOUT NORTHLINE',
      headline: 'We believe good construction is a team effort.',
      supportingText:
        'A successful build is never the work of one moment or one team. It takes considered planning, technical understanding and people working toward the same outcome. Our approach brings the moving parts of a project into one clear direction.',
      image: '/uploads/seed/about-site.jpg',
      imageAlt: 'Precision structural construction site in morning light',
    },
    story: {
      headline: 'Built on a better way of working.',
      description:
        'Construction is complex by nature. Requirements evolve, disciplines overlap and decisions made at one stage can shape everything that follows. Northline Build is founded on a simple idea: the process should be as considered as the finished structure. We focus on connecting the brief, the plan and the work on site—so clients have a clearer path from the first conversation to final handover.',
      image: '/uploads/seed/approach-blueprint.jpg',
      imageAlt: 'Engineering planning and material coordination',
    },
    approach: {
      headline: 'Think it through. Build it right.',
      description:
        'We see construction as a connected process, not a sequence of isolated tasks. We begin by understanding the brief and the people who will use the space. From there, planning and technical coordination establish a practical route forward. During execution, communication and review keep the work aligned with the project requirements. The aim is simple: make informed decisions, resolve issues early and keep the purpose of the project in view.',
    },
    values: {
      headline: 'What Guides Our Work',
      items: [
        {
          title: 'PURPOSE',
          description:
            'Every decision should serve the function and future use of the space. We begin with what the project needs to achieve.',
        },
        {
          title: 'PRECISION',
          description:
            'Good outcomes come from considered planning, coordinated details and attention to the work at every stage.',
        },
        {
          title: 'COLLABORATION',
          description:
            'The best work happens when clients, consultants, suppliers and site teams understand the same goal.',
        },
        {
          title: 'RESPONSIBILITY',
          description:
            'We value clear communication, realistic commitments and ownership of the work entrusted to us.',
        },
      ],
    },
    process: {
      headline: 'A clear route from brief to built.',
      items: [
        {
          number: '01',
          title: 'UNDERSTAND',
          description:
            'We listen to the brief, review the site context and define the project’s needs, constraints and priorities.',
        },
        {
          number: '02',
          title: 'PLAN',
          description:
            'We develop the scope, sequence, coordination points and resources required to move the project forward.',
        },
        {
          number: '03',
          title: 'EXECUTE',
          description:
            'We coordinate construction activities and specialist teams, keeping progress, communication and quality reviews connected.',
        },
        {
          number: '04',
          title: 'COMPLETE',
          description:
            'We work through final details, completion requirements and handover so the space can move into its next chapter.',
        },
      ],
    },
    closingCta: {
      headline: 'Let’s make the next build a considered one.',
      supportingText:
        'Have a brief, a site or an idea you’re ready to move forward? We’d like to hear about it.',
      buttonLabel: 'START A CONVERSATION',
      buttonLink: '/contact',
    },
  },
  contact: {
    hero: {
      headline: 'Let’s give your next project a strong start.',
      supportingText:
        'Whether you’re planning a new facility, developing a commercial space or exploring a construction partnership, tell us a little about the project. Share the details you have today. We’ll take it from there.',
    },
    form: {
      heading: 'Tell us what you’re planning.',
      supportingText:
        'A few details will help us understand your requirements and direct your enquiry to the right team.',
      submitLabel: 'SEND PROJECT ENQUIRY',
      successMessage:
        'Thank you for reaching out. Your enquiry has been received. Our team will review the details and get back to you.',
      errorMessage:
        'We couldn’t submit your enquiry just now. Please check the required fields and try again.',
    },
    info: {
      heading: 'Prefer to speak with someone?',
      supportingText:
        'Reach out directly or share your project details through the form. We’ll help you take the next step.',
      email: 'projects@northlinebuild.com',
      phone: '+91 20 4852 1900',
      officeAddress: 'Suite 402, Northline Chambers, Baner High Street, Pune 411045, India',
      socialLinks: [
        { platform: 'LinkedIn', label: 'LinkedIn', url: 'https://www.linkedin.com' },
        { platform: 'Instagram', label: 'Instagram', url: 'https://www.instagram.com' },
      ],
    },
  },
  footer: {
    brandName: 'Northline Build',
    brandLine: 'Building with purpose. Delivering with care.',
    ctaText: 'Have a project in mind? Let’s talk.',
    ctaButtonLabel: 'START A PROJECT',
    ctaLink: '/contact',
    copyrightText: '© 2026 Northline Build. All rights reserved.',
  },
  seo: {
    home: {
      title: 'Northline Build — Construction, Engineering & Project Delivery',
      description:
        'We bring planning, engineering and on-site execution together to create spaces that work harder, last longer and move businesses forward.',
    },
    about: {
      title: 'About Us — Northline Build',
      description:
        'We believe good construction is a team effort. Learn about Northline Build’s story, values and four-stage project delivery process.',
    },
    contact: {
      title: 'Contact Us — Northline Build',
      description:
        'Share your facility, commercial or institutional project brief with Northline Build to start a structured conversation.',
    },
  },
};

export const DEFAULT_PROJECTS = [
  {
    title: 'THE FOUNDRY CAMPUS',
    slug: 'the-foundry-campus',
    category: 'Industrial Facility',
    location: 'Pune, India',
    area: '180,000 sq. ft.',
    description:
      'A production-focused campus planned to bring operational areas, movement routes and support spaces into one connected environment.',
    imageUrl: '/uploads/seed/project-foundry.jpg',
    imageAlt: 'The Foundry Campus conceptual industrial facility exterior',
    order: 0,
    published: true,
    isFictionalDemo: true,
  },
  {
    title: 'CIVIC HEALTH CENTRE',
    slug: 'civic-health-centre',
    category: 'Healthcare',
    location: 'Jaipur, India',
    area: '95,000 sq. ft.',
    description:
      'A healthcare facility concept shaped around patient flow, clinical functions and the practical needs of staff and visitors.',
    imageUrl: '/uploads/seed/project-civic.jpg',
    imageAlt: 'Civic Health Centre conceptual healthcare architecture',
    order: 1,
    published: true,
    isFictionalDemo: true,
  },
  {
    title: 'MERIDIAN BUSINESS HOUSE',
    slug: 'meridian-business-house',
    category: 'Commercial',
    location: 'Bengaluru, India',
    area: '72,000 sq. ft.',
    description:
      'A contemporary workplace development designed to balance collaborative spaces, focused work areas and everyday building operations.',
    imageUrl: '/uploads/seed/project-meridian.jpg',
    imageAlt: 'Meridian Business House conceptual commercial office building',
    order: 2,
    published: true,
    isFictionalDemo: true,
  },
];

export const DEFAULT_MEDIA = [
  {
    title: 'Hero Architecture',
    originalName: 'hero-architecture.jpg',
    url: '/uploads/seed/hero-architecture.jpg',
    publicId: 'local/seed/hero-architecture.jpg',
    storageProvider: 'local',
    mimeType: 'image/jpeg',
    bytes: 0,
    alt: 'Contemporary architectural concrete and glass commercial structure at twilight',
    category: 'hero',
  },
  {
    title: 'Approach Blueprint',
    originalName: 'approach-blueprint.jpg',
    url: '/uploads/seed/approach-blueprint.jpg',
    publicId: 'local/seed/approach-blueprint.jpg',
    storageProvider: 'local',
    mimeType: 'image/jpeg',
    bytes: 0,
    alt: 'Architectural blueprints, material samples, and structural planning desk',
    category: 'about',
  },
  {
    title: 'The Foundry Campus',
    originalName: 'project-foundry.jpg',
    url: '/uploads/seed/project-foundry.jpg',
    publicId: 'local/seed/project-foundry.jpg',
    storageProvider: 'local',
    mimeType: 'image/jpeg',
    bytes: 0,
    alt: 'The Foundry Campus industrial manufacturing exterior',
    category: 'project',
  },
  {
    title: 'Civic Health Centre',
    originalName: 'project-civic.jpg',
    url: '/uploads/seed/project-civic.jpg',
    publicId: 'local/seed/project-civic.jpg',
    storageProvider: 'local',
    mimeType: 'image/jpeg',
    bytes: 0,
    alt: 'Civic Health Centre modern healthcare exterior',
    category: 'project',
  },
  {
    title: 'Meridian Business House',
    originalName: 'project-meridian.jpg',
    url: '/uploads/seed/project-meridian.jpg',
    publicId: 'local/seed/project-meridian.jpg',
    storageProvider: 'local',
    mimeType: 'image/jpeg',
    bytes: 0,
    alt: 'Meridian Business House commercial facade',
    category: 'project',
  },
  {
    title: 'Precision Construction Site',
    originalName: 'about-site.jpg',
    url: '/uploads/seed/about-site.jpg',
    publicId: 'local/seed/about-site.jpg',
    storageProvider: 'local',
    mimeType: 'image/jpeg',
    bytes: 0,
    alt: 'Precision structural construction site in morning light',
    category: 'about',
  },
  {
    title: 'Institutional Campus Sector',
    originalName: 'sector-institutional.jpg',
    url: '/uploads/seed/sector-institutional.jpg',
    publicId: 'local/seed/sector-institutional.jpg',
    storageProvider: 'local',
    mimeType: 'image/jpeg',
    bytes: 0,
    alt: 'Institutional campus architecture',
    category: 'sector',
  },
  {
    title: 'Residential Pavilion Sector',
    originalName: 'sector-residential.jpg',
    url: '/uploads/seed/sector-residential.jpg',
    publicId: 'local/seed/sector-residential.jpg',
    storageProvider: 'local',
    mimeType: 'image/jpeg',
    bytes: 0,
    alt: 'Contemporary residential architectural pavilion',
    category: 'sector',
  },
];

export const DEFAULT_ENQUIRIES = [
  {
    fullName: 'Rohan Deshmukh',
    company: 'Kaveri Precision Systems',
    email: 'rohan.deshmukh@kaveriprecision.com',
    phone: '+91 98220 41120',
    projectType: 'Industrial',
    location: 'Chakan MIDC, Pune',
    approximateArea: '110,000 sq. ft.',
    expectedStart: 'Q3 2026',
    message:
      'Planning a new assembly and logistics facility with integrated administrative offices and loading bays. Looking for pre-construction planning and turnkey delivery.',
    status: 'New',
    adminNotes: 'Initial site brief received. Schedule technical review call.',
  },
  {
    fullName: 'Ananya Nair',
    company: 'Aurelia Diagnostics Group',
    email: 'ananya.nair@aureliadiagnostics.in',
    phone: '+91 98450 77310',
    projectType: 'Healthcare',
    location: 'Bengaluru',
    approximateArea: '48,000 sq. ft.',
    expectedStart: 'Q4 2026',
    message:
      'Developing a multi-floor outpatient diagnostics and clinical hub. Require coordinated MEP engineering and phased interior fit-out.',
    status: 'In Progress',
    adminNotes: 'Preliminary MEP checklist shared with client.',
  },
];

export async function ensureSeedData() {
  const existingAdmin = await Admin.findOne({ email: env.adminSeed.email.toLowerCase() });
  if (!existingAdmin) {
    const passwordHash = await Admin.hashPassword(env.adminSeed.password);
    await Admin.create({
      name: env.adminSeed.name,
      email: env.adminSeed.email.toLowerCase(),
      passwordHash,
      role: 'admin',
    });
    console.log(`[Seed] Created default admin: ${env.adminSeed.email}`);
  }

  const existingContent = await SiteContent.findOne({ key: 'primary' });
  if (!existingContent) {
    await SiteContent.create(DEFAULT_SITE_CONTENT);
    console.log('[Seed] Created primary site content');
  }

  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany(DEFAULT_PROJECTS);
    console.log(`[Seed] Inserted ${DEFAULT_PROJECTS.length} sample projects`);
  }

  const mediaCount = await Media.countDocuments();
  if (mediaCount === 0) {
    await Media.insertMany(DEFAULT_MEDIA);
    console.log(`[Seed] Inserted ${DEFAULT_MEDIA.length} seed media assets`);
  }

  const enquiryCount = await Enquiry.countDocuments();
  if (enquiryCount === 0) {
    await Enquiry.insertMany(DEFAULT_ENQUIRIES);
    console.log(`[Seed] Inserted ${DEFAULT_ENQUIRIES.length} sample enquiries`);
  }
}
