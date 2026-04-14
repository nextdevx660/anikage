'use client'

import AzListCard from '@/app/_components/AzListCard';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
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
                                        const res = await axios.get(`https://anime-api-zeta-hazel.vercel.app/api/az-list/${params.category}?page=${currentPage}`);
                                        setList(res?.data?.results?.data || []);
                                        setTotalPages(res?.data?.results?.totalPages || 1);
                              } catch (error) {
                                        console.error('Error fetching data:', error);
                              }

                              setLoading(false); // ✅ Stop loading
                    };

                    getData();
          }, [params.category, currentPage]);

          const handlePageChange = (page) => {
                    if (page !== currentPage && page >= 1 && page <= totalPages) {
                              router.push(`/az-list/${params.category}?page=${page}`);
                    }
          };

          const renderPagination = () => {
                    const visiblePages = [];
                    for (let i = currentPage; i <= Math.min(currentPage + 2, totalPages); i++) {
                              visiblePages.push(i);
                    }

                    return (
                              <div className="flex flex-wrap justify-center gap-2 pt-10 pb-5 bg-neutral-950">
                                        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}
                                                  className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-rose-500 hover:text-white disabled:opacity-40">«</button>
                                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                                                  className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-rose-500 hover:text-white disabled:opacity-40">‹</button>

                                        {visiblePages.map((page) => (
                                                  <button key={page} onClick={() => handlePageChange(page)}
                                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentPage === page
                                                                                ? 'bg-rose-500 text-white'
                                                                                : 'bg-[#1f1f1f] text-gray-300 hover:bg-rose-500 hover:text-white'
                                                                      }`}>
                                                            {page}
                                                  </button>
                                        ))}

                                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}
                                                  className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-rose-500 hover:text-white disabled:opacity-40">›</button>
                                        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}
                                                  className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-rose-500 hover:text-white disabled:opacity-40">»</button>
                              </div>
                    );
          };

          return (
                    <div className="bg-neutral-950 pt-15 min-h-screen px-4">
                              {loading ? (
                                        <div className="flex justify-center items-center h-screen text-white text-lg animate-pulse">
                                                  <Loader2Icon className='text-white animate-spin' size={35} />
                                        </div>
                              ) : (
                                        <>
                                                  <AzListCard list={list} />
                                                  {totalPages > 1 && renderPagination()}
                                        </>
                              )}
                    </div>
          );
}
