'use client';

import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function WishlistCard({ list }) {
          const [animeData, setAnimeData] = useState([]);
          const [loading, setLoading] = useState(true);

          const fetchData = async () => {
                    try {
                              const requests = list.map((item) =>
                                        axios.get(`https://anime-api-zeta-hazel.vercel.app/api/info?id=${item.id}`)
                              );
                              const responses = await Promise.all(requests);

                              // Extract `results.data` from each response
                              const formatted = responses.map((res) => res.data?.results?.data);
                              setAnimeData(formatted);
                    } catch (error) {
                              console.error('Error fetching anime data:', error);
                    } finally {
                              setLoading(false);
                    }
          };

          useEffect(() => {
                    if (list?.length > 0) {
                              fetchData();
                    } else {
                              setLoading(false);
                    }
          }, [list]);

          if (loading) return <div className="text-white flex items-center justify-center mt-5"><Loader2Icon className='text-white animate-spin' size={35} /></div>;
          if (!animeData.length) return <div className="text-gray-400 text-center">No items found.</div>;

          return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                              {animeData.map((item, index) => (
                                        <Link href={`/${item?.id}`} key={index}>
                                                  <div>
                                                            <div className='relative'>
                                                                      {item?.adultContent == true ? <h2 className='bg-red-300 px-1 py-0.5 rounded-md text-white absolute top-2 left-2'>18+</h2> : ''}
                                                                      {item && <Image src={item?.poster} alt='poster' width={500} height={500} className='aspect-[2/3]' />}
                                                            </div>
                                                            <div className='flex flex-col text-white'>
                                                                      <h2 className='text-white font-bolt mt-2'>{item?.title.length == 15 ? item?.title : `${item?.title.slice(0, 15)}...`}</h2>
                                                                      <h2 className='flex items-center gap-2 text-[#6f6f6f]'>
                                                                                <span className='text-sm'>{item?.showType}</span> • <span>{item?.animeInfo?.Duration}</span>
                                                                      </h2>
                                                            </div>
                                                  </div>
                                        </Link>
                              ))}
                    </div>
          );
}
