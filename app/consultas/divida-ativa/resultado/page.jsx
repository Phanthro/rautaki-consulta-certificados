"use client"
import React, { useEffect, useState } from 'react'
import withAuth from '@/utils/AuthCheck';
import { useRouter } from 'next/navigation';
import { useAmbiente } from '@/utils/AmbienteContext';
import InscricaoResultado from './inscricao';
import DevedorResultado from './devedor';

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
        {dados.consulta === 'inscricao' ? <InscricaoResultado /> : <DevedorResultado />}
      </div>
      <div className='absolute top-24 left-3/4 transform -translate-x-1/2 bg-cor-principal text-white font-bold p-2'>
        <button className='m-auto w-[100px]' onClick={handleGeneratePdf}>Gerar PDF</button>
      </div>
    </div>
  )
}

export default withAuth(page)