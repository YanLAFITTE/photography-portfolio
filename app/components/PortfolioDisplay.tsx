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
   allRandom: Photo[];
};

const PortfolioDisplay = ({ oceans, forests, allRandom }: PortfolioProps) => {
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

   return (
      <>
         <div className='flex flex-col items-center '>
            <Tab.Group
               onChange={(index) => {
                  console.log('Changed selected tab to:', index);
               }}
            >
               <Tab.List className='flex items-center w-full justify-center mb-24'>
                  {tabs.map((tab, index) => (
                     <Tab key={tab.key} className='sm:px-8 px-5 outline-none'>
                        <div
                           className={classNames(
                              'lg:text-xl uppercase cursor-pointer',
                              activeTab === index
                                 ? 'text-white'
                                 : 'text-stone-400'
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
                        photos={
                           index === 0
                              ? allRandom
                              : index === 1
                              ? oceans
                              : forests
                        }
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
