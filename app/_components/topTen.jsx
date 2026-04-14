'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Mic } from 'lucide-react';
import Link from 'next/link';
import { BsFillBadgeCcFill } from "react-icons/bs";


export default function TopTenTabs() {
          const [topTen, setTopTen] = useState({ today: [], week: [], month: [] });
          const [loading, setLoading] = useState(true);

          useEffect(() => {
                    const fetchTopTen = async () => {
                              try {
                                        const res = await axios.get('https://anime-api-zeta-hazel.vercel.app/api/top-ten');
                                        setTopTen(res.data.results);
                              } catch (error) {
                                        console.error('Error fetching Top 10:', error);
                              } finally {
                                        setLoading(false);
                              }
                    };
                    fetchTopTen();
          }, []);

          const renderList = (list) => (
                    <div className="space-y-4">
                              {list.map((item, index) => (
                                        <Link href={'/' + item?.id} key={index} className="flex items-center gap-4 cursor-pointer">
                                                            <div className={
                                                                      (index === 0 || index === 1 || index === 2)
                                                                                ? `text-xl font-bold text-white w-8 border-b-2 border-rose-500 flex items-center justify-center`
                                                                                : `text-xl font-bold text-white w-8 flex items-center justify-center`
                                                            }>
                                                                      {String(item.number).padStart(2, '0')}
                                                            </div>

                                                            {item?.poster && <Image
                                                                      src={item.poster}
                                                                      alt={item.title}
                                                                      width={50}
                                                                      height={70}
                                                                      className="rounded shadow-md"
                                                            />}
                                                            <div>
                                                                      <div className="font-semibold text-white leading-snug hover:text-rose-500">{item.title}</div>
                                                                      <div className="flex gap-0.5 mt-1">
                                                                                {/* Placeholder TV Info */}
                                                                                <h2 className='bg-rose-500 px-1 py-0.5 text-white text-[10px] rounded-bl-md rounded-tl-md flex items-center gap-1'><BsFillBadgeCcFill size={15} /> {item?.tvInfo.sub}</h2>
                                                                                <h2 className='bg-[#00e5a0] px-1 py-0.5 text-white text-[10px] flex items-center gap-1 rounded-tr-md rounded-br-md'><span><Mic size={14} /></span> {item?.tvInfo.dub}</h2>
                                                                      </div>
                                                            </div>
                                        </Link>
                              ))}
                    </div>
          );


          return (
                    <div className="bg-neutral-800 p-4 w-full max-w-md mx-auto">
                              <Tabs defaultValue="today" className="w-full">
                                        <div className="flex items-center justify-between mb-4">
                                                  <h2 className="text-rose-500 font-bold text-2xl">Top 10</h2>
                                                  <TabsList className="flex gap-2">
                                                            <TabsTrigger value="today">Today</TabsTrigger>
                                                            <TabsTrigger value="week">Week</TabsTrigger>
                                                            <TabsTrigger value="month">Month</TabsTrigger>
                                                  </TabsList>
                                        </div>
                                        <TabsContent value="today">{renderList(topTen.today)}</TabsContent>
                                        <TabsContent value="week">{renderList(topTen.week)}</TabsContent>
                                        <TabsContent value="month">{renderList(topTen.month)}</TabsContent>
                              </Tabs>
                    </div>
          );
}
