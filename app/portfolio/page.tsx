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
};

type PortfolioProps = {
   oceans: Photo[];
   forests: Photo[];
   allRandom: Photo[];
};

const getData = async (): Promise<PortfolioProps> => {
   const unsplash = createApi({
      accessKey: process.env.UNSPLASH_ACCESS_KEY!,
      fetch: nodeFetch.default as unknown as typeof fetch,
   });

   const oceans = await getImages(unsplash, 'oceans');
   const forests = await getImages(unsplash, 'forests');
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

   const allRandom = randomFill(oceans, forests);

   return { oceans, forests, allRandom };
};

async function getImages(
   cli: ReturnType<typeof createApi>,
   query: string
): Promise<Photo[]> {
   const images = await cli.search.getPhotos({
      query,
      perPage: 10,
  
   });

   const mappedImages: Photo[] = [];
   if (images.type === 'success') {
      await Promise.all(
         images.response.results.map(async (image, idx) => {
            const src = `${image.urls.full}&w=800&h=600`;
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
   const { oceans, forests, allRandom } = await getData();

   return (
      <PortfolioDisplay
         oceans={oceans}
         forests={forests}
         allRandom={allRandom}
      />
   );
};

export default portfolio;
