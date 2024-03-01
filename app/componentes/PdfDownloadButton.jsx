import React from 'react';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PdfDownloadButton = ({ pdfData }) => {
  const handleDownload = () => {
    const arrayBuffer = Uint8Array.from(atob(pdfData), c => c.charCodeAt(0)).buffer;
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'arquivo.pdf';

    // Simular um clique no link para iniciar o download
    link.click();

    // Remover o link após o download
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <button onClick={handleDownload}>
      <FontAwesomeIcon icon={faDownload} /> Baixar Certidão(PDF)
    </button>
  );
};

export default PdfDownloadButton;