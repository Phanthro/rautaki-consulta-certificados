import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { AmbienteProvider } from '@/utils/AmbienteContext'
import NextTopLoader from 'nextjs-toploader'
import Navbar from './componentes/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fire - Certificação Digital',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>

        <NextTopLoader height={5} color="#2299DD" />

        <AmbienteProvider >

          <div className='max-w-[1024px] m-auto bg-cor-principal items-center justify-center relative overflow-hidden pb-10 mt-2'>
            <div >
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
