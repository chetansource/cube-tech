import React, { useState, useEffect } from 'react';
import { Box, Label, Input, Button, Text, Select, CheckBox } from '@adminjs/design-system';

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
      { name: 'solutions', type: 'refArray', ref: 'Solution' },
    ],
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
      { name: 'featuredResources', type: 'refArray', ref: 'Resource' },
    ],
  },
  'servicesOfferedSection': {
    label: 'Services Offered Section',
    fields: [
      { name: 'heading', type: 'text' },
      { name: 'highlightedWord', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'bannerImage', type: 'media' },
      { name: 'services', type: 'refArray', ref: 'Service' },
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
      { name: 'image', type: 'text' },
      { name: 'order', type: 'text' },
    ];
    case 'leaders': return [
      { name: 'name', type: 'text' },
      { name: 'designation', type: 'text' },
      { name: 'image', type: 'text' },
      { name: 'bio', type: 'textarea' },
      { name: 'linkedIn', type: 'text' },
    ];
    case 'timelineItems': return [
      { name: 'year', type: 'text' },
      { name: 'side', type: 'select', options: [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ]},
      { name: 'title', type: 'text' },
      { name: 'content', type: 'textarea' },
      { name: 'isPodcast', type: 'boolean' },
      { name: 'podcastContent', type: 'textarea' },
      { name: 'podcastLink', type: 'text' },
      { name: 'isIconOnly', type: 'boolean' },
      { name: 'iconType', type: 'text' },
    ];
    default: return [];
  }
};

const ARRAY_FIELDS = ['locations', 'socials', 'faqs', 'cards', 'leaders', 'timelineItems'];

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

  useEffect(() => {
    fetch('/api/media?limit=200')
      .then((res) => res.json())
      .then((data) => {
        if (data.docs) {
          setMediaOptions(data.docs.map((m) => ({
            value: m._id,
            label: m.originalFilename || m.filename,
            url: m.url,
          })));
        }
      })
      .catch(() => {});
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
          <Box style={styles.mediaBox}>
            <Select
              value={value ? mediaOptions.find((o) => o.value === value) || { value, label: value } : null}
              options={mediaOptions}
              onChange={(selected) => onChange(fullPath, selected?.value || '')}
            />
            <Box mt="sm" flex flexDirection="row" alignItems="center" style={{ gap: '8px' }}>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#3040D6', color: '#fff', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
                Upload New
                <input
                  type="file"
                  accept="image/*,application/pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append('file', file);
                    try {
                      const res = await fetch('/api/media', { method: 'POST', body: formData });
                      const data = await res.json();
                      const uploaded = data.doc || data.media;
                      if (uploaded?.id || uploaded?._id) {
                        const mediaId = uploaded.id || uploaded._id;
                        const newOption = { value: mediaId, label: uploaded.originalFilename || file.name, url: uploaded.url };
                        setMediaOptions((prev) => [newOption, ...prev]);
                        onChange(fullPath, mediaId);
                      }
                    } catch (err) { /* upload failed silently */ }
                    e.target.value = '';
                  }}
                />
              </label>
              {value && (() => {
                const selected = mediaOptions.find((o) => o.value === value);
                return selected?.url ? (
                  <img src={selected.url} alt="" style={{ maxHeight: '60px', borderRadius: '4px' }} />
                ) : null;
              })()}
            </Box>
          </Box>
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
              return (
                <Box key={fullKey} mb="md" style={styles.fullWidth}>
                  <Label htmlFor={fullKey} style={styles.labelSm}>{formatLabel(sf.name)}</Label>
                  {sf.type === 'textarea'
                    ? renderTextarea(fullKey, val, (e) => onChange(fullKey, e.target.value), true)
                    : sf.type === 'boolean'
                    ? renderBooleanField(fullKey, val, (v) => onChange(fullKey, v))
                    : sf.type === 'select'
                    ? <Select
                        value={val ? sf.options.find((o) => o.value === val) || null : null}
                        options={sf.options}
                        onChange={(selected) => onChange(fullKey, selected?.value || '')}
                      />
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
            {subFieldDefs.map((sf) => (
              <Box key={`new-${localIdx}-${sf.name}`} mb="md" style={styles.fullWidth}>
                <Label style={styles.labelSm}>{formatLabel(sf.name)}</Label>
                {sf.type === 'textarea'
                  ? renderTextarea(`new-${localIdx}-${sf.name}`, item[sf.name] || '', (e) => handleLocalChange(localIdx, sf.name, e.target.value), true)
                  : sf.type === 'boolean'
                  ? renderBooleanField(`new-${localIdx}-${sf.name}`, item[sf.name], (v) => handleLocalChange(localIdx, sf.name, v))
                  : sf.type === 'select'
                  ? <Select
                      value={item[sf.name] ? sf.options.find((o) => o.value === item[sf.name]) || null : null}
                      options={sf.options}
                      onChange={(selected) => handleLocalChange(localIdx, sf.name, selected?.value || '')}
                    />
                  : <Input value={item[sf.name] || ''} onChange={(e) => handleLocalChange(localIdx, sf.name, e.target.value)} placeholder={`Enter ${sf.name}`} style={styles.fullWidth} />
                }
              </Box>
            ))}
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

    return config.fields.map((fieldDef) => renderField(sectionIdx, fieldDef));
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
