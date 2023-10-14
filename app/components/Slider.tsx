import React, { FC, useEffect, useState } from 'react';
import { HiArrowRight, HiArrowLeft } from 'react-icons/hi';
import { MdOutlineClose } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Zoom } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import Image from 'next/image';
import classNames from 'classnames';
import SwiperCore from 'swiper/core';
import Link from 'next/link';

SwiperCore.use([Navigation, Zoom]);

type SetOpenSlide = React.Dispatch<React.SetStateAction<boolean>>;

type Photo = {
   src: string;
   width: number;
   height: number;
   alt: string;
   user: string;
   link: string;
};

type SliderProps = {
   openSlide: boolean;
   mappedData: Photo[];
   setOpenSlide: SetOpenSlide;
   selectedImage: number | null;
};

const Slider: FC<SliderProps> = ({
   openSlide,
   mappedData,
   setOpenSlide,
   selectedImage,
}) => {
   const [swiper, setSwiper] = useState<SwiperCore | null>(null);

   useEffect(() => {
      if (openSlide && !swiper) {
         const swiperInstance = new SwiperCore('.swiper-container', {
            speed: 500,
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 50,
            initialSlide: selectedImage || 0,
            navigation: {
               prevEl: '.swiper-button-prev',
               nextEl: '.swiper-button-next',
            },
            loop: true,
            zoom: true,
         });

         setSwiper(swiperInstance);
      }
   }, [openSlide, selectedImage, swiper]);

   useEffect(() => {
      if (!openSlide && swiper) {
         swiper.destroy(true, true);
         setSwiper(null);
      }
   }, [openSlide, swiper]);

   const handleClose = () => {
      setOpenSlide(false);
      document.body.style.overflow = 'auto';
   };

   return (
      <div
         className={classNames(
            openSlide
               ? 'fixed z-20 top-0 left-0 h-screen w-full  bg-black  '
               : 'hidden '
         )}
      >
         <div className='swiper-container'>
            <div className='swiper-wrapper'>
               {mappedData.map((image, i) => (
                  <SwiperSlide key={i} zoom>
                     <div className='swiper-zoom-container relative'>
                        <Image
                           src={image.src}
                           alt={image.alt}
                           width={image.width}
                           height={image.height}
                           className='w-full object-contain h-screen   py-10 px-5 sm:py-10 sm:px-20 '
                        />
                        <div className='absolute bottom-0 left-0 text-center pb-2 w-full'>
                           Photo by{' '}
                           <Link
                              href={image.link}
                              target='_blank'
                              rel='noopener noreferrer'
                              className=' capitalize hover:underline'
                           >
                              {image.user}
                           </Link>{' '}
                           on{' '}
                           <Link
                              href='https://unsplash.com/'
                              target='_blank'
                              rel='noopener noreferrer'
                              className='hover:underline'
                           >
                              Unsplash
                           </Link>
                        </div>
                     </div>
                  </SwiperSlide>
               ))}
            </div>
            <div className='hidden sm:block'>
               <HiArrowRight className='swiper-button-next mr-[30px] cursor-pointer' />
            </div>
            <div className='hidden sm:block'>
               <HiArrowLeft className='swiper-button-prev ml-[30px] cursor-pointer' />
            </div>
         </div>
         <MdOutlineClose
            onClick={() => handleClose()}
            className='absolute top-0 right-0 text-3xl  mt-5 sm:mt-10 mr-5 sm:mr-10  z-20 cursor-pointer'
         />
      </div>
   );
};

export default Slider;
