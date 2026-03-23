import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Label, Select } from '@adminjs/design-system';
import { getMedia, invalidateMedia } from './mediaCache';

const MediaPicker = (props) => {
  const { property, record, onChange } = props;
  const value = record.params[property.path] || '';
  const [mediaOptions, setMediaOptions] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editName, setEditName] = useState('');
  const [saving, setSaving] = useState(false);
  const dropRef = useRef(null);
  const dragCounter = useRef(0);

  useEffect(() => {
    getMedia().then((docs) => {
      setMediaOptions(docs.map((m) => ({
        value: m._id,
        label: m.originalFilename || m.filename,
        url: m.url,
      })));
    });
  }, []);

  // Prevent browser default file open on drag/drop anywhere on the page
  useEffect(() => {
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener('dragover', preventDefaults);
    window.addEventListener('drop', preventDefaults);
    return () => {
      window.removeEventListener('dragover', preventDefaults);
      window.removeEventListener('drop', preventDefaults);
    };
  }, []);

  const selectedOption = value
    ? mediaOptions.find((o) => o.value === value) || { value, label: value }
    : null;

  const selectedUrl = selectedOption
    ? (mediaOptions.find((o) => o.value === value)?.url || null)
    : null;

  // Sync editName when selection changes
  useEffect(() => {
    setEditName(selectedOption?.label || '');
  }, [value, selectedOption?.label]);

  const saveRename = useCallback(async () => {
    if (!value || !editName.trim() || editName === selectedOption?.label) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/media/${value}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalFilename: editName.trim() }),
      });
      if (res.ok) {
        invalidateMedia();
        setMediaOptions((prev) =>
          prev.map((o) => o.value === value ? { ...o, label: editName.trim() } : o)
        );
      }
    } catch (err) { /* silently fail */ }
    finally { setSaving(false); }
  }, [value, editName, selectedOption?.label]);

  const uploadFile = useCallback(async (file) => {
    if (!file) return;
    setUploading(true);
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
    } finally {
      setUploading(false);
    }
  }, [onChange, property.path]);

  // Use native event listeners on the drop zone for reliability
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;

    const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current++;
      setIsDragging(true);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current--;
      if (dragCounter.current === 0) setIsDragging(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current = 0;
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) uploadFile(file);
    };

    el.addEventListener('dragenter', handleDragEnter);
    el.addEventListener('dragover', handleDragOver);
    el.addEventListener('dragleave', handleDragLeave);
    el.addEventListener('drop', handleDrop);

    return () => {
      el.removeEventListener('dragenter', handleDragEnter);
      el.removeEventListener('dragover', handleDragOver);
      el.removeEventListener('dragleave', handleDragLeave);
      el.removeEventListener('drop', handleDrop);
    };
  }, [uploadFile]);

  return (
    <Box mb="lg">
      <Label htmlFor={property.path}>{property.label}</Label>
      <Select
        id={property.path}
        value={selectedOption}
        options={mediaOptions}
        onChange={(selected) => onChange(property.path, selected?.value || null)}
        isClearable
      />

      {/* Drag & Drop Zone */}
      <div
        ref={dropRef}
        onClick={() => document.getElementById(`file-input-${property.path}`).click()}
        style={{
          marginTop: '8px',
          border: isDragging ? '2px dashed #3040D6' : '2px dashed #C0C0CA',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          background: isDragging ? '#EEF0FF' : '#FAFAFA',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <input
          id={`file-input-${property.path}`}
          type="file"
          accept="image/*,application/pdf,.doc,.docx"
          style={{ display: 'none' }}
          onChange={(e) => {
            uploadFile(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
        {uploading ? (
          <span style={{ color: '#3040D6', fontSize: '14px' }}>Uploading...</span>
        ) : (
          <>
            <div style={{ fontSize: '28px', marginBottom: '4px', color: isDragging ? '#3040D6' : '#888' }}>
              {isDragging ? '\u2B07' : '\u2601'}
            </div>
            <span style={{ color: '#666', fontSize: '13px' }}>
              Drag & drop a file here, or <span style={{ color: '#3040D6', fontWeight: 500 }}>click to browse</span>
            </span>
          </>
        )}
      </div>

      {/* Preview & Rename */}
      {value && (
        <div style={{ marginTop: '8px', padding: '10px', background: '#F7F7FA', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {selectedUrl && (
              <img
                src={selectedUrl}
                alt=""
                style={{ maxHeight: '70px', borderRadius: '6px', border: '1px solid #e0e0e0' }}
              />
            )}
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '4px' }}>File Name</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') saveRename(); }}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    border: '1px solid #C0C0CA',
                    borderRadius: '4px',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                {editName !== selectedOption?.label && (
                  <button
                    onClick={saveRename}
                    disabled={saving}
                    style={{
                      padding: '6px 12px',
                      background: '#3040D6',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: saving ? 'not-allowed' : 'pointer',
                      opacity: saving ? 0.7 : 1,
                    }}
                  >
                    {saving ? 'Saving...' : 'Rename'}
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

export default MediaPicker;
