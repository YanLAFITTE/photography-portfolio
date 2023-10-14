'use client';
import Image from 'next/image';
import {
   LuFacebook,
   LuDribbble,
   LuInstagram,
   LuYoutube,
   LuTwitch,
} from 'react-icons/lu';
import { MenuContext } from './MenuManager';
import { useContext } from 'react';
import Link from 'next/link';

const MenuContent = () => {
   const menuContext = useContext(MenuContext);
   if (!menuContext) {
      return null;
   }
   const { open, setOpen } = menuContext;

   const internalLinks = [
      {
         url: '/',
         component: <span>Home</span>,
      },
      {
         url: '/portfolio',
         component: <span>Portfolio</span>,
      },
      {
         url: '/about',
         component: <span>About</span>,
      },
   ];

   const externalLinks = [
      {
         url: 'https://www.facebook.com',
         component: <LuFacebook />,
      },
      {
         url: 'https://www.instagram.com',
         component: <LuInstagram />,
      },
      {
         url: 'https://www.youtube.com',
         component: <LuYoutube />,
      },
      {
         url: 'https://www.dribbble.com',
         component: <LuDribbble />,
      },
      {
         url: 'https://www.twitch.com',
         component: <LuTwitch />,
      },
   ];

   return (
      <div className='menu-holder'>
         <div
            className={`menu-inside fixed top-0 left-0 w-full h-screen -translate-y-[100%] transition-transform duration-700 ease-in-out  bg-[#000] -z-10 text-[#fff] ${
               open && 'translate-y-0 open'
            }`}
         >
            <div
               className='menu-nav-container absolute left-[50%]
            sm:left-0 bottom-[10vh] sm:bottom-[30vh] overflow-hidden w-[calc(90vw-60px)] sm:translate-x-[20%]'
            >
               <ul className='internal-nav-links'>
                  {internalLinks.map((link) => (
                     <li
                        key={link.url}
                        onClick={() => setOpen(false)}
                        className='hover:cursor-pointer pb-4  sm:pb-8 '
                     >
                        <Link
                           className={`${
                              !open && 'opacity-0'
                           } font-sans text-clamp-size leading-[1.1em] `}
                           href={link.url}
                        >
                           <span className='hover-custom '>
                              {link.component}
                           </span>
                        </Link>
                     </li>
                  ))}
               </ul>
               <ul className='external-nav-links mt-[50px] flex flex-wrap'>
                  {externalLinks.map((link) => (
                     <li
                        key={link.url}
                        className='mr-[10px] sm:mr-[30px] hover:opacity-50'
                     >
                        <Link
                           href={link.url}
                           target='_blank'
                           rel='noopener noreferrer'
                           onClick={() => setOpen(false)}
                           className='-translate-x-[100%] opacity-0 custom-transition external-item'
                        >
                           {link.component}
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default MenuContent;
