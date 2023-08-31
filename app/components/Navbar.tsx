"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavItem from './NavItem';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [render, setRender] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
    console.log(menu)
  };

  useEffect(() => {
    setRender(true);
  }, [])

  return render && (
    <nav className='relative z-10 w-full bg-orange-500 text-white'>
      <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
        <div className="flex items-center text-2xl h-14">
          <Link href="/">Logo</Link>
        </div>

        <div className="text-2xl sm:hidden">
          {menu === false ?
            <button onClick={handleMenu}>+</button> :
            <button onClick={handleMenu}>-</button>}
        </div>

        <div className='hidden sm:block'>
          <NavItem />
        </div>
      </div>

      <div className='block sm:hidden'>
        {menu ? <NavItem mobile /> : null}
      </div>
    </nav>
  );
};

export default Navbar;
