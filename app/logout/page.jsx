"use client"
import { useAmbiente } from '@/utils/AmbienteContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


const logout = () => {
    const {setIsLogado, setToken} = useAmbiente()
    const router = useRouter();
    useEffect(()=>{
        setIsLogado(false)
        router.push('/deslogar')
        return;
    })
    
    return(<></>)
  
}

export default logout