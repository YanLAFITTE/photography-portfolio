import './globals.css';
import type { Metadata } from 'next';
import { Actor } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import Image from 'next/image';
import background from '../public/photography-bg.jpg';
import MenuManager from './components/menu/MenuManager';

const actor = Actor({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
   title: 'Photography-App',
   description: 'A photographer portfolio application',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang='en'>
         <body className={`h-screen flex flex-col justify-between text-white fade-in ${actor.className}`}>
            <MenuManager>
            <Image
                  src={background}
                  alt='background-image'
                  className='fixed top-0 left-0 h-screen object-cover -z-[5] '
                  placeholder='blur'
               />
               <div className='fixed left-0 top-0 w-full h-full bg-gradient-to-t from-black via-black/40 to-black -z-[5]'></div>
               <Header />
               <main className='mt-[150px] sm:px-14 px-5 '>{children}</main>
               <Footer />
            </MenuManager>
         </body>
      </html>
   );
}
