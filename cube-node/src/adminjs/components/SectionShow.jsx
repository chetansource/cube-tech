import React, { useState, useEffect } from 'react';
import { Box, Label, Text } from '@adminjs/design-system';
import { getMedia } from './mediaCache';

// Same block type config as SectionEdit — only show relevant fields
const BLOCK_TYPE_FIELDS = {
  'contact-info': { label: 'Contact Info', fields: ['phone', 'email', 'locations', 'socials'] },
  'faqSection': { label: 'FAQ Section', fields: ['faqs'] },
  'resourcesFaqSection': { label: 'Resources FAQ Section', fields: ['faqs'] },
  'heroSection': { label: 'Hero Section', fields: ['heading', 'description', 'ctaText', 'ctaLink', 'backgroundImage'] },
  'servicesSolutionsSection': { label: 'Services Solutions Section', fields: ['heading', 'highlightedWord', 'description', 'ctaText', 'ctaLink', 'backgroundImage'], info: 'Solutions are managed from Site Elements → Solution (Show On Service Page checkbox).' },
  'servicesSection': { label: 'Services Section', fields: ['title', 'description', 'image'] },
  'exploreMoreSection': { label: 'Explore More Section', fields: ['exploreMoreTitle', 'exploreMoreDescription', 'exploreMoreBackgroundImage'] },
  'aboutHeroSection': { label: 'About Hero Section', fields: ['heading', 'subheading', 'backgroundImage'] },
  'leadershipSection': { label: 'Leadership Section', fields: ['title', 'description', 'leaders'] },
  'teamSection': { label: 'Team Section', fields: ['title', 'description', 'members'] },
  'timelineSection': { label: 'Timeline Section', fields: ['heading', 'timelineItems'] },
  'corporateResponsibilitySection': { label: 'Corporate Responsibility', fields: ['mainHeading', 'subheading', 'title', 'description', 'tags', 'backgroundImage'] },
  'statsSection': { label: 'Stats Section', fields: [], info: 'Data from Stats collection.' },
  'testimonialsSection': { label: 'Testimonials Section', fields: [], info: 'Data from Testimonials collection.' },
  'servicesHeroSection': { label: 'Services Hero Section', fields: ['heading', 'highlightedWord', 'backgroundImage'] },
  'servicesOfferedSection': { label: 'Services Offered Section', fields: ['heading', 'highlightedWord', 'description', 'bannerImage'] },
  'projectMapSection': { label: 'Project Map Section', fields: ['title', 'highlightedWord', 'description', 'ctaText', 'ctaLink'] },
  'contactBannerSection': { label: 'Contact Banner Section', fields: ['heading', 'ctaText', 'ctaLink', 'backgroundImage'] },
  'projectsHeroSection': { label: 'Projects Hero Section', fields: ['heading', 'highlightedWord', 'backgroundImage'] },
  'resourcesHeroSection': { label: 'Resources Hero Section', fields: ['heroTitle', 'heroTitleItalic', 'heroBackgroundImage'] },
  'insightsImpactSection': { label: 'Insights & Impact Section', fields: ['insightsHeading', 'insightsSubheading', 'impactHighlightWord', 'insightsDescription', 'insightsBackgroundImage', 'businessHeading', 'businessHeadingItalic', 'planetHeading', 'planetHeadingItalic', 'businessDescription', 'exploreServicesButtonText'] },
  'resourceGallerySection': { label: 'Resource Gallery Section', fields: ['galleryBackgroundImage'] },
  'newsEventsSection': { label: 'News & Events Section', fields: ['newsEventsTitle', 'newsEventsDescription', 'newsEventsBackgroundImage', 'showNewsletter'] },
  'careerTitle': { label: 'Career Title', fields: ['headingLine1', 'headingLine2', 'description'] },
  'exploreCardsSection': { label: 'Explore Cards Section', fields: ['cards'] },
  'jobListSection': { label: 'Job List Section', fields: [], info: 'Data from Jobs collection.' },
  'aboutSection': { label: 'About Section', fields: ['title', 'description', 'content', 'image'] },
  'ctaSection': { label: 'CTA Section', fields: ['heading', 'description', 'ctaText', 'ctaLink', 'backgroundImage'] },
  'partnersSection': { label: 'Partners Section', fields: [], info: 'Data from Partners collection.' },
  'projectsSection': { label: 'Projects Section', fields: [], info: 'Data from Projects collection.' },
  'awardsSection': { label: 'Awards Section', fields: [], info: 'Data from Awards collection.' },
  'solutionsSection': { label: 'Solutions Section', fields: [], info: 'Data from Solutions collection.' },
};

const ARRAY_FIELDS = ['locations', 'socials', 'faqs', 'cards', 'leaders', 'members', 'timelineItems'];

const MEDIA_FIELDS = new Set([
  'backgroundImage', 'image', 'bannerImage', 'exploreMoreBackgroundImage',
  'heroBackgroundImage', 'insightsBackgroundImage', 'galleryBackgroundImage',
  'newsEventsBackgroundImage',
]);

const getSubFieldNames = (fieldName) => {
  switch (fieldName) {
    case 'locations': return ['label', 'address'];
    case 'socials': return ['platform', 'url'];
    case 'faqs': return ['question', 'answer'];
    case 'cards': return ['title', 'content', 'date', 'cardType', 'bgColor', 'textColor', 'order'];
    case 'leaders': return ['name', 'designation', 'linkedIn'];
    case 'members': return ['name', 'designation', 'linkedIn'];
    case 'timelineItems': return ['year', 'side', 'title', 'content', 'isIconOnly', 'iconType'];
    default: return [];
  }
};

const formatLabel = (name) => name.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).trim();

const SectionShow = (props) => {
  const { record } = props;
  const params = record.params || {};
  const [mediaMap, setMediaMap] = useState({});

  useEffect(() => {
    getMedia().then((docs) => {
      const map = {};
      docs.forEach((m) => {
        map[m._id] = { url: m.url, filename: m.originalFilename || m.filename, mimeType: m.mimeType };
      });
      setMediaMap(map);
    });
  }, []);

  const renderMediaPreview = (label, mediaId) => {
    if (!mediaId) return null;
    const media = mediaMap[mediaId];
    if (!media) {
      return renderValue(label, mediaId);
    }
    const isImage = media.mimeType && media.mimeType.startsWith('image/');
    return (
      <Box mb="md">
        <Text fontWeight="bold" mr="md" style={{ minWidth: '160px', color: '#666', marginBottom: '4px' }}>{label}:</Text>
        {isImage ? (
          <Box>
            <img
              src={media.url}
              alt={media.filename}
              style={{ maxWidth: '200px', maxHeight: '140px', objectFit: 'contain', borderRadius: '6px', border: '1px solid #e0e0e0', marginBottom: '4px' }}
            />
            <Text fontSize="sm" color="grey60">{media.filename}</Text>
          </Box>
        ) : (
          <a href={media.url} target="_blank" rel="noopener noreferrer" style={{ color: '#3040D6', textDecoration: 'none' }}>
            {media.filename}
          </a>
        )}
      </Box>
    );
  };

  const sectionIndices = [];
  Object.keys(params).forEach((key) => {
    const match = key.match(/^sections\.(\d+)\./);
    if (match) {
      const idx = parseInt(match[1], 10);
      if (!sectionIndices.includes(idx)) sectionIndices.push(idx);
    }
  });
  sectionIndices.sort((a, b) => a - b);

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

  const renderValue = (label, value) => {
    if (!value && value !== false) return null;
    const displayVal = value === true ? 'Yes' : value === false ? 'No' : String(value);
    return (
      <Box mb="md" flex flexDirection="row">
        <Text fontWeight="bold" mr="md" style={{ minWidth: '160px', color: '#666' }}>{label}:</Text>
        <Text>{displayVal}</Text>
      </Box>
    );
  };

  const renderArrayItems = (sectionIdx, fieldName) => {
    const prefix = `sections.${sectionIdx}.${fieldName}`;
    const indices = getArrayIndices(sectionIdx, fieldName);
    const subFields = getSubFieldNames(fieldName);
    const singularName = fieldName.endsWith('s') ? fieldName.slice(0, -1) : fieldName;

    const validIndices = indices.filter((idx) =>
      subFields.some((sf) => params[`${prefix}.${idx}.${sf}`])
    );

    if (validIndices.length === 0) return null;

    return (
      <Box mb="lg">
        <Text fontWeight="bold" mb="sm" style={{ textTransform: 'capitalize', color: '#444' }}>
          {formatLabel(fieldName)} ({validIndices.length})
        </Text>
        {validIndices.map((arrIdx, displayIdx) => (
          <Box key={arrIdx} ml="lg" mb="sm" style={{ borderLeft: '3px solid #3040D6', paddingLeft: '12px' }}>
            <Text fontSize="xs" color="grey60" mb="xs" fontWeight="bold">{singularName} #{displayIdx + 1}</Text>
            {subFields.map((sf) => {
              const val = params[`${prefix}.${arrIdx}.${sf}`];
              if (!val && val !== false) return null;
              return (
                <Text key={sf} fontSize="sm" mb="xs">
                  <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{formatLabel(sf)}:</span>{' '}
                  {val === true ? 'Yes' : val === false ? 'No' : val}
                </Text>
              );
            })}
          </Box>
        ))}
      </Box>
    );
  };

  const renderTagArray = (sectionIdx, fieldName) => {
    const prefix = `sections.${sectionIdx}.${fieldName}`;
    const indices = getArrayIndices(sectionIdx, fieldName);
    const tags = indices.map((idx) => params[`${prefix}.${idx}`]).filter(Boolean);
    if (tags.length === 0) return null;
    return (
      <Box mb="md">
        <Text fontWeight="bold" style={{ color: '#666' }}>{formatLabel(fieldName)}:</Text>
        <Box flex flexDirection="row" flexWrap="wrap" mt="xs" style={{ gap: '6px' }}>
          {tags.map((tag, i) => (
            <Box key={i} style={{ background: '#e8e8e8', borderRadius: '4px', padding: '2px 8px' }}>
              <Text fontSize="sm">{tag}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const renderRefArray = (sectionIdx, fieldName) => {
    const prefix = `sections.${sectionIdx}.${fieldName}`;
    const indices = getArrayIndices(sectionIdx, fieldName);
    const ids = indices.map((idx) => params[`${prefix}.${idx}`]).filter(Boolean);
    if (ids.length === 0) return null;
    return renderValue(formatLabel(fieldName), ids.join(', '));
  };

  const renderSectionFields = (sectionIdx, blockType) => {
    const config = BLOCK_TYPE_FIELDS[blockType];

    if (!config) {
      // Fallback: show all non-empty fields
      const prefix = `sections.${sectionIdx}.`;
      return Object.keys(params)
        .filter((k) => k.startsWith(prefix) && k !== `${prefix}blockType` && params[k])
        .map((key) => renderValue(key.replace(prefix, ''), params[key]));
    }

    if (config.info && config.fields.length === 0) {
      return (
        <Box style={{ background: '#e8f4fd', border: '1px solid #b3d7f2', borderRadius: '6px', padding: '12px' }}>
          <Text fontSize="sm">{config.info}</Text>
        </Box>
      );
    }

    const fieldElements = config.fields.map((fieldName) => {
      if (ARRAY_FIELDS.includes(fieldName)) {
        return <React.Fragment key={fieldName}>{renderArrayItems(sectionIdx, fieldName)}</React.Fragment>;
      }
      if (fieldName === 'tags') {
        return <React.Fragment key={fieldName}>{renderTagArray(sectionIdx, fieldName)}</React.Fragment>;
      }
      if (['solutions', 'services', 'featuredResources'].includes(fieldName)) {
        return <React.Fragment key={fieldName}>{renderRefArray(sectionIdx, fieldName)}</React.Fragment>;
      }
      const val = params[`sections.${sectionIdx}.${fieldName}`];
      if (MEDIA_FIELDS.has(fieldName)) {
        return <React.Fragment key={fieldName}>{renderMediaPreview(formatLabel(fieldName), val)}</React.Fragment>;
      }
      return <React.Fragment key={fieldName}>{renderValue(formatLabel(fieldName), val)}</React.Fragment>;
    });

    return (
      <>
        {fieldElements}
        {config.info && config.fields.length > 0 && (
          <Box style={{ background: '#e8f4fd', border: '1px solid #b3d7f2', borderRadius: '6px', padding: '12px', marginTop: '12px' }}>
            <Text fontSize="sm">{config.info}</Text>
          </Box>
        )}
      </>
    );
  };

  return (
    <Box style={{ width: '100%' }}>
      <Label style={{ fontWeight: 700, fontSize: '18px', marginBottom: '20px', display: 'block' }}>
        Page Sections
      </Label>

      {sectionIndices.map((sectionIdx) => {
        const blockType = params[`sections.${sectionIdx}.blockType`] || '';
        const config = BLOCK_TYPE_FIELDS[blockType];
        const blockLabel = config ? config.label : blockType;

        return (
          <Box key={sectionIdx} mb="lg" style={{ border: '1px solid #dde', borderRadius: '8px', padding: '16px', background: '#fafbff' }}>
            <Text fontWeight="bold" fontSize="lg" color="primary100" mb="md">
              Section {sectionIdx + 1}: {blockLabel}
            </Text>
            {renderSectionFields(sectionIdx, blockType)}
          </Box>
        );
      })}
    </Box>
  );
};

export default SectionShow;
