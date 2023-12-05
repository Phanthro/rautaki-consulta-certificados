"use client"
import React, { useEffect } from 'react'
import BiometricaFacialResultado from './biometria-facial'
// import html2pdf from 'html2pdf.js';
import withAuth from '@/utils/AuthCheck';

const page = () => {

    
    const handleGeneratePdf = async () => {
        if (typeof window !== 'undefined') {
            try {
              // Carregar html2pdf.js dinamicamente
              const { default: html2pdf } = await import('html2pdf.js');
              
              // Agora você pode usar html2pdf normalmente
              const element = document.getElementById('pdfContent');
    
              if (element) {
                const options = {
                  filename: 'nome-do-arquivo.pdf',
                };
    
                html2pdf(element, options);
              }
            } catch (error) {
              console.error('Erro ao carregar html2pdf.js:', error);
            }
          }
      };
    
  return (
    <div>
        <div id="pdfContent">
            <BiometricaFacialResultado />
        </div>
        <div className='absolute top-24 left-3/4 transform -translate-x-1/2 bg-cor-principal text-white font-bold p-2'>
            <button className='m-auto w-[100px]' onClick={handleGeneratePdf}>Gerar PDF</button>
        </div>
    </div>
  )
}

export default withAuth(page)