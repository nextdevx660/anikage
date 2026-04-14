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
import { useRouter } from 'next/navigation';
import { FaRandom } from "react-icons/fa";
import axios from 'axios';

export default function Header() {
  const [userData, setUserData] = useState({})
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { user } = useAuth()
  const router = useRouter()

  const redirectToNotify = () => {
    router.push('/notification')
  }

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


  const handleRandomClick = async () => {
    const res = await axios.get('https://anime-api-zeta-hazel.vercel.app/api/random')
    router.push(`/${res.data.results.id}`)
    // console.log(res.data.results);
  }

  return (
    <>
      <header
        className={`px-4 py-2 flex items-center justify-between fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-gradient-to-b from-black via-black/60 to-transparent backdrop-blur-xl'
          : 'bg-gradient-to-b from-black to-transparent'
          }`}
      >
        {/* Left Section */}
        <div className="flex items-center">
          <MenuWithSidebar />
          <Link href={'/'}>
            <h1 className='text-3xl text-white font-bold'>An<span className='text-rose-500'>!</span>Kage</h1>
          </Link>

          {/* Search input visible only on md and up */}
          <div className="hidden md:block pl-4">
            <div className='flex items-center gap-15'>
              <SearchInput />
              <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => {handleRandomClick()}}>
                <FaRandom color="oklch(64.5% 0.246 16.439)" size={20} />
                <h1 className="text-white text-sm hover:text-rose-500">Random</h1>
              </div>
            </div>
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

          {/* {
            user && <div
              className="text-white cursor-pointer hover:bg-white/20 transition font-bold"
              onClick={() => setShowSearchInput(prev => !prev)}
            >
              <Bell size={24} onClick={redirectToNotify} />
            </div>
          } */}

          {!user ?
            <Link href={'/login'} className="bg-rose-500 text-white font-medium px-4 py-1.5 rounded-lg hover:bg-rose-600 transition">
              <button>
                Login
              </button>
            </Link> :
            <div>
              {userData?.photoUrl && <Link href={'/profile'}><Image src={userData?.photoUrl} alt='logo' width={100} height={100} className='w-8 h-8 rounded-full border-2 border-rose-500' /></Link>}
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
