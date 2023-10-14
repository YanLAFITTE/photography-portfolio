import { createApi } from 'unsplash-js';
import * as nodeFetch from 'node-fetch';

import PortfolioDisplay from '../components/PortfolioDisplay';
import { getPlaiceholder } from 'plaiceholder';

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

const getData = async (): Promise<PortfolioProps> => {
   const unsplash = createApi({
      accessKey: process.env.UNSPLASH_ACCESS_KEY!,
      fetch: nodeFetch.default as unknown as typeof fetch,
   });

   const oceans = await getImages(unsplash, 'oceans');
   const forests = await getImages(unsplash, 'forests');
 

   return { oceans, forests };
};

async function getImages(
   cli: ReturnType<typeof createApi>,
   query: string
): Promise<Photo[]> {
   const images = await cli.photos.getRandom({
      query,
      count: 10,
   });

   const mappedImages: Photo[] = [];
   if (images.type === 'success') {
      const responseArr = Array.isArray(images.response)
         ? images.response
         : [images.response];
      await Promise.all(
         responseArr.map(async (image, idx) => {
            const src = image.urls.full;
            const buffer = await fetch(src).then(async (res) =>
               Buffer.from(await res.arrayBuffer())
            );

            const { base64 } = await getPlaiceholder(buffer);

            const photo: Photo = {
               src: src,
               user: image.user.name,
               link: image.user.links.html,
               width: image.width,
               height: image.height,
               alt: image.alt_description ?? `image-${idx}`,
               blurData: base64, // Add blurData URL
               likes: image.likes
            };

            mappedImages.push(photo);
         })
      );
   } else {
      console.error('Could not get photos');
   }

   return mappedImages;
}

const portfolio = async () => {
   const { oceans, forests } = await getData();

   return (
      <PortfolioDisplay
         oceans={oceans}
         forests={forests}
      />
   );
};

export default portfolio;
