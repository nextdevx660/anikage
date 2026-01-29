'use client'

import React, { useEffect, useState } from 'react'
import RecentCard from '../_components/RecentCard'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import Genre from '../_components/Genre';

export default function page() {
          const [list, setList] = useState([]);
          const [totalPages, setTotalPages] = useState(1);
          const [loading, setLoading] = useState(false); // ✅ Loading state added

          const params = useParams();
          const searchParams = useSearchParams();
          const router = useRouter();
          const currentPage = parseInt(searchParams.get('page') || '1');

          useEffect(() => {
                    const getData = async () => {
                              setLoading(true); // ✅ Start loading

                              try {
                                        const res = await axios.get(`https://anime-api-zeta-hazel.vercel.app/api/top-airing?page=${currentPage}`);
                                        setList(res?.data?.results?.data || []);
                                        setTotalPages(res?.data?.results?.totalPages || 1);
                              } catch (error) {
                                        console.error('Error fetching data:', error);
                              }

                              setLoading(false); // ✅ Stop loading
                    };

                    getData();
          }, [currentPage]);

          const handlePageChange = (page) => {
                    if (page !== currentPage && page >= 1 && page <= totalPages) {
                              router.push(`/top-airing?page=${page}`);
                    }
          };

          const renderPagination = () => {
                    const visiblePages = [];
                    for (let i = currentPage; i <= Math.min(currentPage + 2, totalPages); i++) {
                              visiblePages.push(i);
                    }

                    return (
                              <div className="flex flex-wrap justify-center gap-2 pt-10 pb-5 bg-[#2d2b2c]">
                                        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}
                                                  className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-green-200 hover:text-black disabled:opacity-40">«</button>
                                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                                                  className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-green-200 hover:text-black disabled:opacity-40">‹</button>

                                        {visiblePages.map((page) => (
                                                  <button key={page} onClick={() => handlePageChange(page)}
                                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentPage === page
                                                                      ? 'bg-green-200 text-black'
                                                                      : 'bg-[#1f1f1f] text-gray-300 hover:bg-green-200 hover:text-black'
                                                                      }`}>
                                                            {page}
                                                  </button>
                                        ))}

                                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}
                                                  className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-green-200 hover:text-black disabled:opacity-40">›</button>
                                        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}
                                                  className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-green-200 hover:text-black disabled:opacity-40">»</button>
                              </div>
                    );
          };
          return (
                    <div className="bg-[#2d2b2c] pt-15 min-h-screen">
                              {loading ? (
                                        <div className="flex justify-center items-center h-screen text-white text-lg animate-pulse">
                                                  <Loader2Icon className='text-white animate-spin' size={35} />
                                        </div>
                              ) : (
                                        <>
                                                  <div>
                                                            <h2 className='text-2xl text-green-200 font-semibold mb-3 px-3'>Top Airing</h2>
                                                            <div className='md:flex'>
                                                                      <RecentCard list={list} />
                                                                      <Genre />
                                                            </div>
                                                            {totalPages > 1 && renderPagination()}
                                                  </div>
                                        </>
                              )}
                    </div>
          )
}
