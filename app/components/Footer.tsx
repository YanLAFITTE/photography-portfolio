import Link from 'next/link';

const Footer = () => {
   return (
      <footer className='lg:py-[200px] py-[100px] px-5 sm:px-14  text-center  '>
         <Link
            href='mailto:welcome.yanlafitte@gmail.com'
            className='lg:text-5xl text-large sm:text-3xl hover:underline cursor-pointer transition duration-300 '
         >
            hello@photographyportfolio.com
         </Link>
         <p className='lg:mt-[120px] mb-[30px] mt-[10px] sm:mt-[60px] lg:text-3xl text-xl'>
            Photography Portfolio
         </p>
         <div className='flex gap-2  justify-center'>
            <span className='text-sm opacity-60'>
               © 2023 Photography Portfolio
            </span>
            <span className='text-sm opacity-60'>/</span>
            <Link
               href='https://www.yanlafitte.com'
               target='_blank'
               rel='noopener noreferrer'
               className='text-sm opacity-60 hover:opacity-100 cursor-pointer transition duration-300'
            >
               Code by Yan
            </Link>
         </div>
      </footer>
   );
};

export default Footer;
