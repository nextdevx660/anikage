import Image from 'next/image'
import React from 'react'

export default function CANDV({ animeData }) {
          return (
                    <div>
                              {animeData?.charactersVoiceActors.length >0  &&<h2 className='text-2xl font-semibold text-rose-500 mt-5 mb-5'>Characters And Voice Actor</h2>}
                              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mr-3'>
                                        {animeData?.charactersVoiceActors.slice(0, 6)?.map((item, idx) => {
                                                  const actor = item?.voiceActors?.[0];

                                                  return (
                                                            <div key={idx} className='bg-neutral-800 p-4 flex items-center justify-between'>

                                                                      {/* Character */}
                                                                      <div className='flex items-center gap-2'>
                                                                                <Image
                                                                                          src={item?.character?.poster || "/fallback.jpg"}
                                                                                          alt={item?.character?.name || "character"}
                                                                                          width={500}
                                                                                          height={500}
                                                                                          className='rounded-full w-12 h-12 object-cover'
                                                                                />
                                                                                <div className='flex flex-col items-start'>
                                                                                          <p className='text-white text-sm'>{item?.character?.name}</p>
                                                                                          <p className='text-sm text-gray-400'>{item?.character?.cast}</p>
                                                                                </div>
                                                                      </div>

                                                                      {/* Voice Actor */}
                                                                      {actor ? (
                                                                                <div className='flex items-center gap-2'>
                                                                                          <div className='flex flex-col items-end'>
                                                                                                    <p className='text-white text-sm'>{actor.name}</p>
                                                                                                    <p className='text-sm text-gray-400'>{actor.language || 'Japanese'}</p>
                                                                                          </div>
                                                                                          <Image
                                                                                                    src={actor.poster || "/fallback.jpg"}
                                                                                                    alt={actor.name || "actor"}
                                                                                                    width={500}
                                                                                                    height={500}
                                                                                                    className='rounded-full w-12 h-12 object-cover'
                                                                                          />
                                                                                </div>
                                                                      ) : (
                                                                                <p className='text-gray-500 text-sm'>No VA</p>
                                                                      )}

                                                            </div>
                                                  );
                                        })}
                              </div>
                    </div>
          )
}
