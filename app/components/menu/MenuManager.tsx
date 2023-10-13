'use client';
import React, { createContext, useState, ReactNode } from 'react';

interface MenuContextType {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuContext = createContext<MenuContextType | undefined>(
   undefined
);

interface MenuManagerProps {
   children: ReactNode;
}

const MenuManager: React.FC<MenuManagerProps> = (props) => {
   const [open, setOpen] = useState<boolean>(false);

   return (
      <MenuContext.Provider value={{ open, setOpen }}>
         {props.children}
      </MenuContext.Provider>
   );
};

export default MenuManager;
