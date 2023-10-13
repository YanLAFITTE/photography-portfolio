import Link from 'next/link';
import Menu from '../components/menu';

const Header = () => {
   return (
      <header className='flex flex-row-reverse gap-[15%] sm:gap-0 lg:flex-row justify-between  items-center h-[150px] w-full fixed  top-0 px-5 sm:px-14 bg-gradient-to-t from-transparent via-black/60 to-black z-10'>
         <Menu />
         
         <div className='lg:text-3xl text-xl  font-semibold uppercase lg:ml-[85px] '>
            Photography Portfolio
         </div>
         <Link
            href='mailto:welcome.yanlafitte@gmail.com'
            className='hidden lg:flex rounded-full bg-white  whitespace-nowrap text-stone-950 px-5  py-3 hover:bg-opacity-90 cursor-pointer transition duration-300 '
         >
            Get in touch
         </Link>
      </header>
   );
};

export default Header;
