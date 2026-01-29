'use client'



import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TrendingCard from './TrendingCard'

export default function TrendingAnime() {
          const [trending, setTrending] = useState([])
          useEffect(() => {
                    getTrendingAnime()
          }, [])
          const getTrendingAnime = async () => {
                    const res = await axios.get('https://anime-api-zeta-hazel.vercel.app/api/')
                    setTrending(res?.data?.results?.trending);
                    
          }
          return (
                    <div className='px-4 py-6 bg-[#2d2b2c]'>
                              <h2 className='text-green-200 font-bold text-2xl'>Trending</h2>
                              <TrendingCard trending={trending} />
                    </div>
          )
}
