import React from 'react';
import { Box } from '@adminjs/design-system';

const ImagePreview = (props) => {
  const { record } = props;
  // Always read from url field, regardless of property name
  const url = record.params.url;
  const mimeType = record.params.mimeType;

  // Check if it's an image
  const isImage = mimeType && mimeType.startsWith('image/');

  if (!url) {
    return <Box>No file</Box>;
  }

  if (isImage) {
    return (
      <Box>
        <img
          src={url}
          alt={record.params.originalFilename || 'Preview'}
          style={{
            maxWidth: '80px',
            maxHeight: '80px',
            objectFit: 'cover',
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
          }}
        />
      </Box>
    );
  }

  // For non-image files, show file icon or link
  return (
    <Box>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#4285f4',
          textDecoration: 'none',
          fontSize: '12px',
        }}
      >
        📄 View File
      </a>
    </Box>
  );
};

export default ImagePreview;
