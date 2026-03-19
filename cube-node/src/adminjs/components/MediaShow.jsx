import React, { useState, useEffect } from 'react';
import { Box, Label, Text } from '@adminjs/design-system';
import { getMedia } from './mediaCache';

const MediaShow = (props) => {
  const { property, record } = props;
  const mediaId = record.params[property.path];
  const [mediaData, setMediaData] = useState(null);

  // Try to get data from AdminJS populated references
  const populated = record.populated && record.populated[property.path];
  const populatedUrl = populated?.params?.url;
  const populatedFilename = populated?.params?.originalFilename || populated?.params?.filename || populated?.title;
  const populatedMimeType = populated?.params?.mimeType;

  useEffect(() => {
    if (!mediaId || populatedUrl) return;

    getMedia().then((docs) => {
      const found = docs.find((m) => m._id === mediaId);
      if (found) {
        setMediaData(found);
      }
    });
  }, [mediaId, populatedUrl]);

  if (!mediaId) {
    return (
      <Box mb="lg">
        <Label>{property.label}</Label>
        <Text>—</Text>
      </Box>
    );
  }

  const url = populatedUrl || mediaData?.url;
  const filename = populatedFilename || mediaData?.originalFilename || mediaData?.filename || mediaId;
  const mimeType = populatedMimeType || mediaData?.mimeType || '';
  const isImage = mimeType.startsWith('image/');

  return (
    <Box mb="lg">
      <Label>{property.label}</Label>
      {url ? (
        <Box>
          {isImage ? (
            <Box>
              <img
                src={url}
                alt={filename}
                style={{
                  maxWidth: '240px',
                  maxHeight: '160px',
                  objectFit: 'contain',
                  borderRadius: '6px',
                  border: '1px solid #e0e0e0',
                  marginBottom: '6px',
                }}
              />
              <Text fontSize="sm" color="grey60">{filename}</Text>
            </Box>
          ) : (
            <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#3040D6', textDecoration: 'none' }}>
              {filename}
            </a>
          )}
        </Box>
      ) : (
        <Text>{filename}</Text>
      )}
    </Box>
  );
};

export default MediaShow;
