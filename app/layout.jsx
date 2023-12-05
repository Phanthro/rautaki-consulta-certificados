import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { AmbienteProvider } from '@/utils/AmbienteContext'
import NextTopLoader from 'nextjs-toploader'
import Navbar from './componentes/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rauteki - Serpro - Consultas',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <NextTopLoader height={5} color="#2299DD" />

        <AmbienteProvider >

          <div className='max-w-[1444px] m-auto bg-white items-center justify-center relative overflow-hidden pb-10'>

            <div className="w-full justify-center banner relative h-[90px]">

              <Navbar />

            </div>

            {children}

            {/* <Footer /> */}
            
          </div>

        </AmbienteProvider>
      </body>
    </html>
  )
}
