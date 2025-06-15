'use client'

import axios from 'axios'
import { Mic } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function TopUpcoming() {
          const [latestEps, setLatestEps] = useState([])

          useEffect(() => {
                    getLatestEp()
          }, [])
          const getLatestEp = async () => {
                    const res = await axios.get('https://anime-api-zeta-hazel.vercel.app/api/top-upcoming')
                    setLatestEps(res?.data?.results?.data)
          }

          return (
                    <div className='px-3 mt-5'>
                              <h2 className='text-2xl text-red-200 font-bold py-3 flex items-center justify-between'>Top Upcoming
                                        <span>
                                                  <Link href={'/top-upcoming'} className='flex items-center gap-2 text-gray-500 text-[15px]'>
                                                            View More
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 -960 960 960" width="10px" fill="gray">
                                                                      <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                                                            </svg>
                                                  </Link>
                                        </span>
                              </h2>
                              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 items-center gap-4'>
                                        {latestEps &&
                                                  latestEps.slice(0, 12).map((item, index) => (
                                                            <Link href={item?.id} key={index}>
                                                                      <div>
                                                                                <div className='relative'>
                                                                                          {item?.adultContent == true ? <h2 className='bg-red-300 px-1 py-0.5 rounded-md text-white absolute top-2 left-2'>18+</h2> : ''}
                                                                                          {item && <Image src={item?.poster} alt='poster' width={500} height={500} className='aspect-[2/3]' />}
                                                                                          <div className='absolute bottom-4 left-2 flex items-center gap-1'>
                                                                                                    {item?.tvInfo?.sub &&<h2 className='bg-green-200 px-1 py-0.5 text-black text-[12px] rounded-md flex items-center gap-1'><span className='bg-black/90 text-white text-[12px] px-1'>cc</span> {item?.tvInfo.sub}</h2>}
                                                                                                    {item?.tvInfo?.dub && <h2 className='bg-purple-200 px-1 py-0.5 text-black text-[12px] flex items-center gap-1 rounded-md'><span><Mic size={16} /></span>{item?.tvInfo.dub}</h2>}
                                                                                          </div>
                                                                                </div>
                                                                                <div className='flex flex-col text-white'>
                                                                                          <h2 className='text-white font-bolt mt-2'>{item?.title.length == 15 ? item?.title : `${item?.title.slice(0, 15)}...`}</h2>
                                                                                          <h2 className='flex items-center gap-2 text-[#6f6f6f]'>
                                                                                                    <span className='text-sm'>{item?.tvInfo?.showType}</span> • <span>{item?.tvInfo?.duration.length < 2 ? item?.tvInfo?.duration : '...'}</span>
                                                                                          </h2>
                                                                                </div>
                                                                      </div>
                                                            </Link>
                                                  ))

                                        }
                              </div>
                    </div>
          )
}
