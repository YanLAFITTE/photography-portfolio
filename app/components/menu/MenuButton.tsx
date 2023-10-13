'use client';

import React, { useContext } from 'react';
import { MenuContext } from './MenuManager';

const MenuButton: React.FC = () => {
   const menuContext = useContext(MenuContext);

   if (!menuContext) {
      // Handle the case where the context is not available (optional)
      return null;
   }

   const { open, setOpen } = menuContext;

   return (
      <div className={`menu-button-wrap   ${open && 'open'}`}>
         <button
            className='menu-button bg-[#fff] rounded-full p-[24px] hover:opacity-90'
            onClick={() => setOpen(!open)}
         >
            <span className='absolute'/>
         </button>
      </div>
   );
};

export default MenuButton;
