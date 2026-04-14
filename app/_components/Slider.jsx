'use client'

import axios from 'axios';
import { Calendar, Clock, Loader2Icon, MicIcon, Play } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react';
import { BsFillBadgeCcFill } from "react-icons/bs";

export default function Slider() {
          const [spotlights, setSpotlights] = useState([]);
          const [animeId, setAnimeId] = useState('')
          const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
          const [loading, setLoading] = useState(true);
          const [error, setError] = useState(null);
          const router = useRouter();


          const SLIDE_INTERVAL_MS = 5000;



          const getAnimeId = async (id) => {
                    try {
                              const res = await axios.get(`https://anime-api-zeta-hazel.vercel.app/api/episodes/${id}`);
                              const episodes = res.data?.results?.episodes;

                              if (episodes && episodes.length > 0) {
                                        const firstEpisodeId = episodes[0].id;
                                        router.push(`/watch/${id}?ep=${firstEpisodeId}`);
                              } else {
                                        console.warn("No episodes found for anime:", id);
                              }
                    } catch (err) {
                              console.error("Failed to fetch episode ID:", err);
                    }
          };



          const getTopAnimes = useCallback(async () => {
                    try {
                              setLoading(true);
                              const resp = await axios.get("https://anime-api-zeta-hazel.vercel.app/api/");

                              // console.log(resp.data.results.spotlights);


                              if (resp.data.results && resp.data.results.spotlights) {
                                        setSpotlights(resp.data.results.spotlights);

                              } else {
                                        setSpotlights([]);
                              }
                    } catch (err) {
                              console.error("Error fetching top animes:", err);
                              setError("Failed to load anime spotlights. Please try again later.");
                              setSpotlights([]);
                    } finally {
                              setLoading(false);
                    }
          }, []);

          useEffect(() => {
                    getTopAnimes();
          }, [getTopAnimes]);

          useEffect(() => {
                    if (spotlights.length === 0) return;
                    const slideInterval = setInterval(() => {
                              setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % spotlights.length);
                    }, SLIDE_INTERVAL_MS);
                    return () => clearInterval(slideInterval);
          }, [spotlights]);

          const goToNextSlide = () => {
                    if (spotlights.length === 0) return;
                    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % spotlights.length);
          };

          const goToPrevSlide = () => {
                    if (spotlights.length === 0) return;
                    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + spotlights.length) % spotlights.length);
          };

          if (loading) {
                    return (
                              <div className="flex animate-pulse items-center justify-center h-[300px] md:h-[600px] bg-neutral-900 text-white">
                                        {/* <Loader2Icon className='text-white animate-spin' size={35} /> */}
                              </div>
                    )
          }



          // The currentAnime is now determined by the currentSlideIndex
          // The poster will be applied to the background div for each slide
          // All slides will be rendered, but only the current one will be fully visible

          return (
                    <>
                              {!spotlights.length == 0 && <div className="relative w-full h-[300px] md:h-[600px] overflow-hidden bg-neutral-950">
                                        {/* Slide Container */}
                                        <div
                                                  className="relative w-full h-full flex transition-transform duration-700 ease-in-out"
                                                  style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
                                        >
                                                  {spotlights.map((anime, index) => (
                                                            <div key={index} className="w-full flex-shrink-0 relative h-full">
                                                                      <div
                                                                                className="absolute inset-0 bg-cover bg-center"
                                                                                style={{
                                                                                          backgroundImage: `url(${anime.poster})`,
                                                                                          filter: 'brightness(1)',
                                                                                }}
                                                                      ></div>
                                                                      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-0" />

                                                                      {/* Content */}
                                                                      <div className="relative z-10 flex items-center h-full px-6 md:px-16">
                                                                                <div className="max-w-2xl text-white space-y-6">
                                                                                          <p className="text-rose-500 text-sm md:text-lg">#{index + 1} Spotlight</p>
                                                                                          <h1 className="text-xl md:text-5xl font-bold leading-tight">{anime.title}</h1>
                                                                                          <div className='hidden md:block'>
                                                                                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
                                                                                                              {anime?.tvInfo?.showType && <span className='flex items-center gap-1'><Play size={16} /> {anime?.tvInfo?.showType}</span>}
                                                                                                              {anime?.tvInfo?.duration && <span className='flex items-center gap-1'><Clock size={16} />  {anime?.tvInfo?.duration}</span>}
                                                                                                              {anime?.tvInfo?.releaseDate && <span className='flex items-center gap-1'><Calendar size={16} /> {anime?.tvInfo?.releaseDate}</span>}
                                                                                                              {/* {anime?.tvInfo?.quality && <span className="px-1 py-0.5 text-sm bg-[#00e5a0] text-white font-semibold rounded">{anime?.tvInfo?.quality}</span>} */}
                                                                                                              {anime?.tvInfo?.quality?.sub && <span className="bg-rose-500 text-xs px-1 py-0.5 text-white rounded flex items-center gap-1"><BsFillBadgeCcFill size={15} /> {anime?.tvInfo?.quality?.sub}</span>}
                                                                                                              {anime?.tvInfo?.quality?.dub && <span className="text-xs px-1 py-0.5 bg-[#00e5a0] text-white font-semibold rounded flex items-center gap-1"><MicIcon size={15} /> {anime?.tvInfo?.quality?.sub}</span>}
                                                                                                    </div>
                                                                                          </div>
                                                                                          <p className="text-gray-300 text-sm md:text-md line-clamp-3">{anime.description}</p>
                                                                                          <div className="flex gap-4">
                                                                                                    <button className="bg-rose-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-rose-600 cursor-pointer transition duration-300 flex items-center gap-1" onClick={() => getAnimeId(anime?.id)}>
                                                                                                              <Play size={20} /> Watch Now
                                                                                                    </button>
                                                                                                    <Link href={'/' + anime?.id}>
                                                                                                              <button className="border border-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-700 flex items-center gap-2">
                                                                                                                        Detail
                                                                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                                                                                        </svg>
                                                                                                              </button>
                                                                                                    </Link>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  ))}
                                        </div>

                                        {/* Navigation Arrows */}
                                        <div className="absolute right-3 md:right-6 top-4/5 -translate-y-1/2 z-20 flex flex-col gap-3">
                                                  <button
                                                            onClick={goToNextSlide}
                                                            className="bg-gray-800 text-white p-2 flex items-center justify-center md:p-3 rounded-md hover:bg-gray-600 transition"
                                                  >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                            </svg>
                                                  </button>
                                                  <button
                                                            onClick={goToPrevSlide}
                                                            className="bg-gray-800 text-white p-2 flex items-center justify-center md:p-3 rounded-md hover:bg-gray-600 transition"
                                                  >
                                                            <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                            </svg>
                                                  </button>
                                        </div>
                              </div>}
                              {spotlights.length == 0 &&
                                        <div className='w-full h-[300px] md:h-[600px] bg-[#1e1c1d] animate-pulse'>

                                        </div>
                              }
                    </>
          );
}