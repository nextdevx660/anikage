'use client'

import axios from 'axios';
import { Mic, Play, Plus, Share2, Twitter, Facebook, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import RecomendedCard from '../_components/RecomendedCard';
import Genre from '../_components/Genre';
import { useAuth } from '../_context/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Page() {
          const [animeData, setAnimeData] = useState(null);
          const [episodesId, setEpisodesId] = useState(null);
          const [recomended, setRecomended] = useState([])
          const { user } = useAuth()
          const params = useParams();


          const handleSetWishlist = async (e) => {
                    e.preventDefault();

                    if (!user?.uid) {
                              console.log("User not logged in.");
                              return;
                    }

                    const animeToAdd = { id: params.id };

                    try {
                              const docRef = doc(db, "anilook_users", user.uid);
                              await updateDoc(docRef, {
                                        wishlist: arrayUnion(animeToAdd),
                              });

                    } catch (error) {
                              console.error("❌ Error adding to wishlist:", error);
                    }
          };

          useEffect(() => {
                    if (params.id) {
                              getAnimeInfo();
                              getEpisodesId();
                    }
          }, [params.id]);

          const getEpisodesId = async () => {
                    try {
                              const res = await axios.get(`https://anime-api-zeta-hazel.vercel.app/api/episodes/${params.id}`);
                              // Asumiendo que quieres el primer episodio para el botón "Watch Now"
                              setEpisodesId(res?.data?.results?.episodes[0]?.id);
                    } catch (error) {
                              console.error("Error fetching episodes:", error);
                    }
          };

          const getAnimeInfo = async () => {
                    try {
                              const res = await axios.get(`https://anime-api-zeta-hazel.vercel.app/api/info?id=${params.id}`);
                              setAnimeData(res.data.results.data);
                              setRecomended(res.data.results.data?.recommended_data)
                    } catch (error) {
                              console.error("Error fetching anime info:", error);
                    }
          };

          // Un componente de esqueleto para mostrar mientras se cargan los datos
          if (!animeData) {
                    return <div className="bg-[#181818] min-h-screen flex items-center justify-center text-white"><Loader2Icon className='text-white animate-spin' size={35} /></div>;
          }

          // Datos extraídos para facilitar el acceso
          const {
                    title,
                    poster,
                    overview,
                    japanese_title,
                    synonyms,
                    animeInfo
          } = animeData;
          const {
                    rating,
                    quality,
                    sub,
                    dub,
                    showType,
                    duration
          } = animeInfo?.tvInfo || {};
          const {

                    Premiered,
                    status,
                    studios,
                    genres,
                    producers
          } = animeInfo || {};


          return (
                    <div className='relative min-h-screen w-full bg-[#2d2b2c] pt-10'>
                              {/* Imagen de Fondo con Desenfoque */}
                              <div className='absolute inset-0 h-[70vh]'>
                                        <Image
                                                  src={poster}
                                                  alt="Background"
                                                  fill
                                                  className='object-cover object-center z-0 opacity-20 blur-md'
                                        />
                                        <div className='absolute inset-0 z-10' />
                              </div>

                              {/* Contenedor Principal */}
                              <div className='relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10'>
                                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 text-white'>

                                                  {/* --- Contenido Principal (Izquierda) --- */}
                                                  <div className='lg:col-span-8'>
                                                            <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
                                                                      {/* Poster */}
                                                                      <div className='relative w-40 md:w-50 flex-shrink-0'>
                                                                                {animeData?.adultContent == true ? <h2 className='bg-green-300 px-1 py-0.5 rounded-md text-white absolute top-2 left-2'>18+</h2> : ''}
                                                                                <Image
                                                                                          src={poster}
                                                                                          alt={`${title} Poster`}
                                                                                          width={225}
                                                                                          height={320}
                                                                                          className='shadow-lg'
                                                                                />
                                                                      </div>

                                                                      {/* Detalles del Anime */}
                                                                      <div className='flex flex-col items-center md:items-start text-center md:text-left gap-3'>
                                                                                <h1 className='text-2xl md:text-4xl font-bold'>{title}</h1>

                                                                                {/* Etiquetas de Información */}
                                                                                <div className='flex flex-wrap items-center justify-center md:justify-start text-xs gap-2'>
                                                                                          <div className='gap-0.5 flex items-center'>
                                                                                                    {rating && <span className='bg-white text-black px-2 py-0.5 rounded-tl-sm rounded-bl-sm'>{rating}</span>}
                                                                                                    {quality && <span className='bg-green-200 text-black px-2 py-0.5'>{quality}</span>}
                                                                                                    {sub && <span className='bg-green-200 text-black px-2 py-0.5'>{sub} SUB</span>}
                                                                                                    {dub && <span className='bg-purple-200 text-black px-2 py-0.5 flex items-center gap-1'><Mic size={14} /> {dub} DUB</span>}
                                                                                          </div>
                                                                                          <span className='text-gray-400'>•</span>
                                                                                          <span className='text-white text-sm'>{showType}</span>
                                                                                          <span className='text-gray-400'>•</span>
                                                                                          <span className='text-white text-sm'>{duration}</span>
                                                                                </div>

                                                                                {/* Botones de Acción */}
                                                                                <div className='flex items-center gap-3 mt-2'>
                                                                                          {episodesId && (
                                                                                                    <Link href={`/watch/${episodesId}`}>
                                                                                                              <button className='bg-green-200 text-black rounded-full px-6 py-2.5 flex items-center gap-2 hover:bg-green-200 transition-colors'>
                                                                                                                        <Play size={18} /> Watch now
                                                                                                              </button>
                                                                                                    </Link>
                                                                                          )}
                                                                                          {user ?
                                                                                                    <button className='bg-white text-black rounded-full px-5 py-2.5 flex items-center gap-2 hover:bg-gray-100 transition-colors' onClick={handleSetWishlist}>
                                                                                                              <Plus size={20} /> Add to List
                                                                                                    </button> :
                                                                                                    <button className='bg-white text-black rounded-full px-5 py-2.5 flex items-center gap-2 hover:bg-gray-100 transition-colors'>
                                                                                                              <Plus size={20} /> Add to List
                                                                                                    </button>
                                                                                          }
                                                                                </div>





                                                                                {/* Sinopsis y Compartir */}
                                                                                <div className='text-gray-300 hidden md:block mt-5'>
                                                                                          <p className='text-sm leading-relaxed text-white'>{animeData?.animeInfo?.Overview}</p>
                                                                                          <p className='text-sm text-gray-200 mt-5'>AniWatch is the best site to watch <span className='text-white'>{title}</span> SUB online, or you can even watch <span className='font-semibold text-white'>{title}</span> DUB in HD quality. You can also find <span className='font-semibold text-white'>{studios}</span> anime on AniWatch website.</p>

                                                                                          {/* Compartir */}
                                                                                          <div className='flex items-center gap-4 pt-4'>
                                                                                                    <Image src="/share.gif" alt="your avatar" width={60} height={60} className="rounded-full border border-white" />
                                                                                                    <div className='flex items-center gap-2'>
                                                                                                              <h2 className='text-md text-white'><span className='text-green-200 font-semibold'>Share Anime</span> to your friends</h2>
                                                                                                              <button className='bg-[#1da1f2] p-2 rounded-full hover:opacity-90'><Twitter size={16} /></button>
                                                                                                              <button className='bg-[#1877f2] p-2 rounded-full hover:opacity-90'><Facebook size={16} /></button>
                                                                                                              <button className='bg-green-500 p-2 rounded-full hover:opacity-90'><Share2 size={16} /></button>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>


                                                  </div>

                                                  {/* --- Barra Lateral de Información (Derecha) --- */}
                                                  <div className='lg:col-span-4 bg-[#2d2b2c]/60 p-4 rounded-lg h-fit'>
                                                            <div className='space-y-3 text-sm'>
                                                                      <div className="max-h-30 overflow-y-auto block md:hidden text-white">
                                                                                <p className="font-light">
                                                                                          <span className="font-semibold">Overview</span> {animeData?.animeInfo?.Overview}
                                                                                </p>
                                                                      </div>

                                                                      <p className='font-light'><span className='font-semibold'>Japanese:</span> {japanese_title}</p>
                                                                      <p className='font-light'><span className='font-semibold'>Synonyms:</span> {synonyms}</p>
                                                                      <p className='font-light'><span className='font-semibold'>Aired:</span> {animeData?.animeInfo?.Aired}</p>
                                                                      <p className='font-light'><span className='font-semibold'>Premiered:</span> {Premiered}</p>
                                                                      <p className='font-light'><span className='font-semibold'>Duration:</span> {duration}</p>
                                                                      <p className='font-light'><span className='font-semibold'>Status:</span> {animeData?.animeInfo?.Status}</p>
                                                                      <p className='font-light'><span className='font-semibold'>MAL Score:</span> {animeInfo?.malscore || 'N/A'}</p>
                                                                      <hr className='h-0.5 bg-gray-900' />
                                                                      <div className=' flex items-start gap-2'>
                                                                                <h3 className='font-semibold mb-2'>Genres:</h3>
                                                                                <div className='flex flex-wrap gap-2'>
                                                                                          {animeData?.animeInfo?.Genres.map((genre, index) => (
                                                                                                    <span key={index} className='bg-transparent border text-gray-200 text-xs px-3 py-1 rounded-full'>{genre}</span>
                                                                                          ))}
                                                                                </div>
                                                                      </div>

                                                                      <p className='pt-2'><span className='font-semibold'>Studios:</span> {animeData?.animeInfo?.Studios}</p>
                                                                      <p><span className='font-semibold'>Producers:</span> {animeData?.animeInfo?.Producers?.join(', ')}</p>
                                                            </div>
                                                  </div>
                                        </div>
                              </div>
                              <div className='px-3 md:flex'>
                                        <div>
                                                  <h2 className='text-2xl font-semibold text-green-200 mt-10'>Recomended for You</h2>
                                                  <RecomendedCard recomended={recomended} />
                                        </div>
                                        <Genre />

                              </div>
                    </div>
          );
}
