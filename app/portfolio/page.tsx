'use client';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Gallery from '../components/Gallery';

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

const portfolio = () => {
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
                     // photos={all}
                     // handleImageClick={handleImageClick}
                     // openSlide={openSlide}
                     // setOpenSlide={setOpenSlide}
                     // selectedImage={selectedImage}
                     />
                     <div>ALL</div>
                  </Tab.Panel>

                  <Tab.Panel>
                     <Gallery
                     // photos={oceans}
                     // handleImageClick={handleImageClick}
                     // openSlide={openSlide}
                     // setOpenSlide={setOpenSlide}
                     // selectedImage={selectedImage}
                     />
                     <div>OCEANS</div>
                  </Tab.Panel>
                  <Tab.Panel>
                     <Gallery
                     // photos={forests}
                     // handleImageClick={handleImageClick}
                     // openSlide={openSlide}
                     // setOpenSlide={setOpenSlide}
                     // selectedImage={selectedImage}
                     />
                     <div>FORESTS</div>
                  </Tab.Panel>
               </Tab.Panels>
            </Tab.Group>
         </div>
      </>
   );
};

export default portfolio;
