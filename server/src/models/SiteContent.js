import mongoose from 'mongoose';

const capabilityItemSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const sectorItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    imageAlt: { type: String, default: '' },
  },
  { _id: false }
);

const titleDescSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const siteContentSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'primary', unique: true },
    home: {
      hero: {
        eyebrow: { type: String, required: true },
        headline: { type: String, required: true },
        supportingText: { type: String, required: true },
        primaryCtaLabel: { type: String, required: true },
        primaryCtaLink: { type: String, default: '#selected-work' },
        secondaryCtaLabel: { type: String, required: true },
        secondaryCtaLink: { type: String, default: '/contact' },
        heroImage: { type: String, default: '' },
        heroImageAlt: { type: String, default: 'Modern architectural concrete and steel structure' },
      },
      approach: {
        label: { type: String, required: true },
        headline: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, default: '' },
        imageAlt: { type: String, default: 'Architectural planning and structural blueprint review' },
      },
      capabilities: {
        label: { type: String, required: true },
        headline: { type: String, required: true },
        introduction: { type: String, required: true },
        items: { type: [capabilityItemSchema], default: [] },
      },
      sectors: {
        label: { type: String, required: true },
        headline: { type: String, required: true },
        introduction: { type: String, required: true },
        items: { type: [sectorItemSchema], default: [] },
      },
      selectedWork: {
        label: { type: String, required: true },
        headline: { type: String, required: true },
        introduction: { type: String, required: true },
        disclaimer: { type: String, default: 'Demonstration concept portfolio entries illustrating capability and planning approach.' },
      },
      whyNorthline: {
        label: { type: String, required: true },
        headline: { type: String, required: true },
        items: { type: [titleDescSchema], default: [] },
      },
      closingCta: {
        headline: { type: String, required: true },
        supportingText: { type: String, required: true },
        buttonLabel: { type: String, required: true },
        buttonLink: { type: String, default: '/contact' },
      },
    },
    about: {
      hero: {
        eyebrow: { type: String, required: true },
        headline: { type: String, required: true },
        supportingText: { type: String, required: true },
        image: { type: String, default: '' },
        imageAlt: { type: String, default: 'Northline Build architectural team collaboration' },
      },
      story: {
        headline: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, default: '' },
        imageAlt: { type: String, default: 'Precision structural construction site' },
      },
      approach: {
        headline: { type: String, required: true },
        description: { type: String, required: true },
      },
      values: {
        headline: { type: String, default: 'What Guides Our Work' },
        items: { type: [titleDescSchema], default: [] },
      },
      process: {
        headline: { type: String, required: true },
        items: { type: [capabilityItemSchema], default: [] },
      },
      closingCta: {
        headline: { type: String, required: true },
        supportingText: { type: String, required: true },
        buttonLabel: { type: String, required: true },
        buttonLink: { type: String, default: '/contact' },
      },
    },
    contact: {
      hero: {
        headline: { type: String, required: true },
        supportingText: { type: String, required: true },
      },
      form: {
        heading: { type: String, required: true },
        supportingText: { type: String, required: true },
        submitLabel: { type: String, required: true },
        successMessage: { type: String, required: true },
        errorMessage: { type: String, required: true },
      },
      info: {
        heading: { type: String, required: true },
        supportingText: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        officeAddress: { type: String, required: true },
        socialLinks: { type: [socialLinkSchema], default: [] },
      },
    },
    footer: {
      brandName: { type: String, default: 'Northline Build' },
      brandLine: { type: String, required: true },
      ctaText: { type: String, required: true },
      ctaButtonLabel: { type: String, default: 'START A PROJECT' },
      ctaLink: { type: String, default: '/contact' },
      copyrightText: { type: String, required: true },
    },
    seo: {
      home: {
        title: { type: String, default: 'Northline Build — Construction, Engineering & Project Delivery' },
        description: { type: String, default: 'Planning, engineering and on-site execution for industrial, commercial, institutional and residential spaces.' },
      },
      about: {
        title: { type: String, default: 'About Us — Northline Build' },
        description: { type: String, default: 'Discover Northline Build’s connected construction approach, values and delivery process.' },
      },
      contact: {
        title: { type: String, default: 'Contact Us — Northline Build' },
        description: { type: String, default: 'Start a construction or engineering project enquiry with Northline Build.' },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model('SiteContent', siteContentSchema);
