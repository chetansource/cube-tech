import React, { useState, useEffect, useRef } from 'react';
import { Box, Label, Input, Button, Text, Select, CheckBox } from '@adminjs/design-system';
import { getMedia, invalidateMedia } from './mediaCache';

// ─── BLOCK TYPE FIELD MAPPINGS ───────────────────────────────────────
// Each block type lists ONLY the fields the frontend actually uses.
// Field types: 'text', 'textarea', 'boolean', 'media', 'array', 'refArray', 'info'

const BLOCK_TYPE_FIELDS = {
  // ── Contact Us ──
  'contact-info': {
    label: 'Contact Info',
    fields: [
      { name: 'phone', type: 'text' },
      { name: 'email', type: 'text' },
      { name: 'locations', type: 'array' },
      { name: 'socials', type: 'array' },
    ],
  },
  'faqSection': {
    label: 'FAQ Section',
    fields: [
      { name: 'faqs', type: 'array' },
    ],
  },
  'resourcesFaqSection': {
    label: 'Resources FAQ Section',
    fields: [
      { name: 'faqs', type: 'array' },
    ],
  },

  // ── Homepage ──
  'heroSection': {
    label: 'Hero Section',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'ctaText', type: 'text' },
      { name: 'ctaLink', type: 'text' },
      { name: 'backgroundImage', type: 'media' },
    ],
  },
  'servicesSolutionsSection': {
    label: 'Services Solutions Section',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'highlightedWord', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'ctaText', type: 'text' },
      { name: 'ctaLink', type: 'text' },
      { name: 'backgroundImage', type: 'media' },
    ],
    infoMessage: 'Solutions are managed from Site Elements → Solution. Tick "Show On Service Page" on each solution to display it here.',
  },
  'servicesSection': {
    label: 'Services Section',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'image', type: 'media' },
    ],
  },
  'exploreMoreSection': {
    label: 'Explore More Section',
    fields: [
      { name: 'exploreMoreTitle', type: 'text' },
      { name: 'exploreMoreDescription', type: 'textarea' },
      { name: 'exploreMoreBackgroundImage', type: 'media' },
    ],
  },

  // ── About Us ──
  'aboutHeroSection': {
    label: 'About Hero Section',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'subheading', type: 'text' },
      { name: 'backgroundImage', type: 'media' },
    ],
  },
  'leadershipSection': {
    label: 'Leadership Section',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'leaders', type: 'array' },
    ],
  },
  'teamSection': {
    label: 'Team Section',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'members', type: 'array' },
    ],
  },
  'timelineSection': {
    label: 'Timeline Section',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'timelineItems', type: 'array' },
    ],
  },
  'corporateResponsibilitySection': {
    label: 'Corporate Responsibility',
    fields: [
      { name: 'mainHeading', type: 'text' },
      { name: 'subheading', type: 'text' },
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'tags', type: 'tagArray' },
      { name: 'backgroundImage', type: 'media' },
    ],
  },
  'statsSection': {
    label: 'Stats Section',
    fields: [],
    infoMessage: 'Stats data comes from the Stats collection. Go to Site Elements → Stat to add/edit stats.',
  },
  'testimonialsSection': {
    label: 'Testimonials Section',
    fields: [],
    infoMessage: 'Testimonials data comes from the Testimonials collection. Go to Site Elements → Testimonial to add/edit.',
  },

  // ── Services Page ──
  'servicesHeroSection': {
    label: 'Services Hero Section',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'highlightedWord', type: 'text' },
      { name: 'backgroundImage', type: 'media' },
    ],
  },
  'servicesOfferedSection': {
    label: 'Services Offered Section',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'highlightedWord', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'bannerImage', type: 'media' },
    ],
  },
  'projectMapSection': {
    label: 'Project Map Section',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'highlightedWord', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'ctaText', type: 'text' },
      { name: 'ctaLink', type: 'text' },
    ],
  },
  'contactBannerSection': {
    label: 'Contact Banner Section',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'ctaText', type: 'text' },
      { name: 'ctaLink', type: 'text' },
      { name: 'backgroundImage', type: 'media' },
    ],
  },

  // ── Projects Page ──
  'projectsHeroSection': {
    label: 'Projects Hero Section',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'highlightedWord', type: 'text' },
      { name: 'backgroundImage', type: 'media' },
    ],
  },

  // ── Resources Page ──
  'resourcesHeroSection': {
    label: 'Resources Hero Section',
    fields: [
      { name: 'heroTitle', type: 'text' },
      { name: 'heroTitleItalic', type: 'text' },
      { name: 'heroBackgroundImage', type: 'media' },
    ],
  },
  'insightsImpactSection': {
    label: 'Insights & Impact Section',
    fields: [
      { name: 'insightsHeading', type: 'text' },
      { name: 'insightsSubheading', type: 'text' },
      { name: 'impactHighlightWord', type: 'text' },
      { name: 'insightsDescription', type: 'textarea' },
      { name: 'insightsBackgroundImage', type: 'media' },
      { name: 'businessHeading', type: 'text' },
      { name: 'businessHeadingItalic', type: 'text' },
      { name: 'planetHeading', type: 'text' },
      { name: 'planetHeadingItalic', type: 'text' },
      { name: 'businessDescription', type: 'textarea' },
      { name: 'exploreServicesButtonText', type: 'text' },
    ],
  },
  'resourceGallerySection': {
    label: 'Resource Gallery Section',
    fields: [
      { name: 'galleryBackgroundImage', type: 'media' },
    ],
  },
  'newsEventsSection': {
    label: 'News & Events Section',
    fields: [
      { name: 'newsEventsTitle', type: 'text' },
      { name: 'newsEventsDescription', type: 'textarea' },
      { name: 'newsEventsBackgroundImage', type: 'media' },
      { name: 'showNewsletter', type: 'boolean' },
    ],
  },

  // ── Careers Page ──
  'careerTitle': {
    label: 'Career Title',
    fields: [
      { name: 'headingLine1', type: 'text' },
      { name: 'headingLine2', type: 'text' },
      { name: 'description', type: 'textarea' },
    ],
  },
  'exploreCardsSection': {
    label: 'Explore Cards Section',
    fields: [
      { name: 'cards', type: 'array' },
    ],
  },
  'jobListSection': {
    label: 'Job List Section',
    fields: [],
    infoMessage: 'Job listings come from the Jobs collection. Go to Careers → Job to add/edit job postings.',
  },

  // ── Generic / Shared ──
  'aboutSection': {
    label: 'About Section',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'content', type: 'textarea' },
      { name: 'image', type: 'media' },
    ],
  },
  'ctaSection': {
    label: 'CTA Section',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'ctaText', type: 'text' },
      { name: 'ctaLink', type: 'text' },
      { name: 'backgroundImage', type: 'media' },
    ],
  },
  'partnersSection': {
    label: 'Partners Section',
    fields: [],
    infoMessage: 'Partners data comes from the Partners collection. Go to Site Elements → Partner to add/edit.',
  },
  'projectsSection': {
    label: 'Projects Section',
    fields: [],
    infoMessage: 'Projects data comes from the Projects collection. Go to Content → Project to add/edit.',
  },
  'awardsSection': {
    label: 'Awards Section',
    fields: [],
    infoMessage: 'Awards data comes from the Awards collection. Go to Site Elements → Award to add/edit.',
  },
  'solutionsSection': {
    label: 'Solutions Section',
    fields: [],
    infoMessage: 'Solutions data comes from the Solutions collection. Go to Site Elements → Solution to add/edit.',
  },
  'richTextSection': {
    label: 'Rich Text / Legal Content',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'content', type: 'textarea' },
    ],
  },
};

// Block type dropdown options
const BLOCK_TYPE_OPTIONS = Object.entries(BLOCK_TYPE_FIELDS).map(([value, config]) => ({
  value,
  label: config.label,
}));

// ─── ARRAY SUB-FIELDS ────────────────────────────────────────────────

const getSubFieldsForArray = (fieldName) => {
  switch (fieldName) {
    case 'locations': return [
      { name: 'label', type: 'text' },
      { name: 'address', type: 'textarea' },
    ];
    case 'socials': return [
      { name: 'platform', type: 'text' },
      { name: 'url', type: 'text' },
    ];
    case 'faqs': return [
      { name: 'question', type: 'text' },
      { name: 'answer', type: 'textarea' },
    ];
    case 'cards': return [
      { name: 'title', type: 'text' },
      { name: 'content', type: 'textarea' },
      { name: 'date', type: 'text' },
      { name: 'cardType', type: 'select', options: [
        { value: 'text', label: 'Text' },
        { value: 'featured', label: 'Featured' },
        { value: 'image', label: 'Image' },
      ]},
      { name: 'bgColor', type: 'text' },
      { name: 'textColor', type: 'text' },
      { name: 'image', type: 'media' },
      { name: 'order', type: 'text' },
    ];
    case 'leaders': return [
      { name: 'name', type: 'text' },
      { name: 'designation', type: 'text' },
      { name: 'image', type: 'media' },
      { name: 'linkedIn', type: 'text' },
    ];
    case 'members': return [
      { name: 'name', type: 'text' },
      { name: 'designation', type: 'text' },
      { name: 'image', type: 'media' },
      { name: 'linkedIn', type: 'text' },
    ];
    case 'timelineItems': return [
      { name: 'image', type: 'media', hideWhen: { field: 'isIconOnly', value: true } },
      { name: 'year', type: 'text', hideWhen: { field: 'isIconOnly', value: true } },
      { name: 'side', type: 'select', options: [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ], hideWhen: { field: 'isIconOnly', value: true } },
      { name: 'title', type: 'text', hideWhen: { field: 'isIconOnly', value: true } },
      { name: 'content', type: 'textarea', hideWhen: { field: 'isIconOnly', value: true } },
      { name: 'isIconOnly', type: 'boolean' },
      { name: 'iconType', type: 'iconSelect', showWhen: { field: 'isIconOnly', value: true } },
    ];
    default: return [];
  }
};

const ARRAY_FIELDS = ['locations', 'socials', 'faqs', 'cards', 'leaders', 'members', 'timelineItems'];

// ─── STYLES ──────────────────────────────────────────────────────────

// ─── ICON TYPE PREVIEWS ─────────────────────────────────────────────
const ICON_OPTIONS = [
  {
    value: '1',
    label: 'Equalizer',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none"><path d="M5.48828 20.9219C5.20495 20.9219 4.96761 20.8259 4.77628 20.6339C4.58495 20.4419 4.48895 20.2045 4.48828 19.9219V5.92188C4.48828 5.63855 4.58428 5.40121 4.77628 5.20988C4.96828 5.01855 5.20561 4.92255 5.48828 4.92188C5.77095 4.92121 6.00861 5.01721 6.20128 5.20988C6.39395 5.40255 6.48961 5.63988 6.48828 5.92188V19.9219C6.48828 20.2052 6.39228 20.4429 6.20028 20.6349C6.00828 20.8269 5.77095 20.9225 5.48828 20.9219ZM12.4883 20.9219C12.2049 20.9219 11.9676 20.8259 11.7763 20.6339C11.5849 20.4419 11.4889 20.2045 11.4883 19.9219V17.9219C11.4883 17.6385 11.5843 17.4012 11.7763 17.2099C11.9683 17.0185 12.2056 16.9225 12.4883 16.9219C12.7709 16.9212 13.0086 17.0172 13.2013 17.2099C13.3939 17.4025 13.4896 17.6399 13.4883 17.9219V19.9219C13.4883 20.2052 13.3923 20.4429 13.2003 20.6349C13.0083 20.8269 12.7709 20.9225 12.4883 20.9219ZM19.4883 20.9219C19.2049 20.9219 18.9676 20.8259 18.7763 20.6339C18.5849 20.4419 18.4889 20.2045 18.4883 19.9219V5.92188C18.4883 5.63855 18.5843 5.40121 18.7763 5.20988C18.9683 5.01855 19.2056 4.92255 19.4883 4.92188C19.7709 4.92121 20.0086 5.01721 20.2013 5.20988C20.3939 5.40255 20.4896 5.63988 20.4883 5.92188V19.9219C20.4883 20.2052 20.3923 20.4429 20.2003 20.6349C20.0083 20.8269 19.7709 20.9225 19.4883 20.9219ZM12.4883 14.9219C12.2049 14.9219 11.9676 14.8259 11.7763 14.6339C11.5849 14.4419 11.4889 14.2045 11.4883 13.9219V11.9219C11.4883 11.6385 11.5843 11.4012 11.7763 11.2099C11.9683 11.0185 12.2056 10.9225 12.4883 10.9219C12.7709 10.9212 13.0086 11.0172 13.2013 11.2099C13.3939 11.4025 13.4896 11.6399 13.4883 11.9219V13.9219C13.4883 14.2052 13.3923 14.4429 13.2003 14.6349C13.0083 14.8269 12.7709 14.9225 12.4883 14.9219ZM12.4883 8.92188C12.2049 8.92188 11.9676 8.82588 11.7763 8.63388C11.5849 8.44188 11.4889 8.20455 11.4883 7.92188V5.92188C11.4883 5.63855 11.5843 5.40121 11.7763 5.20988C11.9683 5.01855 12.2056 4.92255 12.4883 4.92188C12.7709 4.92121 13.0086 5.01721 13.2013 5.20988C13.3939 5.40255 13.4896 5.63988 13.4883 5.92188V7.92188C13.4883 8.20521 13.3923 8.44288 13.2003 8.63488C13.0083 8.82688 12.7709 8.92254 12.4883 8.92188Z" fill="white"/></svg>',
  },
  {
    value: '2',
    label: 'Infrastructure',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none"><g clip-path="url(#clip_ic2)"><path d="M15.8633 13.9219V12.9219C15.8633 12.7219 15.8633 8.82187 12.8883 7.52187C10.5508 6.52187 10.5508 4.02187 10.5508 3.92188V0.921875H8.42578V3.92188C8.42578 4.02187 8.42578 6.52187 6.08828 7.52187C3.11328 8.82187 3.11328 12.7219 3.11328 12.9219V13.9219H0.988281L4.17578 16.9219L7.36328 13.9219H5.23828V12.9219C5.23828 12.9219 5.23828 10.1219 7.04453 9.32187C8.21328 8.82187 8.95703 8.02187 9.48828 7.32188C10.0195 8.12188 10.7633 8.82187 11.932 9.32187C13.7383 10.1219 13.7383 12.9219 13.7383 12.9219V13.9219H11.6133L14.8008 16.9219L17.9883 13.9219H15.8633Z" fill="white"/></g><defs><clipPath id="clip_ic2"><rect width="17" height="16" fill="white" transform="translate(0.988281 0.921875)"/></clipPath></defs></svg>',
  },
  {
    value: '3',
    label: 'Settings',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 23" fill="none"><path d="M14.5508 3.21094C14.5508 5.80327 14.5508 7.10035 15.3199 7.90519C16.0882 8.71094 17.3263 8.71094 19.8008 8.71094M14.5508 20.6276C14.5508 18.0353 14.5508 16.7382 15.3199 15.9334C16.0882 15.1276 17.3263 15.1276 19.8008 15.1276M8.42578 3.21094C8.42578 5.80327 8.42578 7.10035 7.65666 7.90519C6.88841 8.71094 5.65028 8.71094 3.17578 8.71094M8.42578 20.6276C8.42578 18.0353 8.42578 16.7382 7.65666 15.9334C6.88841 15.1276 5.65028 15.1276 3.17578 15.1276M11.4883 3.21094V5.04427M19.8008 11.9193H18.0508M11.4883 18.7943V20.6276M4.92578 11.9193H3.17578M14.1133 11.9193C14.1133 12.6486 13.8367 13.3481 13.3444 13.8638C12.8522 14.3795 12.1845 14.6693 11.4883 14.6693C10.7921 14.6693 10.1244 14.3795 9.63213 13.8638C9.13984 13.3481 8.86328 12.6486 8.86328 11.9193C8.86328 11.1899 9.13984 10.4905 9.63213 9.97473C10.1244 9.459 10.7921 9.16927 11.4883 9.16927C12.1845 9.16927 12.8522 9.459 13.3444 9.97473C13.8367 10.4905 14.1133 11.1899 14.1133 11.9193Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
];

const IconSelectField = ({ value, onChange }) => {
  const selected = String(value);
  return (
    <Box flex flexDirection="row" style={{ gap: '12px' }}>
      {ICON_OPTIONS.map((opt) => (
        <Box
          key={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            cursor: 'pointer',
            border: selected === opt.value ? '3px solid #3040D6' : '2px solid #ddd',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            background: selected === opt.value ? '#eef1ff' : '#fff',
            transition: 'all 0.15s',
          }}
        >
          <Box style={{
            width: '40px', height: '40px', borderRadius: '50%', background: '#5FBA51',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span dangerouslySetInnerHTML={{ __html: opt.svg }} />
          </Box>
          <Text fontSize="xs" fontWeight={selected === opt.value ? 'bold' : 'normal'}>
            {opt.label}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

// ─── STYLES ──────────────────────────────────────────────────────────

const styles = {
  fullWidth: { width: '100%' },
  label: { textTransform: 'capitalize', fontWeight: 600, marginBottom: '6px', display: 'block' },
  labelSm: { textTransform: 'capitalize', fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' },
  textarea: {
    width: '100%', padding: '8px 12px', border: '1px solid #C0C0CA',
    borderRadius: '4px', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical',
  },
  textareaSm: {
    width: '100%', padding: '8px 12px', border: '1px solid #C0C0CA',
    borderRadius: '4px', fontSize: '13px', fontFamily: 'inherit', resize: 'vertical',
  },
  sectionBox: {
    border: '2px solid #3040D6', borderRadius: '10px', padding: '24px', background: '#fafbff', width: '100%',
  },
  arrayBox: {
    border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', width: '100%',
  },
  savedItem: {
    background: '#f9f9f9', padding: '16px', borderRadius: '6px', border: '1px solid #eee', width: '100%',
  },
  newItem: {
    background: '#fff8e1', padding: '16px', borderRadius: '6px', border: '2px dashed #f0ad4e', width: '100%',
  },
  infoBox: {
    background: '#e8f4fd', border: '1px solid #b3d7f2', borderRadius: '8px', padding: '16px', width: '100%',
  },
  mediaBox: {
    background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '6px', padding: '12px', width: '100%',
  },
};

// ─── COMPONENT ───────────────────────────────────────────────────────

const SectionEdit = (props) => {
  const { record, onChange } = props;
  const params = record.params || {};
  const [newItems, setNewItems] = useState({});
  const [tagInputs, setTagInputs] = useState({});
  const [mediaOptions, setMediaOptions] = useState([]);
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState(() => {
    // Start all sections collapsed by default
    const initial = {};
    Object.keys(record.params || {}).forEach((key) => {
      const match = key.match(/^sections\.(\d+)\./);
      if (match) initial[parseInt(match[1], 10)] = true;
    });
    return initial;
  });

  const toggleCollapse = (idx) => {
    setCollapsedSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const [dragStates, setDragStates] = useState({});
  const [uploadStates, setUploadStates] = useState({});
  const [renameStates, setRenameStates] = useState({});
  const [savingStates, setSavingStates] = useState({});
  const dropRefs = useRef({});
  const dragCounters = useRef({});

  useEffect(() => {
    getMedia().then((docs) => {
      setMediaOptions(docs.map((m) => ({
        value: m._id,
        label: m.originalFilename || m.filename,
        url: m.url,
      })));
    });
  }, []);

  // Prevent browser default file open on drag/drop
  useEffect(() => {
    const preventDefaults = (e) => { e.preventDefault(); e.stopPropagation(); };
    window.addEventListener('dragover', preventDefaults);
    window.addEventListener('drop', preventDefaults);
    return () => {
      window.removeEventListener('dragover', preventDefaults);
      window.removeEventListener('drop', preventDefaults);
    };
  }, []);

  // Get section indices
  const getSectionIndices = () => {
    const indices = [];
    Object.keys(params).forEach((key) => {
      const match = key.match(/^sections\.(\d+)\./);
      if (match) {
        const idx = parseInt(match[1], 10);
        if (!indices.includes(idx)) indices.push(idx);
      }
    });
    return indices.sort((a, b) => a - b);
  };

  const sectionIndices = getSectionIndices();

  const getArrayIndices = (sectionIdx, fieldName) => {
    const prefix = `sections.${sectionIdx}.${fieldName}`;
    const indices = [];
    Object.keys(params).forEach((key) => {
      const escaped = prefix.replace(/\./g, '\\.');
      const match = key.match(new RegExp(`^${escaped}\\.(\\d+)`));
      if (match) {
        const idx = parseInt(match[1], 10);
        if (!indices.includes(idx)) indices.push(idx);
      }
    });
    return indices.sort((a, b) => a - b);
  };

  const swapSections = (idxA, idxB) => {
    const prefixA = `sections.${idxA}.`;
    const prefixB = `sections.${idxB}.`;
    const keysA = Object.keys(params).filter((k) => k.startsWith(prefixA));
    const keysB = Object.keys(params).filter((k) => k.startsWith(prefixB));
    const valsA = {};
    const valsB = {};
    keysA.forEach((k) => { valsA[k.replace(prefixA, '')] = params[k]; });
    keysB.forEach((k) => { valsB[k.replace(prefixB, '')] = params[k]; });
    [...keysA, ...keysB].forEach((k) => onChange(k, undefined));
    Object.entries(valsA).forEach(([suffix, val]) => onChange(`${prefixB}${suffix}`, val));
    Object.entries(valsB).forEach(([suffix, val]) => onChange(`${prefixA}${suffix}`, val));
  };

  // ── Render helpers ──

  const formatLabel = (name) => name.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).trim();

  const renderTextInput = (id, value, onChangeFn) => (
    <Input id={id} value={value} onChange={onChangeFn} style={styles.fullWidth} />
  );

  const renderTextarea = (id, value, onChangeFn, small) => (
    <textarea id={id} value={value} onChange={onChangeFn} rows={small ? 2 : 3} style={small ? styles.textareaSm : styles.textarea} />
  );

  const renderBooleanField = (id, value, onChangeFn) => (
    <CheckBox id={id} checked={value === true || value === 'true'} onChange={() => onChangeFn(value === true || value === 'true' ? false : true)} />
  );

  const renderMediaField = (id, value, onChangeFn) => {
    const isDragging = dragStates[id] || false;
    const isUploading = uploadStates[id] || false;
    const selectedOption = value ? mediaOptions.find((o) => o.value === value) || { value, label: value } : null;
    const selectedUrl = selectedOption ? (mediaOptions.find((o) => o.value === value)?.url || null) : null;
    const editName = renameStates[id] !== undefined ? renameStates[id] : (selectedOption?.label || '');
    const isSaving = savingStates[id] || false;

    const uploadFile = async (file) => {
      if (!file) return;
      setUploadStates((prev) => ({ ...prev, [id]: true }));
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch('/api/media', { method: 'POST', body: formData });
        const data = await res.json();
        const uploaded = data.doc || data.media;
        if (uploaded?.id || uploaded?._id) {
          const mediaId = uploaded.id || uploaded._id;
          const newOption = { value: mediaId, label: uploaded.originalFilename || file.name, url: uploaded.url };
          invalidateMedia();
          setMediaOptions((prev) => [newOption, ...prev]);
          onChangeFn(mediaId);
        }
      } catch (err) { /* upload failed silently */ }
      setUploadStates((prev) => ({ ...prev, [id]: false }));
    };

    const saveRename = async () => {
      if (!value || !editName.trim() || editName === selectedOption?.label) return;
      setSavingStates((prev) => ({ ...prev, [id]: true }));
      try {
        const res = await fetch(`/api/media/${value}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ originalFilename: editName.trim() }),
        });
        if (res.ok) {
          invalidateMedia();
          setMediaOptions((prev) => prev.map((o) => o.value === value ? { ...o, label: editName.trim() } : o));
        }
      } catch (err) { /* silently fail */ }
      setSavingStates((prev) => ({ ...prev, [id]: false }));
    };

    const setupDropRef = (el) => {
      if (!el || dropRefs.current[id] === el) return;
      dropRefs.current[id] = el;
      if (!dragCounters.current[id]) dragCounters.current[id] = 0;

      el.addEventListener('dragenter', (e) => { e.preventDefault(); e.stopPropagation(); dragCounters.current[id]++; setDragStates((prev) => ({ ...prev, [id]: true })); });
      el.addEventListener('dragover', (e) => { e.preventDefault(); e.stopPropagation(); });
      el.addEventListener('dragleave', (e) => { e.preventDefault(); e.stopPropagation(); dragCounters.current[id]--; if (dragCounters.current[id] === 0) setDragStates((prev) => ({ ...prev, [id]: false })); });
      el.addEventListener('drop', (e) => { e.preventDefault(); e.stopPropagation(); dragCounters.current[id] = 0; setDragStates((prev) => ({ ...prev, [id]: false })); const file = e.dataTransfer.files?.[0]; if (file) uploadFile(file); });
    };

    return (
      <Box style={styles.mediaBox}>
        <Select
          value={selectedOption}
          options={mediaOptions}
          onChange={(selected) => { onChangeFn(selected?.value || ''); setRenameStates((prev) => { const n = { ...prev }; delete n[id]; return n; }); }}
          isClearable
        />
        <div
          ref={setupDropRef}
          onClick={() => document.getElementById(`file-input-${id}`).click()}
          style={{
            marginTop: '8px',
            border: isDragging ? '2px dashed #3040D6' : '2px dashed #C0C0CA',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            background: isDragging ? '#EEF0FF' : '#FAFAFA',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <input
            id={`file-input-${id}`}
            type="file"
            accept="image/*,application/pdf,.doc,.docx"
            style={{ display: 'none' }}
            onChange={(e) => { uploadFile(e.target.files?.[0]); e.target.value = ''; }}
          />
          {isUploading ? (
            <span style={{ color: '#3040D6', fontSize: '13px' }}>Uploading...</span>
          ) : (
            <>
              <div style={{ fontSize: '24px', marginBottom: '2px', color: isDragging ? '#3040D6' : '#888' }}>{isDragging ? '\u2B07' : '\u2601'}</div>
              <span style={{ color: '#666', fontSize: '12px' }}>Drag & drop a file here, or <span style={{ color: '#3040D6', fontWeight: 500 }}>click to browse</span></span>
            </>
          )}
        </div>
        {value && (
          <div style={{ marginTop: '8px', padding: '8px', background: '#F7F7FA', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {selectedUrl && <img src={selectedUrl} alt="" style={{ maxHeight: '50px', borderRadius: '4px', border: '1px solid #e0e0e0' }} />}
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '10px', color: '#888', display: 'block', marginBottom: '3px' }}>File Name</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setRenameStates((prev) => ({ ...prev, [id]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === 'Enter') saveRename(); }}
                    style={{ flex: 1, padding: '4px 6px', border: '1px solid #C0C0CA', borderRadius: '4px', fontSize: '12px', outline: 'none' }}
                  />
                  {editName !== selectedOption?.label && (
                    <button onClick={saveRename} disabled={isSaving} style={{ padding: '4px 10px', background: '#3040D6', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1 }}>
                      {isSaving ? '...' : 'Rename'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>
    );
  };

  // ── Field renderer (per type) ──

  const renderField = (sectionIdx, fieldDef) => {
    const { name, type, ref } = fieldDef;
    const fullPath = `sections.${sectionIdx}.${name}`;
    const value = params[fullPath] || '';

    if (type === 'array' && ARRAY_FIELDS.includes(name)) {
      return renderArrayField(sectionIdx, name);
    }

    if (type === 'tagArray') {
      return renderTagArray(sectionIdx, name);
    }

    if (type === 'refArray') {
      return renderRefArrayField(sectionIdx, name, ref);
    }

    return (
      <Box key={fullPath} mb="lg" style={styles.fullWidth}>
        <Label htmlFor={fullPath} style={styles.label}>{formatLabel(name)}</Label>
        {type === 'textarea' ? (
          renderTextarea(fullPath, value, (e) => onChange(fullPath, e.target.value))
        ) : type === 'boolean' ? (
          renderBooleanField(fullPath, value, (val) => onChange(fullPath, val))
        ) : type === 'media' ? (
          renderMediaField(fullPath, value, (id) => onChange(fullPath, id))
        ) : (
          renderTextInput(fullPath, value, (e) => onChange(fullPath, e.target.value))
        )}
      </Box>
    );
  };

  // ── Tag array (simple string array like tags[]) ──

  const renderTagArray = (sectionIdx, fieldName) => {
    const prefix = `sections.${sectionIdx}.${fieldName}`;
    const tagIndices = getArrayIndices(sectionIdx, fieldName);
    const tagKey = `${sectionIdx}-${fieldName}`;
    const currentInput = tagInputs[tagKey] || '';

    const handleAddTag = () => {
      if (!currentInput.trim()) return;
      const newIdx = tagIndices.length > 0 ? Math.max(...tagIndices) + 1 : 0;
      onChange(`${prefix}.${newIdx}`, currentInput.trim());
      setTagInputs((prev) => ({ ...prev, [tagKey]: '' }));
    };

    const handleRemoveTag = (idx) => {
      onChange(`${prefix}.${idx}`, undefined);
    };

    return (
      <Box key={prefix} mb="lg" style={styles.fullWidth}>
        <Label style={styles.label}>{formatLabel(fieldName)}</Label>
        <Box flex flexDirection="row" flexWrap="wrap" mb="sm" style={{ gap: '8px' }}>
          {tagIndices.map((idx) => {
            const val = params[`${prefix}.${idx}`];
            if (!val) return null;
            return (
              <Box key={idx} style={{ background: '#e8e8e8', borderRadius: '4px', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Text fontSize="sm">{val}</Text>
                <span onClick={() => handleRemoveTag(idx)} style={{ cursor: 'pointer', color: '#c0392b', fontWeight: 'bold' }}>x</span>
              </Box>
            );
          })}
        </Box>
        <Box flex flexDirection="row" style={{ gap: '8px' }}>
          <Input
            value={currentInput}
            onChange={(e) => setTagInputs((prev) => ({ ...prev, [tagKey]: e.target.value }))}
            placeholder="Type a tag and click Add"
            style={{ flex: 1 }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
          />
          <Button type="button" size="sm" variant="primary" onClick={handleAddTag}>Add</Button>
        </Box>
      </Box>
    );
  };

  // ── Reference array (solutions[], services[], featuredResources[]) ──

  const renderRefArrayField = (sectionIdx, fieldName, refModel) => {
    const prefix = `sections.${sectionIdx}.${fieldName}`;
    const indices = getArrayIndices(sectionIdx, fieldName);

    const handleAddRef = () => {
      const newIdx = indices.length > 0 ? Math.max(...indices) + 1 : 0;
      onChange(`${prefix}.${newIdx}`, '');
    };

    const handleRemoveRef = (idx) => {
      onChange(`${prefix}.${idx}`, undefined);
    };

    return (
      <Box key={prefix} mb="lg" style={styles.fullWidth}>
        <Label style={styles.label}>{formatLabel(fieldName)} ({refModel} IDs)</Label>
        {indices.map((idx) => {
          const val = params[`${prefix}.${idx}`] || '';
          return (
            <Box key={idx} mb="sm" flex flexDirection="row" style={{ gap: '8px', alignItems: 'center' }}>
              <Input
                value={val}
                onChange={(e) => onChange(`${prefix}.${idx}`, e.target.value)}
                placeholder={`${refModel} ID`}
                style={{ flex: 1 }}
              />
              <Button type="button" size="sm" variant="danger" onClick={() => handleRemoveRef(idx)}>Remove</Button>
            </Box>
          );
        })}
        <Button type="button" size="sm" variant="outlined" mt="sm" onClick={handleAddRef}>
          + Add {refModel}
        </Button>
      </Box>
    );
  };

  // ── Array field (locations, socials, faqs, cards, leaders, timelineItems) ──

  const renderArrayField = (sectionIdx, fieldName) => {
    const prefix = `sections.${sectionIdx}.${fieldName}`;
    const savedIndices = getArrayIndices(sectionIdx, fieldName);
    const subFieldDefs = getSubFieldsForArray(fieldName);
    const subFieldNames = subFieldDefs.map((sf) => sf.name);
    const itemKey = `${sectionIdx}-${fieldName}`;
    const localItems = newItems[itemKey] || [];
    const singularName = fieldName.endsWith('s') ? fieldName.slice(0, -1) : fieldName;

    // Filter saved indices to only those with actual sub-field data
    const validSavedIndices = savedIndices.filter((idx) =>
      subFieldNames.some((sf) => params[`${prefix}.${idx}.${sf}`])
    );

    const handleAddItem = () => {
      const emptyItem = {};
      subFieldNames.forEach((sf) => { emptyItem[sf] = ''; });
      setNewItems((prev) => ({ ...prev, [itemKey]: [...(prev[itemKey] || []), emptyItem] }));
    };

    const handleLocalChange = (localIdx, subField, value) => {
      setNewItems((prev) => {
        const items = [...(prev[itemKey] || [])];
        items[localIdx] = { ...items[localIdx], [subField]: value };
        return { ...prev, [itemKey]: items };
      });
    };

    const handleSaveItem = (localIdx) => {
      const item = localItems[localIdx];
      const hasValues = subFieldNames.some((sf) => item[sf] && String(item[sf]).trim() !== '');
      if (!hasValues) return;
      const newIdx = validSavedIndices.length > 0 ? Math.max(...validSavedIndices) + 1 : savedIndices.length > 0 ? Math.max(...savedIndices) + 1 : 0;
      subFieldNames.forEach((sf) => {
        const val = item[sf];
        if (val !== undefined && val !== null && String(val).trim() !== '') {
          onChange(`${prefix}.${newIdx}.${sf}`, val);
        }
      });
      setNewItems((prev) => {
        const items = [...(prev[itemKey] || [])];
        items.splice(localIdx, 1);
        return { ...prev, [itemKey]: items };
      });
    };

    const handleCancelItem = (localIdx) => {
      setNewItems((prev) => {
        const items = [...(prev[itemKey] || [])];
        items.splice(localIdx, 1);
        return { ...prev, [itemKey]: items };
      });
    };

    const handleRemoveArrayItem = (arrIdx) => {
      Object.keys(params).forEach((key) => {
        if (key.startsWith(`${prefix}.${arrIdx}`)) onChange(key, undefined);
      });
    };

    return (
      <Box key={prefix} mb="xl" style={styles.arrayBox}>
        <Label style={{ fontWeight: 700, fontSize: '14px', textTransform: 'capitalize', marginBottom: '12px', display: 'block' }}>
          {formatLabel(fieldName)} ({validSavedIndices.length} items)
        </Label>

        {/* Saved items */}
        {validSavedIndices.map((arrIdx, displayIdx) => (
          <Box key={`${prefix}.${arrIdx}`} mb="md" style={styles.savedItem}>
            <Box flex flexDirection="row" justifyContent="space-between" alignItems="center" mb="md">
              <Text fontWeight="bold" fontSize="sm" color="grey60">{singularName} #{displayIdx + 1}</Text>
              <Button type="button" size="sm" variant="danger" onClick={() => handleRemoveArrayItem(arrIdx)}>Remove</Button>
            </Box>
            {subFieldDefs.map((sf) => {
              const fullKey = `${prefix}.${arrIdx}.${sf.name}`;
              const val = params[fullKey] || '';

              // Conditional visibility
              if (sf.showWhen) {
                const depVal = params[`${prefix}.${arrIdx}.${sf.showWhen.field}`];
                const isTruthy = depVal === true || depVal === 'true' || depVal === '1';
                if (sf.showWhen.value === true && !isTruthy) return null;
                if (sf.showWhen.value === false && isTruthy) return null;
              }
              if (sf.hideWhen) {
                const depVal = params[`${prefix}.${arrIdx}.${sf.hideWhen.field}`];
                const isTruthy = depVal === true || depVal === 'true' || depVal === '1';
                if (sf.hideWhen.value === true && isTruthy) return null;
                if (sf.hideWhen.value === false && !isTruthy) return null;
              }

              return (
                <Box key={fullKey} mb="md" style={styles.fullWidth}>
                  <Label htmlFor={fullKey} style={styles.labelSm}>{formatLabel(sf.name)}</Label>
                  {sf.type === 'textarea'
                    ? renderTextarea(fullKey, val, (e) => onChange(fullKey, e.target.value), true)
                    : sf.type === 'boolean'
                    ? renderBooleanField(fullKey, val, (v) => onChange(fullKey, v))
                    : sf.type === 'select'
                    ? <Select
                        value={val != null && val !== '' ? sf.options.find((o) => String(o.value) === String(val)) || null : null}
                        options={sf.options}
                        onChange={(selected) => onChange(fullKey, selected?.value || '')}
                      />
                    : sf.type === 'iconSelect'
                    ? <IconSelectField value={val} onChange={(v) => onChange(fullKey, v)} />
                    : sf.type === 'media'
                    ? renderMediaField(fullKey, val, (id) => onChange(fullKey, id))
                    : renderTextInput(fullKey, val, (e) => onChange(fullKey, e.target.value))
                  }
                </Box>
              );
            })}
          </Box>
        ))}

        {/* New unsaved items */}
        {localItems.map((item, localIdx) => (
          <Box key={`new-${localIdx}`} mb="md" style={styles.newItem}>
            <Box flex flexDirection="row" justifyContent="space-between" alignItems="center" mb="md">
              <Text fontWeight="bold" fontSize="sm" style={{ color: '#8a6d3b' }}>
                New {singularName} (fill in and click Confirm)
              </Text>
              <Box>
                <Button type="button" size="sm" variant="primary" onClick={() => handleSaveItem(localIdx)} style={{ marginRight: '8px' }}>Confirm</Button>
                <Button type="button" size="sm" variant="danger" onClick={() => handleCancelItem(localIdx)}>Cancel</Button>
              </Box>
            </Box>
            {subFieldDefs.map((sf) => {
              // Conditional visibility for new items
              if (sf.showWhen) {
                const depVal = item[sf.showWhen.field];
                const isTruthy = depVal === true || depVal === 'true' || depVal === '1';
                if (sf.showWhen.value === true && !isTruthy) return null;
                if (sf.showWhen.value === false && isTruthy) return null;
              }
              if (sf.hideWhen) {
                const depVal = item[sf.hideWhen.field];
                const isTruthy = depVal === true || depVal === 'true' || depVal === '1';
                if (sf.hideWhen.value === true && isTruthy) return null;
                if (sf.hideWhen.value === false && !isTruthy) return null;
              }
              return (
              <Box key={`new-${localIdx}-${sf.name}`} mb="md" style={styles.fullWidth}>
                <Label style={styles.labelSm}>{formatLabel(sf.name)}</Label>
                {sf.type === 'textarea'
                  ? renderTextarea(`new-${localIdx}-${sf.name}`, item[sf.name] || '', (e) => handleLocalChange(localIdx, sf.name, e.target.value), true)
                  : sf.type === 'boolean'
                  ? renderBooleanField(`new-${localIdx}-${sf.name}`, item[sf.name], (v) => handleLocalChange(localIdx, sf.name, v))
                  : sf.type === 'select'
                  ? <Select
                      value={item[sf.name] != null && item[sf.name] !== '' ? sf.options.find((o) => String(o.value) === String(item[sf.name])) || null : null}
                      options={sf.options}
                      onChange={(selected) => handleLocalChange(localIdx, sf.name, selected?.value || '')}
                    />
                  : sf.type === 'iconSelect'
                  ? <IconSelectField value={item[sf.name]} onChange={(v) => handleLocalChange(localIdx, sf.name, v)} />
                  : sf.type === 'media'
                  ? renderMediaField(`new-${localIdx}-${sf.name}`, item[sf.name] || '', (id) => handleLocalChange(localIdx, sf.name, id))
                  : <Input value={item[sf.name] || ''} onChange={(e) => handleLocalChange(localIdx, sf.name, e.target.value)} placeholder={`Enter ${sf.name}`} style={styles.fullWidth} />
                }
              </Box>
              );
            })}
          </Box>
        ))}

        <Button type="button" size="sm" variant="outlined" mt="md" onClick={handleAddItem}>+ Add {singularName}</Button>
      </Box>
    );
  };

  // ── Fallback for unmapped block types ──

  const renderFallbackFields = (sectionIdx) => {
    const prefix = `sections.${sectionIdx}.`;
    const subKeys = Object.keys(params).filter((k) => k.startsWith(prefix) && k !== `${prefix}blockType`);
    if (subKeys.length === 0) {
      return <Text color="grey60" mt="md" fontStyle="italic">No fields configured for this block type yet.</Text>;
    }
    return subKeys.map((key) => {
      const fieldName = key.replace(prefix, '');
      if (fieldName.match(/^\d+\./)) return null;
      return (
        <Box key={key} mb="md" style={styles.fullWidth}>
          <Label htmlFor={key} style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>{fieldName}</Label>
          <Input id={key} value={params[key] || ''} onChange={(e) => onChange(key, e.target.value)} style={styles.fullWidth} />
        </Box>
      );
    });
  };

  // ── Block fields renderer ──

  const renderBlockFields = (sectionIdx, blockType) => {
    const config = BLOCK_TYPE_FIELDS[blockType];
    if (!config) return renderFallbackFields(sectionIdx);

    if (config.infoMessage && config.fields.length === 0) {
      return (
        <Box style={styles.infoBox} mt="md">
          <Text fontSize="sm">{config.infoMessage}</Text>
        </Box>
      );
    }

    return (
      <>
        {config.fields.map((fieldDef) => renderField(sectionIdx, fieldDef))}
        {config.infoMessage && config.fields.length > 0 && (
          <Box style={styles.infoBox} mt="md">
            <Text fontSize="sm">{config.infoMessage}</Text>
          </Box>
        )}
      </>
    );
  };

  // ── Main render ──

  return (
    <Box style={styles.fullWidth}>
      <Label style={{ fontWeight: 700, fontSize: '18px', marginBottom: '20px', display: 'block' }}>
        Page Sections
      </Label>

      {sectionIndices.map((sectionIdx, displayIndex) => {
        const blockType = params[`sections.${sectionIdx}.blockType`] || '';
        const config = BLOCK_TYPE_FIELDS[blockType];
        const blockLabel = config ? config.label : BLOCK_TYPE_OPTIONS.find((o) => o.value === blockType)?.label || blockType;

        return (
          <Box
            key={sectionIdx}
            mb="xl"
            style={{
              ...styles.sectionBox,
              cursor: 'grab',
              opacity: dragIdx === sectionIdx ? 0.5 : 1,
              border: dragOverIdx === sectionIdx ? '2px dashed #5FBA51' : styles.sectionBox.border,
              transition: 'border 0.2s, opacity 0.2s',
            }}
            draggable
            onDragStart={() => setDragIdx(sectionIdx)}
            onDragOver={(e) => { e.preventDefault(); setDragOverIdx(sectionIdx); }}
            onDragLeave={() => setDragOverIdx(null)}
            onDrop={(e) => {
              e.preventDefault();
              if (dragIdx !== null && dragIdx !== sectionIdx) swapSections(dragIdx, sectionIdx);
              setDragIdx(null);
              setDragOverIdx(null);
            }}
            onDragEnd={() => { setDragIdx(null); setDragOverIdx(null); }}
          >
            <Box flex flexDirection="row" justifyContent="space-between" alignItems="center" mb={collapsedSections[sectionIdx] ? 'none' : 'lg'}>
              <Box flex flexDirection="row" alignItems="center" style={{ gap: '8px', cursor: 'pointer' }} onClick={() => toggleCollapse(sectionIdx)}>
                <span style={{ fontSize: '14px', userSelect: 'none' }}>{collapsedSections[sectionIdx] ? '▶' : '▼'}</span>
                <Text fontWeight="bold" fontSize="lg" color="primary100">Section {displayIndex + 1}: {blockLabel}</Text>
              </Box>
              <Button type="button" size="sm" variant="danger" onClick={() => {
                Object.keys(params).forEach((key) => { if (key.startsWith(`sections.${sectionIdx}.`)) onChange(key, undefined); });
              }}>Remove Section</Button>
            </Box>

            {!collapsedSections[sectionIdx] && (
              <>
                <Box mb="lg" style={styles.fullWidth}>
                  <Label style={styles.label}>Block Type</Label>
                  <Select
                    value={blockType ? { value: blockType, label: BLOCK_TYPE_OPTIONS.find((o) => o.value === blockType)?.label || blockType } : null}
                    options={BLOCK_TYPE_OPTIONS}
                    onChange={(selected) => onChange(`sections.${sectionIdx}.blockType`, selected?.value || '')}
                  />
                </Box>

                {blockType && renderBlockFields(sectionIdx, blockType)}
              </>
            )}
          </Box>
        );
      })}

      <Button type="button" variant="outlined" onClick={() => {
        const newIdx = sectionIndices.length > 0 ? Math.max(...sectionIndices) + 1 : 0;
        onChange(`sections.${newIdx}.blockType`, '');
      }} mt="lg">+ Add New Section</Button>
    </Box>
  );
};

export default SectionEdit;
