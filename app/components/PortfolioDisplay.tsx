'use client';

import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import Gallery from './Gallery';
import { useEffect, useMemo, useState } from 'react';

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
   likes: number;
};

type PortfolioProps = {
   oceans: Photo[];
   forests: Photo[];
};

const PortfolioDisplay = ({ oceans, forests }: PortfolioProps) => {
   const [openSlide, setOpenSlide]: [OpenSlide, SetOpenSlide] = useState(false);
   const [selectedImage, setSelectedImage] = useState<number | null>(null);
   const [activeTab, setActiveTab] = useState<number>(0);

   const handleImageClick = (index: number) => {
      setSelectedImage(index);

      setOpenSlide(true);
      document.body.style.overflow = 'hidden';
   };

   const handleTabClick = (index: number) => {
      setActiveTab(index);
   };

   const allPhotos = useMemo(() => {
      const all = [...oceans, ...forests];
      return all.sort((a, b) => b.likes - a.likes);
   }, [oceans, forests]);

   const photoSets = [allPhotos, oceans, forests];

   return (
      <>
         <div className='flex flex-col items-center '>
            <Tab.Group>
               <Tab.List className='flex items-center w-full justify-center mb-24'>
                  {tabs.map((tab, index) => (
                     <Tab key={tab.key} className='sm:px-8 px-5 outline-none'>
                        <div
                           className={classNames(
                              'lg:text-xl uppercase cursor-pointer',
                              activeTab === index
                                 ? 'text-white'
                                 : 'text-stone-400 hover:text-white'
                           )}
                           onClick={() => handleTabClick(index)}
                        >
                           {tab.display}
                        </div>
                     </Tab>
                  ))}
               </Tab.List>
               {tabs.map((tab, index) => (
                  <Tab.Panel key={tab.key}>
                     <Gallery
                        photos={photoSets[activeTab]}
                        handleImageClick={handleImageClick}
                        openSlide={openSlide}
                        setOpenSlide={setOpenSlide}
                        selectedImage={selectedImage}
                     />
                  </Tab.Panel>
               ))}
            </Tab.Group>
         </div>
      </>
   );
};

export default PortfolioDisplay;
