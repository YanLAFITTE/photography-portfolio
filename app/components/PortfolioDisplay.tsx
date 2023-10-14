'use client';

import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Gallery from './Gallery';
import { useEffect, useState } from 'react';

const tabs = [
   {
      key: 'all',
      display: 'All',
   },
   {
      key: 'oceans',
      display: 'Oceans',
   },
   {
      key: 'forests',
      display: 'Forests',
   },
];

type OpenSlide = boolean;
type SetOpenSlide = React.Dispatch<React.SetStateAction<OpenSlide>>;

type Photo = {
   src: string;
   user: string;
   link: string;
   width: number;
   height: number;
   alt: string;
   blurData: string;
};

type PortfolioProps = {
   oceans: Photo[];
   forests: Photo[];
};

const PortfolioDisplay = ({ oceans, forests }: PortfolioProps) => {
   const [openSlide, setOpenSlide]: [OpenSlide, SetOpenSlide] = useState(false);
   const [selectedImage, setSelectedImage] = useState<number | null>(null);
   const [all, setAll] = useState<Photo[]>([]);

   const handleImageClick = (index: number) => {
      setSelectedImage(index);

      setOpenSlide(true);
      document.body.style.overflow = 'hidden';
   };

   useEffect(() => {
      function randomFill(oceans: Photo[], forests: Photo[]): Photo[] {
         const all = [...oceans, ...forests];
         const shuffled = [...all];

         // Fisher-Yates Shuffle Algorithm
         for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
         }

         return shuffled;
      }

      const all = randomFill(oceans, forests);
      setAll(all);
   }, [forests, oceans]);

   return (
      <>
         <div className='flex flex-col items-center '>
            <Tab.Group>
               <Tab.List className='flex items-center w-full justify-center mb-24'>
                  {tabs.map((tab) => (
                     <Tab key={tab.key} className='sm:px-8 px-5 outline-none'>
                        {({ selected }) => (
                           <span
                              className={classNames(
                                 'lg:text-xl uppercase cursor-pointer',
                                 selected ? 'text-white' : 'text-stone-400'
                              )}
                           >
                              {tab.display}
                           </span>
                        )}
                     </Tab>
                  ))}
               </Tab.List>
               <Tab.Panels>
                  <Tab.Panel>
                     <Gallery
                        photos={all}
                        handleImageClick={handleImageClick}
                        openSlide={openSlide}
                        setOpenSlide={setOpenSlide}
                        selectedImage={selectedImage}
                     />
                  </Tab.Panel>

                  <Tab.Panel>
                     <Gallery
                        photos={oceans}
                        handleImageClick={handleImageClick}
                        openSlide={openSlide}
                        setOpenSlide={setOpenSlide}
                        selectedImage={selectedImage}
                     />
                  </Tab.Panel>
                  <Tab.Panel>
                     <Gallery
                        photos={forests}
                        handleImageClick={handleImageClick}
                        openSlide={openSlide}
                        setOpenSlide={setOpenSlide}
                        selectedImage={selectedImage}
                     />
                  </Tab.Panel>
               </Tab.Panels>
            </Tab.Group>
         </div>
      </>
   );
};

export default PortfolioDisplay;
