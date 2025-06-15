'use client'

import axios from 'axios'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function SearchInput() {
          const router = useRouter()
          const [keyword, setKeyword] = useState('')
          const [suggestions, setSuggestions] = useState([])

          // Debounce for search input
          useEffect(() => {
                    const delayDebounce = setTimeout(() => {
                              if (keyword.trim() !== '') {
                                        getSearchSuggestions()
                              } else {
                                        setSuggestions([])
                              }
                    }, 500)

                    return () => clearTimeout(delayDebounce)
          }, [keyword])

          // API call for suggestions
          const getSearchSuggestions = async () => {
                    try {
                              const res = await axios.get(
                                        `https://anime-api-zeta-hazel.vercel.app/api/search/suggest?keyword=${keyword}`
                              )
                              setSuggestions(res?.data?.results || [])
                    } catch (error) {
                              console.error('Error fetching suggestions:', error)
                    }
          }

          // Navigate on suggestion click
          const handleSuggestionClick = (id) => {
                    if (id) {
                              router.push(`/${id}`)
                              setKeyword('')
                              setSuggestions([])
                    }
          }

          // ✅ Handle Enter key press
          const handleKeyDown = (e) => {
                    if (e.key === 'Enter' && keyword.trim() !== '') {
                              router.push(`/search?keyword=${keyword}`)
                              setKeyword('')
                              setSuggestions([])
                    }
          }

          return (
                    <div>
                              <div>
                                        <div className="bg-white px-3 py-2 flex items-center gap-2 w-screen md:w-[400px]">
                                                  <input
                                                            type="text"
                                                            name="search"
                                                            id="search"
                                                            className="border-0 outline-none w-full text-sm placeholder-gray-500"
                                                            placeholder="Search"
                                                            value={keyword}
                                                            onChange={(e) => setKeyword(e.target.value)}
                                                            onKeyDown={handleKeyDown} // 👈 Added handler
                                                  />
                                                  <Search size={20} className="cursor-pointer text-gray-600" />
                                                  <button className="bg-[#2d2b2c]/80 rounded text-white px-2 py-1 text-xs hover:bg-[#2d2b2c] transition">
                                                            <Link href={'/filter'}>
                                                                      Filter
                                                            </Link>
                                                  </button>
                                        </div>
                              </div>

                              {/* Suggestions Dropdown */}
                              {suggestions.length > 0 && (
                                        <div className="absolute w-screen md:w-[400px] bg-[#2d2b2c] shadow-lg z-10">
                                                  {suggestions.map((sug, index) => (
                                                            <div
                                                                      key={index}
                                                                      className="px-3 py-2 hover:bg-[#3c3a3b] cursor-pointer text-sm text-gray-700 border-b-1 border-dashed"
                                                                      onClick={() => handleSuggestionClick(sug?.id)}
                                                            >
                                                                      <div className='flex items-start justify-start gap-3'>
                                                                                <div>
                                                                                          <Image
                                                                                                    src={sug?.poster}
                                                                                                    alt='poster'
                                                                                                    width={200}
                                                                                                    height={200}
                                                                                                    className='w-13 h-20'
                                                                                          />
                                                                                </div>
                                                                                <div className='grid gap-1'>
                                                                                          <h2 className='text-white text-lg font-semibold hover:text-amber-200'>
                                                                                                    {sug?.title.length <= 30 ? sug?.title : `${sug?.title.slice(0, 30)}...`}
                                                                                          </h2>
                                                                                          <h2 className='text-gray-400 text-sm'>
                                                                                                    {sug?.japanese_title.length <= 30
                                                                                                              ? sug?.japanese_title
                                                                                                              : `${sug?.japanese_title.slice(0, 30)}...`}
                                                                                          </h2>
                                                                                          <div className='flex items-center gap-2'>
                                                                                                    <h2 className='text-gray-400 text-sm'>{sug?.releaseDate}</h2>
                                                                                                    <h2 className='text-gray-400 text-md'>•</h2>
                                                                                                    <h2 className='text-white text-sm'>{sug?.showType}</h2>
                                                                                                    <h2 className='text-gray-400 text-md'>•</h2>
                                                                                                    <h2 className='text-gray-400 text-sm'>{sug?.duration}</h2>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  ))}
                                                  <Link href={`/search?keyword=${keyword}`}>
                                                            <div className='bg-amber-200 px-2 py-4 flex items-center justify-center'>
                                                                      <h2 className='flex items-center gap-1'>
                                                                                View All Results
                                                                                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#1f1f1f">
                                                                                          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                                                                                </svg>
                                                                      </h2>
                                                            </div>
                                                  </Link>
                                        </div>
                              )}
                    </div>
          )
}
