"use client"
import React, { useEffect } from 'react'
import BiometricaFacialResultado from './biometria-facial'
import html2pdf from 'html2pdf.js';
import withAuth from '@/utils/AuthCheck';

const page = () => {

    
    const handleGeneratePdf = () => {
        const element = document.getElementById('pdfContent');
    
        if (element) {
            const options = {
                filename: 'biometria-facial.pdf', // Defina o nome do arquivo desejado aqui
              };
          html2pdf(element, options);
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