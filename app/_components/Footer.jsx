'use client'

import Link from 'next/link';
import React from 'react'
import { FaDiscord, FaTelegramPlane, FaRedditAlien, FaTwitter } from "react-icons/fa";



const icons = [
  { icon: <FaDiscord />, bg: "bg-[#5865F2]", link: "https://discord.com" },
  { icon: <FaTelegramPlane />, bg: "bg-[#0088cc]", link: "https://telegram.org" },
  { icon: <FaRedditAlien />, bg: "bg-[#FF4500]", link: "https://reddit.com" },
  { icon: <FaTwitter />, bg: "bg-[#1DA1F2]", link: "https://twitter.com" },
];


const list = [
  { name: '#', value: 'other' },
  { name: '0-9', value: '0-9' },
  { name: 'A', value: 'a' },
  { name: 'B', value: 'b' },
  { name: 'C', value: 'c' },
  { name: 'D', value: 'd' },
  { name: 'E', value: 'e' },
  { name: 'F', value: 'f' },
  { name: 'G', value: 'g' },
  { name: 'H', value: 'h' },
  { name: 'I', value: 'i' },
  { name: 'J', value: 'j' },
  { name: 'K', value: 'k' },
  { name: 'L', value: 'l' },
  { name: 'M', value: 'm' },
  { name: 'N', value: 'n' },
  { name: 'O', value: 'o' },
  { name: 'P', value: 'p' },
  { name: 'Q', value: 'q' },
  { name: 'R', value: 'r' },
  { name: 'S', value: 's' },
  { name: 'T', value: 't' },
  { name: 'U', value: 'u' },
  { name: 'V', value: 'v' },
  { name: 'W', value: 'w' },
  { name: 'X', value: 'x' },
  { name: 'Y', value: 'y' },
  { name: 'Z', value: 'z' }
];


export default function Footer() {
  return (
    <div className='bg-neutral-950 pt-20'>
      <div className='p-5 flex items-center gap-4'>
        <h1 className='text-white text-3xl md:text-4xl font-bold border-r-1 border-gray-600 p-2'>An<span className='text-rose-500'>!</span>Kage</h1>
        <div className="flex flex-wrap gap-2">
          {icons.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xl ${item.bg} hover:scale-110 transition-transform`}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
      <hr className='bg-gray-600 text-gray-600' />
      <div className='p-5 flex items-center gap-4'>
        <h2 className='text-2xl font-semibold px-2 text-white border-r-1 border-gray-600'>A-Z List</h2>
        <p className='text-gray-300 text-light text-lg'>Searching anime order by alphabet name A to Z.</p>
      </div>

      <div className='flex flex-wrap gap-2 px-5'>
        <Link href={'/az-list/'}>
          <button className='bg-[#3e3a3c] px-3 py-1 text-white font-semibold rounded-md hover:bg-rose-500 hover:text-white'>All</button>
        </Link>
        {
          list.map((item, index) => (
            <Link href={'/az-list/' + item?.value} key={index}>
              <button className='bg-[#3e3a3c] px-3 py-1 text-white font-semibold rounded-md hover:bg-rose-500 hover:text-white'>{item?.name}</button>
            </Link>
          ))
        }
      </div>
      <p className='text-gray-500 text-light text-sm md:text-md px-5 mt-5'>AniKage does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</p>
      <p className='text-gray-500 text-light text-md md:text-lg px-5 pb-5'>© AniKage. All rights reserved.</p>
    </div>
  )
}
