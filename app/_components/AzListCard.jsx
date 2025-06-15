'use client'

import { Mic } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AzListCard({ list }) {
          return (
                    <div className="pt-8">
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                        {list?.map((item, index) => (
                                                  <Link href={`/${item?.id}`} key={index}>
                                                            <div>
                                                                      <div className='relative'>
                                                                                {item?.adultContent == true ? <h2 className='bg-red-300 px-1 py-0.5 rounded-md text-white absolute top-2 left-2'>18+</h2> : ''}
                                                                                {item && <Image src={item?.poster} alt='poster' width={500} height={500} className='aspect-[2/3]' />}
                                                                                <div className='absolute bottom-4 left-2 flex items-center gap-1'>
                                                                                          <h2 className='bg-green-200 px-1 py-0.5 text-black text-[12px] rounded-md flex items-center gap-1'><span className='bg-black/90 text-white text-[12px] px-1'>cc</span> {item?.tvInfo.sub}</h2>
                                                                                          {item?.tvInfo?.dub && <h2 className='bg-purple-200 px-1 py-0.5 text-black text-[12px] flex items-center gap-1 rounded-md'><span><Mic size={16} /></span>{item?.tvInfo.dub}</h2>}
                                                                                </div>
                                                                      </div>
                                                                      <div className='flex flex-col text-white'>
                                                                                <h2 className='text-white font-bolt mt-2'>{item?.title.length == 15 ? item?.title : `${item?.title.slice(0, 15)}...`}</h2>
                                                                                <h2 className='flex items-center gap-2 text-[#6f6f6f]'>
                                                                                          <span className='text-sm'>{item?.tvInfo?.showType}</span> • <span>{item?.tvInfo?.duration}</span>
                                                                                </h2>
                                                                      </div>
                                                            </div>
                                                  </Link>
                                        ))}
                              </div>
                    </div>
          )
}
