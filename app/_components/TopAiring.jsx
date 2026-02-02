'use client'

import axios from 'axios'
import { Mic, Mic2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export function TopAiring() {
          const [topAirings, setTopAirings] = useState([])


          useEffect(() => {
                    getTopAiring()
          }, [])
          const getTopAiring = async () => {
                    const res = await axios.get('https://anime-api-zeta-hazel.vercel.app/api/')
                    const topAiring = res?.data?.results?.topAiring
                    setTopAirings(topAiring)
          }
          return (
                    <div>
                              <h2 className='text-green-200 bg-neutral-950 font-bold text-lg px-5'>Top Airings</h2>
                              <div className='mt-5'>
                                        {
                                                  topAirings &&
                                                  topAirings.slice(0, 5).map((item, index) => (
                                                            <Link href={'/' + item?.id} key={index}>
                                                                      <div className='px-5 py-2 cursor-pointer' key={index}>
                                                                                <div className='flex items-center gap-5'>
                                                                                          <div>
                                                                                                    {item && <Image src={item?.poster} alt={item?.title} width={300} height={300} className='w-15 h-20 rounded-sm' />}
                                                                                          </div>
                                                                                          <div className='flex flex-col gap-1'>
                                                                                                    <h2 className='text-white hover:text-green-200 font-semibold'>{item?.title}</h2>
                                                                                                    <div className='flex items-center gap-3'>
                                                                                                              <div className='flex items-center gap-0.5'>
                                                                                                                        <h2 className='bg-green-200 px-1 py-0.5 text-black text-[10px] rounded-bl-md rounded-tl-md flex items-center gap-1'><span className='bg-black/90 text-white text-[8px] px-1'>cc</span> {item?.tvInfo.sub}</h2>
                                                                                                                        <h2 className='bg-purple-200 px-1 py-0.5 text-black text-[10px] flex items-center gap-1 rounded-tr-md rounded-br-md'><span><Mic size={14} /></span>{item?.tvInfo.dub}</h2>
                                                                                                              </div>
                                                                                                              <h2 className='text-white/60'>• {item.tvInfo?.showType}</h2>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                                <hr className='bg-white/50 w-full mt-5' />
                                                                      </div>
                                                            </Link>
                                                  ))
                                        }
                                        <Link href={'/top-airing'}>
                                                  <h2 className='flex items-center gap-2 text-md text-white px-5 py-2'>View More <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#fff"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg></h2>
                                        </Link>
                              </div>
                    </div>
          )
}


export function MostPopular() {
          const [mostPops, setMostPops] = useState([])


          useEffect(() => {
                    getMostPopular()
          }, [])
          const getMostPopular = async () => {
                    const res = await axios.get('https://anime-api-zeta-hazel.vercel.app/api/')
                    const mostPop = res?.data?.results?.mostPopular
                    setMostPops(mostPop)
          }
          return (
                    <div>
                              <h2 className='text-green-200 bg-neutral-950 font-bold text-lg px-5'>Most Popular</h2>
                              <div className='mt-5'>
                                        {
                                                  mostPops &&
                                                  mostPops.slice(0, 5).map((item, index) => (
                                                            <Link href={'/' + item?.id} key={index}>
                                                                      <div className='px-5 py-2 cursor-pointer' key={index}>
                                                                                <div className='flex items-center gap-5'>
                                                                                          <div>
                                                                                                    {item && <Image src={item?.poster} alt={item?.title} width={300} height={300} className='w-15 h-20 rounded-sm' />}
                                                                                          </div>
                                                                                          <div className='flex flex-col gap-1'>
                                                                                                    <h2 className='text-white hover:text-green-200 font-semibold'>{item?.title}</h2>
                                                                                                    <div className='flex items-center gap-3'>
                                                                                                              <div className='flex items-center gap-0.5'>
                                                                                                                        <h2 className='bg-green-200 px-1 py-0.5 text-black text-[10px] rounded-bl-md rounded-tl-md flex items-center gap-1'><span className='bg-black/90 text-white text-[8px] px-1'>cc</span> {item?.tvInfo.sub}</h2>
                                                                                                                        <h2 className='bg-purple-200 px-1 py-0.5 text-black text-[10px] flex items-center gap-1 rounded-tr-md rounded-br-md'><span><Mic size={14} /></span>{item?.tvInfo.dub}</h2>
                                                                                                              </div>
                                                                                                              <h2 className='text-white/60'>• {item.tvInfo?.showType}</h2>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                                <hr className='bg-white/50 w-full mt-5' />
                                                                      </div>
                                                            </Link>
                                                  ))
                                        }
                                        <Link href={'/most-popular'}>
                                                  <h2 className='flex items-center gap-2 text-md text-white px-5 py-2'>View More <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#fff"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg></h2>
                                        </Link>
                              </div>
                    </div>
          )
}


export function MostFavorite() {
          const [favs, setFavs] = useState([])


          useEffect(() => {
                    getMostPopular()
          }, [])
          const getMostPopular = async () => {
                    const res = await axios.get('https://anime-api-zeta-hazel.vercel.app/api/')
                    const fav = res?.data?.results?.mostFavorite
                    setFavs(fav)
          }
          return (
                    <div>
                              <h2 className='text-green-200 bg-neutral-950 font-bold text-lg px-5'>Most Favorite</h2>
                              <div className='mt-5'>
                                        {
                                                  favs &&
                                                  favs.slice(0, 5).map((item, index) => (
                                                            <Link href={'/' + item?.id} key={index}>
                                                                      <div className='px-5 py-2 cursor-pointer' key={index}>
                                                                                <div className='flex items-center gap-5'>
                                                                                          <div>
                                                                                                    {item && <Image src={item?.poster} alt={item?.title} width={300} height={300} className='w-15 h-20 rounded-sm' />}
                                                                                          </div>
                                                                                          <div className='flex flex-col gap-1'>
                                                                                                    <h2 className='text-white hover:text-green-200 font-semibold'>{item?.title}</h2>
                                                                                                    <div className='flex items-center gap-3'>
                                                                                                              <div className='flex items-center gap-0.5'>
                                                                                                                        <h2 className='bg-green-200 px-1 py-0.5 text-black text-[10px] rounded-bl-md rounded-tl-md flex items-center gap-1'><span className='bg-black/90 text-white text-[8px] px-1'>cc</span> {item?.tvInfo.sub}</h2>
                                                                                                                        <h2 className='bg-purple-200 px-1 py-0.5 text-black text-[10px] flex items-center gap-1 rounded-tr-md rounded-br-md'><span><Mic size={14} /></span>{item?.tvInfo.dub}</h2>
                                                                                                              </div>
                                                                                                              <h2 className='text-white/60'>• {item.tvInfo?.showType}</h2>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                                <hr className='bg-white/50 w-full mt-5' />
                                                                      </div>
                                                            </Link>
                                                  ))
                                        }
                                        <Link href={'/most-favorite'}>
                                                  <h2 className='flex items-center gap-2 text-md text-white px-5 py-2'>View More <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#fff"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg></h2>
                                        </Link>
                              </div>
                    </div>
          )
}


export function LatestCompleted() {
          const [latests, setLatests] = useState([])


          useEffect(() => {
                    getLatest()
          }, [])
          const getLatest = async () => {
                    const res = await axios.get('https://anime-api-zeta-hazel.vercel.app/api/')
                    const latest = res?.data?.results?.latestCompleted
                    setLatests(latest)
          }
          return (
                    <div>
                              <h2 className='text-green-200 bg-neutral-950 font-bold text-lg px-5'>Latest Completed</h2>
                              <div className='mt-5'>
                                        {
                                                  latests &&
                                                  latests.slice(0, 5).map((item, index) => (
                                                            <Link href={'/' + item?.id} key={index}>
                                                                      <div className='px-5 py-2 cursor-pointer' key={index}>
                                                                                <div className='flex items-center gap-5'>
                                                                                          <div>
                                                                                                    {item && <Image src={item?.poster} alt={item?.title} width={300} height={300} className='w-15 h-20 rounded-sm' />}
                                                                                          </div>
                                                                                          <div className='flex flex-col gap-1'>
                                                                                                    <h2 className='text-white hover:text-green-200 font-semibold'>{item?.title}</h2>
                                                                                                    <div className='flex items-center gap-3'>
                                                                                                              <div className='flex items-center gap-0.5'>
                                                                                                                        <h2 className='bg-green-200 px-1 py-0.5 text-black text-[10px] rounded-bl-md rounded-tl-md flex items-center gap-1'><span className='bg-black/90 text-white text-[8px] px-1'>cc</span> {item?.tvInfo.sub}</h2>
                                                                                                                        <h2 className='bg-purple-200 px-1 py-0.5 text-black text-[10px] flex items-center gap-1 rounded-tr-md rounded-br-md'><span><Mic size={14} /></span>{item?.tvInfo.dub}</h2>
                                                                                                              </div>
                                                                                                              <h2 className='text-white/60'>• {item.tvInfo?.showType}</h2>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                                <hr className='bg-white/50 w-full mt-5' />
                                                                      </div>
                                                            </Link>
                                                  ))
                                        }
                                        <Link href={'/completed'}>
                                                  <h2 className='flex items-center gap-2 text-md text-white px-5 py-2'>View More <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#fff"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg></h2>
                                        </Link>
                              </div>
                    </div>
          )
}