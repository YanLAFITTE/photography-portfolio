'use client';
import Slider from './Slider';

import Masonry from 'react-masonry-css';
import Image from 'next/image';

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
   default: 2,
   1100: 2,
   700: 2,
   500: 1,
};

const Gallery = ({
   photos,
   handleImageClick,
   openSlide,
   setOpenSlide,
   selectedImage,
}: GalleryProps) => {
   return (
      <>
         <Masonry
            breakpointCols={breakpointColumnsObj}
            className=' flex gap-5 sm:gap-8  max-w-[1200px] mx-auto fade-in'
            columnClassName='my-masonry-grid_column'
         >
            {photos.map((image, i) => (
               <div className='mb-5 sm:mb-8 bg-stone-900   relative group' key={i}>
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
                  />
                  <p className='absolute md:text-xl top-2 left-2 opacity-0 group-hover:opacity-100'>
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
