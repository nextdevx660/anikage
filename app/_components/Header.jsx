'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Bell, Search } from 'lucide-react';
import SearchInput from './SearchInput';
import Link from 'next/link';
import MenuWithSidebar from './MenuIcon';
import { useAuth } from '../_context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Header() {
  const [userData, setUserData] = useState({})
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { user } = useAuth()


  const getUserData = async () => {
    const docRef = doc(db, 'anilook_users', user.uid)
    const docSnap = await getDoc(docRef)
    setUserData(docSnap.data());
  }

  useEffect(() => {
    user && getUserData()
  }, [user])


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`px-4 py-2 flex items-center justify-between fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-gradient-to-b from-black via-black/60 to-transparent backdrop-blur-xl'
          : 'bg-gradient-to-b from-black to-transparent'
          }`}
      >
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <MenuWithSidebar />
          <Link href={'/'}>
            <h1 className='text-white text-3xl md:text-4xl font-bold'>An<span className='text-red-200'>!</span>Look</h1>
          </Link>

          {/* Search input visible only on md and up */}
          <div className="hidden md:block">
            <SearchInput />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Mobile search icon */}
          <div
            className="text-white cursor-pointer hover:bg-white/20 transition block md:hidden font-bold"
            onClick={() => setShowSearchInput(prev => !prev)}
          >
            <Search size={24} />
          </div>

          {
            user &&  <div
            className="text-white cursor-pointer hover:bg-white/20 transition font-bold"
            onClick={() => setShowSearchInput(prev => !prev)}
          >
            <Bell size={24} />
          </div>
          }

          {!user ?
            <Link href={'/signup'} className="bg-red-200 text-black font-medium px-4 py-1.5 rounded-lg hover:bg-red-300 transition">
            <button>
              Login
            </button>
            </Link> :
            <div>
              {userData?.photoUrl && <Link href={'/profile'}><Image src={userData?.photoUrl} alt='logo' width={100} height={100} className='w-8 h-8 rounded-full' /></Link>}
            </div>
          }
        </div>
      </header>

      {/* Mobile search input */}
      {showSearchInput && (
        <div className="md:hidden w-full mt-14 flex items-center justify-center fixed z-40">
          <SearchInput />
        </div>
      )}
    </>
  );
}
