'use client'

import React, { useState, useEffect } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'

export default function MenuWithSidebar() {
          const [isOpen, setIsOpen] = useState(false)

          const toggleSidebar = () => {
                    setIsOpen(!isOpen)
          }

          // ✅ Disable scroll when sidebar is open
          useEffect(() => {
                    if (isOpen) {
                              document.body.style.overflow = 'hidden'
                    } else {
                              document.body.style.overflow = ''
                    }

                    return () => {
                              document.body.style.overflow = ''
                    }
          }, [isOpen])

          return (
                    <div>
                              {/* Menu Icon Button - stays visible */}
                              <div onClick={toggleSidebar} className="cursor-pointer p-2 z-50 relative">
                                        <MenuIcon className="text-white" size={30} />
                              </div>

                              {/* Sidebar */}
                              <div
                                        className={`fixed top-0 left-0 h-screen hover:text-red-200 w-[250px] bg-[#515151]/40 backdrop-blur-2xl z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                                                  }`}
                              >
                                        {/* Close Icon inside Sidebar */}
                                        <div className="flex justify-start p-4">
                                                  <div onClick={toggleSidebar} className='flex items-center gap-0.5 bg-[#555053] px-3 py-2 rounded-3xl'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#fff"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                                                            <h2 className='text-lg text-white'>close menu</h2>
                                                  </div>
                                        </div>

                                        <div className=" text-white">
                                                  <ul className="space-y-2">
                                                            <Link href={'/'}><li className='font-semibold text-lg border-b-1 px-2 py-4 border-gray-700 hover:text-red-200'>Home</li></Link>
                                                            <Link href={'/subbed-anime'}><li className='font-semibold text-lg border-b-1 px-2 py-4 border-gray-700 hover:text-red-200'>Subbed Anime</li></Link>
                                                            <Link href={'/dubbed-anime'}><li className='font-semibold text-lg border-b-1 px-2 py-4 border-gray-700 hover:text-red-200'>Dubbed Anime</li></Link>
                                                            <Link href={'/most-popular'}><li className='font-semibold text-lg border-b-1 px-2 py-4 border-gray-700 hover:text-red-200'>Most Popular</li></Link>
                                                            <Link href={'/movies'}><li className='font-semibold text-lg border-b-1 px-2 py-4 border-gray-700 hover:text-red-200'>Movies</li></Link>
                                                            <Link href={'/tv-series'}> <li className='font-semibold text-lg border-b-1 px-2 py-4 border-gray-700 hover:text-red-200'>TV Series</li></Link>
                                                            <Link href={'/ova'}><li className='font-semibold text-lg border-b-1 px-2 py-4 border-gray-700 hover:text-red-200'>OVAs</li></Link>
                                                            <Link href={'/ona'}><li className='font-semibold text-lg border-b-1 px-2 py-4 border-gray-700 hover:text-red-200'>ONAs</li></Link>
                                                            <Link href={'/special'}><li className='font-semibold text-lg border-b-1 px-2 py-4 border-gray-700 hover:text-red-200'>Specials</li></Link>
                                                  </ul>
                                        </div>
                              </div>

                              {/* Overlay for closing */}
                              {isOpen && (
                                        <div
                                                  className="fixed inset-0 bg-black/20 backdrop-blur-2xl z-40 h-screen"
                                                  onClick={toggleSidebar}
                                        ></div>
                              )}
                    </div>
          )
}
