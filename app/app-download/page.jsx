import Image from 'next/image'
import React from 'react'
import { Download } from 'lucide-react'

export default function AnimeLandingPage() {
          return (
                    <div className='min-h-screen bg-[#18181b] text-white flex items-center justify-center overflow-hidden font-sans pt-5 pb-10'>

                              {/* Background ambient glow (optional, adds depth like the image) */}
                              <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none' />

                              <div className='max-w-7xl w-full mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10'>

                                        {/* Left Column: Content */}
                                        <div className='flex flex-col space-y-8'>

                                                  <div className='space-y-4'>
                                                            <h1 className='text-4xl md:text-5xl font-bold leading-tight'>
                                                                      Best Anime Android App
                                                            </h1>
                                                            <h2 className='text-xl md:text-2xl text-gray-200 font-medium'>
                                                                      Watch and Download Anime on your Android device for Free
                                                            </h2>
                                                  </div>

                                                  {/* Feature List */}
                                                  <ul className='space-y-5 text-lg text-gray-300'>
                                                            {[
                                                                      "Both DUB/SUB supported.",
                                                                      "Absolutely Ads-Free.",
                                                                      "Smooth Streaming with no Buffering.",
                                                                      "Chromecast Support.",
                                                                      "FREE with no account required."
                                                            ].map((item, index) => (
                                                                      <li key={index} className='flex items-center gap-4'>
                                                                                <span className='w-2 h-2 bg-white rounded-full flex-shrink-0' />
                                                                                <span>{item}</span>
                                                                      </li>
                                                            ))}
                                                  </ul>

                                                  {/* Download Button */}
                                                  <div className='pt-4'>
                                                            <button className='w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-colors duration-200 shadow-lg'>
                                                                      <Download strokeWidth={2.5} size={24} />
                                                                      <span>Download for android</span>
                                                            </button>
                                                  </div>

                                        </div>

                                        {/* Right Column: Phone Mockups */}
                                        <div className='relative h-[600px] w-full flex items-center justify-center lg:justify-end'>

                                                  {/* Back Phone (Right side, behind) */}
                                                  <div className='absolute top-10 right-0 lg:right-4 w-[200px] md:w-[280px] opacity-90 transform rotate-[-6deg] z-10 transition-transform duration-500 hover:scale-105'>
                                                            <Image
                                                                      src="/banner2.jpeg"
                                                                      alt="Anime Detail Screen"
                                                                      width={300}
                                                                      height={600}
                                                                      className='rounded-[30px] border-[6px] border-[#2a2a2a] shadow-2xl'
                                                            />
                                                  </div>

                                                  {/* Front Phone (Left side, in front) */}
                                                  <div className='absolute top-10 right-[120px] lg:right-[160px] w-[210px] md:w-[290px] z-20 transform rotate-[4deg] transition-transform duration-500 hover:scale-105'>
                                                            <Image
                                                                      src="/banner1.jpeg"
                                                                      alt="Anime Home Screen"
                                                                      width={300}
                                                                      height={600}
                                                                      className='rounded-[32px] border-[6px] border-[#1f1f1f] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)]'
                                                            />
                                                  </div>

                                        </div>

                              </div>
                    </div>
          )
}