"use client"
import React, { useEffect, useState } from 'react'
import withAuth from '@/utils/AuthCheck';
import { useAmbiente } from '@/utils/AmbienteContext';
import InscricaoResultado from './resultado';

const page = (props) => {
  const [consultaFeita, setConsultafeita] = useState('')
  const { dados } = useAmbiente();

  const handleGeneratePdf = async () => {
    if (typeof window !== 'undefined') {
      try {
        const { default: html2pdf } = await import('html2pdf.js');
        const element = document.getElementById('pdfContent');

        if (element) {
          const options = {
            filename: 'nome-do-arquivo.pdf',
            html2canvas: { scale: 2 },
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
       {/* Voltar */}
       <div className='relative left-16 top-2 rounded-full py-1 px-2 bg-cinza2 text-white w-fit '>
        <a className='' href='/'>&lt; voltar</a>
      </div>

      <div id="pdfContent">
        <InscricaoResultado />
      </div>
     
    </div>
  )
}

export default withAuth(page)