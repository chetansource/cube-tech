import React, { useState, useEffect } from 'react';
import { Box, Label, Select } from '@adminjs/design-system';
import { getMedia, invalidateMedia } from './mediaCache';

const MediaPicker = (props) => {
  const { property, record, onChange } = props;
  const value = record.params[property.path] || '';
  const [mediaOptions, setMediaOptions] = useState([]);

  useEffect(() => {
    getMedia().then((docs) => {
      setMediaOptions(docs.map((m) => ({
        value: m._id,
        label: m.originalFilename || m.filename,
        url: m.url,
      })));
    });
  }, []);

  const selectedOption = value
    ? mediaOptions.find((o) => o.value === value) || { value, label: value }
    : null;

  const selectedUrl = selectedOption
    ? (mediaOptions.find((o) => o.value === value)?.url || null)
    : null;

  return (
    <Box mb="lg">
      <Label htmlFor={property.path}>{property.label}</Label>
      <Select
        id={property.path}
        value={selectedOption}
        options={mediaOptions}
        onChange={(selected) => onChange(property.path, selected?.value || '')}
        isClearable
      />
      <Box mt="sm" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
        <label style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          background: '#3040D6',
          color: '#fff',
          borderRadius: '4px',
          fontSize: '12px',
          cursor: 'pointer',
        }}>
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
                  const newOption = {
                    value: mediaId,
                    label: uploaded.originalFilename || file.name,
                    url: uploaded.url,
                  };
                  invalidateMedia();
                  setMediaOptions((prev) => [newOption, ...prev]);
                  onChange(property.path, mediaId);
                }
              } catch (err) {
                /* upload failed silently */
              }
              e.target.value = '';
            }}
          />
        </label>
        {selectedUrl && (
          <img
            src={selectedUrl}
            alt=""
            style={{ maxHeight: '60px', borderRadius: '4px' }}
          />
        )}
      </Box>
    </Box>
  );
};

export default MediaPicker;
