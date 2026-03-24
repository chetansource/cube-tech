import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExportCsvButton = (props) => {
  const { resource } = props;
  const navigate = useNavigate();
  const resourceId = resource?.id || '';

  useEffect(() => {
    let url = null;
    if (resourceId === 'Contacts') url = '/admin/export/contacts';
    if (resourceId === 'JobApplicants') url = '/admin/export/job-applicants';
    if (resourceId === 'Newsletter') url = '/admin/export/newsletter';

    if (url) {
      // Trigger CSV download via hidden iframe to avoid navigating away
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      document.body.appendChild(iframe);

      // Navigate back to list after a short delay
      setTimeout(() => {
        document.body.removeChild(iframe);
        navigate(`/admin/resources/${resourceId}`);
      }, 1000);
    }
  }, [resourceId, navigate]);

  return null;
};

export default ExportCsvButton;
