"use client"

import React, { createContext, useContext, useState } from 'react';

const AmbienteContext = createContext();

export const AmbienteProvider = ({ children, acessos, logado, origin }) => {
  const [ambiente, setAmbiente] = useState('teste');
  const [permissoes, setPermissoes] = useState(acessos);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogado, setIsLogado] = useState(logado);
  const [token, setToken] = useState('');
  const [_user, setUser] = useState('');

  const [dados, setDados] = useState('{}')
 
  const domain = origin;


  const toggleAmbiente = () => {
    setAmbiente(ambiente === 'teste' ? 'producao' : 'teste');
  };

  return (
    <AmbienteContext.Provider value={
      { ambiente, toggleAmbiente,
        permissoes, setPermissoes,
        domain,
        isLoading, setIsLoading,
        isLogado, setIsLogado,
        token, setToken,
        _user, setUser,
        dados, setDados
      }}>
      {children}
    </AmbienteContext.Provider>
  );
};

export const useAmbiente = () => {
  const context = useContext(AmbienteContext);
  if (!context) {
    throw new Error('useAmbiente deve ser usado dentro de um AmbienteProvider');
  }
  return context;
};
