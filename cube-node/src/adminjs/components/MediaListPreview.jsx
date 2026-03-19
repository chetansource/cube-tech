import React, { useState, useEffect } from 'react';
import { Box } from '@adminjs/design-system';
import { getMedia } from './mediaCache';

const MediaListPreview = (props) => {
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
    return <Box>—</Box>;
  }

  const url = populatedUrl || mediaData?.url;
  const filename = populatedFilename || mediaData?.originalFilename || mediaData?.filename || '';
  const mimeType = populatedMimeType || mediaData?.mimeType || '';
  const isImage = mimeType.startsWith('image/');

  if (url && isImage) {
    return (
      <Box>
        <img
          src={url}
          alt={filename}
          style={{
            maxWidth: '60px',
            maxHeight: '60px',
            objectFit: 'cover',
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
          }}
        />
      </Box>
    );
  }

  return <Box style={{ fontSize: '12px', color: '#666' }}>{filename || mediaId}</Box>;
};

export default MediaListPreview;
