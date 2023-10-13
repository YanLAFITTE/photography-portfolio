// import Slider from './Slider';
// import Masonry from 'react-masonry-css';
// import Image from 'next/image';

// type OpenSlide = boolean;
// type SetOpenSlide = React.Dispatch<React.SetStateAction<OpenSlide>>;
// type Photo = {
//    src: string;
//    width: number;
//    height: number;
//    alt: string;
//    user: string;
//    link: string;
// };

// type GalleryProps = {
//    photos: Photo[];
//    handleImageClick: (index: number) => void;
//    openSlide: OpenSlide;
//    setOpenSlide: SetOpenSlide;
//    selectedImage: number | null;
// };

// const breakpointColumnsObj = {
//    default: 4,
//    1100: 3,
//    700: 2,
//    500: 2,
// };

// const Gallery = ({
//    photos,
//    handleImageClick,
//    openSlide,
//    setOpenSlide,
//    selectedImage,
// }: GalleryProps) => {
//    return (
//       <>
//          <Masonry
//             breakpointCols={breakpointColumnsObj}
//             className=' flex gap-3 sm:gap-5 fade-in max-w-[1200px] mx-auto'
//             columnClassName='my-masonry-grid_column'
//          >
//             {photos.map((image, i) => (
//                <div className='mb-3 sm:mb-5 bg-black relative group' key={i}>
//                   <Image
//                      id={`image-${i}`}
//                      src={image.src}
//                      alt={image.alt}
//                      width={image.width}
//                      height={image.height}
//                      className='w-full object-cover hover:cursor-pointer  sm:hover:opacity-80 '
//                      onClick={() => handleImageClick(i)}
//                   />
//                   <p className='absolute top-2 left-2 opacity-0 group-hover:opacity-100'>
//                      {image.user}
//                   </p>
//                </div>
//             ))}
//          </Masonry>
//          <Slider
//             openSlide={openSlide}
//             setOpenSlide={setOpenSlide}
//             mappedData={photos}
//             selectedImage={selectedImage}
//          />
//       </>
//    );
// };
// export default Gallery;



import React from 'react'

const Gallery = () => {
  return (
    <div>Gallery</div>
  )
}

export default Gallery
