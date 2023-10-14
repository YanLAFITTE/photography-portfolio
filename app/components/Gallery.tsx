'use client';
import Slider from './Slider';

import Masonry from 'react-masonry-css';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

type OpenSlide = boolean;
type SetOpenSlide = React.Dispatch<React.SetStateAction<OpenSlide>>;
type Photo = {
   src: string;
   width: number;
   height: number;
   alt: string;
   user: string;
   link: string;
   blurData: string;
};

type GalleryProps = {
   photos: Photo[];
   handleImageClick: (index: number) => void;
   openSlide: OpenSlide;
   setOpenSlide: SetOpenSlide;
   selectedImage: number | null;
};

const breakpointColumnsObj = {
   default: 4,
   1100: 3,
   700: 2,
   500: 2,
};

const Gallery = ({
   photos,
   handleImageClick,
   openSlide,
   setOpenSlide,
   selectedImage,
}: GalleryProps) => {
   const { ref, inView } = useInView({
      triggerOnce: true,
      // threshold: 0,
   });

   return (
      <>
         <Masonry
            breakpointCols={breakpointColumnsObj}
            className=' flex gap-3 sm:gap-5 fade-in max-w-[1200px] mx-auto'
            columnClassName='my-masonry-grid_column'
         >
            {photos.map((image, i) => (
               <div
                  className='mb-3 sm:mb-5   relative group'
                  key={i}
                  ref={ref}
               
               >
                  <Image
                     id={`image-${i}`}
                     src={image.src}
                     alt={image.alt}
                     width={image.width}
                     height={image.height}
                     placeholder='blur'
                     blurDataURL={image.blurData}
                     className=' w-full object-cover hover:cursor-pointer  sm:hover:opacity-80'
                     onClick={() => handleImageClick(i)}
                     style={{
                        opacity: inView ? 1 : 0,
                        scale: inView ? 1 : 0,
                        transition: 'opacity 500ms ease-in-out',
                     }}
                  />
                  <p className='absolute top-2 left-2 opacity-0 group-hover:opacity-100'>
                     {image.user}
                  </p>
               </div>
            ))}
         </Masonry>
         <Slider
            openSlide={openSlide}
            setOpenSlide={setOpenSlide}
            mappedData={photos}
            selectedImage={selectedImage}
         />
      </>
   );
};
export default Gallery;
