'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import TopTenTabs from './topTen';

export default function Genre() {
          const [genres, setGenres] = useState([]);
          const [related, setRelated] = useState([])

          // Define an array of Tailwind CSS text colors
          // These will be applied to the text of the buttons.
          const textColors = [
                    'text-green-200', 'text-blue-200', 'text-green-200', 'text-purple-200',
                    'text-yellow-200', 'text-pink-200', 'text-indigo-200', 'text-teal-200',
                    'text-orange-200', 'text-cyan-200', 'text-lime-200', 'text-fuchsia-200' // Added more for variety
          ];

          useEffect(() => {
                    getLatestEp();
          }, []);

          // Function to fetch genre data from the API
          const getLatestEp = async () => {
                    try {
                              const res = await axios.get('https://anime-api-zeta-hazel.vercel.app/api/');
                              


                              if (res?.data?.results?.genres) {
                                        setGenres(res.data.results.genres);
                              } else {
                                        console.error("API response did not contain expected genre data.");
                              }
                    } catch (error) {

                    }
          };


          return (
                    <div className='mt-6 py-2 md:w-[70vw] flex flex-col'>
                              <div className='bg-[#454243] p-2'>
                                        <h2 className='text-2xl text-green-200 font-bold mb-2 px-3'>Genres</h2>
                                        <div className="flex flex-wrap gap-2 px-3"> {/* Added flex-wrap and gap for better layout */}
                                                  {genres.map((item, index) => (
                                                            // Dynamically apply a text color from the 'textColors' array
                                                            // while keeping a consistent background color.
                                                            <Link href={'/genres/' + item} key={index}>
                                                                      <button
                                                                                className={`px-3 py-1 bg-[#5a5a5a] ${textColors[index % textColors.length]} rounded-md shadow-sm hover:bg-[#828282] transition-colors duration-200`}
                                                                      >
                                                                                {item}
                                                                      </button>
                                                            </Link>
                                                  ))}
                                        </div>
                              </div>
                              <div className='mt-5'>
                                                  <TopTenTabs />
                              </div>
                    </div>
          );
}
