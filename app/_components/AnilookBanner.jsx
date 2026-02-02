'use client'


import Image from 'next/image'
import React from 'react'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AnilookBanner() {
          const router = useRouter()

          const redirect = () => {
                    router.push('/app-download')
          }
          return (
                    <div className='flex items-center justify-center'>
                              {/* Main Container - Visually locked aspect ratio */}
                              <div className='relative w-full max-w-[850px] h-[230px] bg-gradient-to-r from-[#9e1c1c] to-[#7f1616] overflow-hidden shadow-lg border border-white/5'>

                                        {/* Inner Border Line - Adjusted opacity and inset */}
                                        <div className='absolute inset-3 border border-white/20 pointer-events-none z-10'></div>

                                        <div className='flex h-full relative'>

                                                  {/* Left Content - Text */}
                                                  <div className='flex flex-col justify-center pl-8 md:pl-12 z-20 flex-1 min-w-[50%]'>
                                                            <h2 className='text-white font-bold text-2xl md:text-3xl leading-tight mb-2 tracking-wide'>
                                                                      BEST Free Anime App
                                                            </h2>
                                                            <p className='text-white/90 text-sm md:text-[15px] font-medium mb-6 max-w-[300px] leading-snug'>
                                                                      Watch all Anime in HD on your Android devices
                                                            </p>

                                                            <button className='group flex items-center justify-between bg-white text-black w-[170px] py-2.5 px-5 rounded-lg font-bold transition-transform active:scale-95 shadow-md' onClick={redirect}>
                                                                      <span className='text-sm'>Download Now</span>
                                                                      <ChevronRight size={18} strokeWidth={3} className="ml-1" />
                                                            </button>
                                                  </div>

                                                  {/* Right Content - Images */}
                                                  {/* Using a fixed width container for images relative to the parent to lock the visual */}
                                                  <div className='absolute right-20 top-5 h-full w-[50%] md:w-[450px] z-10'>

                                                            {/* Back Phone (Group Image) - Positioned behind and to the right */}
                                                            <div className='absolute right-[-40px] md:right-[-20px] top-6 w-[160px] md:w-[190px] opacity-90 z-10 transform rotate-[8deg]'>
                                                                      <Image
                                                                                src='/banner2.jpeg'
                                                                                alt='Poster Preview'
                                                                                width={400}
                                                                                height={800}
                                                                                className='rounded-[20px] object-cover shadow-2xl brightness-75'
                                                                      />
                                                            </div>

                                                            {/* Front Phone (Tanjiro) - Positioned in front and slightly left */}
                                                            <div className='absolute right-[70px] md:right-[110px] top-4 w-[170px] md:w-[200px] z-20 transform rotate-[-5deg]'>
                                                                      <Image
                                                                                src='/banner1.jpeg'
                                                                                alt='App Preview'
                                                                                width={400}
                                                                                height={800}
                                                                                className='rounded-[24px] object-cover border-[3px] border-black/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                                                                      />
                                                            </div>

                                                  </div>

                                        </div>
                              </div>
                    </div>
          )
}