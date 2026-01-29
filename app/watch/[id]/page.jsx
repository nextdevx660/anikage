'use client'

import Genre from '@/app/_components/Genre'
import RecomendedCard from '@/app/_components/RecomendedCard'
import axios from 'axios'
import { Mic, PlayCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [streamingUrl, setStreamingUrl] = useState('')
  const [episodes, setEpisodes] = useState([])
  const params = useParams()
  const searchParams = useSearchParams()
  const [animeData, setAnimeData] = useState(null);
  const [recomended, setRecomended] = useState([])
  const [episodeId, setEpisodeId] = useState()


  const ep = searchParams.get('ep') || ''
  const id = params?.id || '';



  useEffect(() => {
    if (id && ep) {
      const url = `https://gogoanime.me.uk/newplayer.php?id=${id}?ep=${ep}&type=hd-1&category=sub`
      setStreamingUrl(url)
      setEpisodeId(`${id}?ep=${ep}`) // Update current playing episodeId
    }
  }, [id, ep])

  const getEpisodes = async () => {
    try {
      const res = await axios.get(`https://anime-api-zeta-hazel.vercel.app/api/episodes/${params.id}`);
      setEpisodes(res?.data?.results?.episodes);
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


 

  useEffect(() => {
    getEpisodes()
    getAnimeInfo()
  }, [])



  const bgColors = [
    'bg-[#2d2b2c]', 'bg-[#1e1c1d]'
  ]

  return (
    <div className='bg-[#2d2b2c]'>
      <div className="bg-[#2d2b2c] grid grid-cols-1 md:grid-cols-5 pt-20 w-full gap-0 md:gap-0 items-start">
        {/* Streaming Video - Mobile me sabse upar, desktop me center */}
        <div className="order-1 md:order-2 md:col-span-3">
          <div>
            {streamingUrl && (
              <div className="overflow-hidden aspect-video w-full max-w-full h-full">
                <iframe
                  src={streamingUrl}
                  scrolling="no"
                  className="w-full h-full border-none"
                  allowFullScreen
                  sandbox="allow-same-origin allow-scripts"
                ></iframe>
              </div>
            )}
          </div>
        </div>

        {/* Episodes List - Mobile me middle, desktop me left */}
        <div className="bg-black order-2 md:order-1 md:col-span-1">
          <h2 className='text-white text-lg p-2 font-semibold'>List of Episodes:</h2>

          <div className='overflow-y-auto h-[480px] no-scrollbar'>
            {episodes &&
              episodes.map((item, index) => (
                <Link href={`${item?.id}`} key={index}>
                  <div
                    className={`${episodeId !== item?.id
                      ? `flex items-center justify-between ${bgColors[index % 2]} px-4 py-2 cursor-pointer hover:bg-[#3a3738]`
                      : `flex items-center justify-between bg-gray-200/50 text-green-200 px-4 py-2 cursor-pointer hover:bg-[#3a3738] border-l-4 border-green-200`
                      }`}
                  >
                    <div className='flex items-center gap-5'>
                      <h2 className='text-gray-200 text-md'>{item?.episode_no}</h2>
                      <h2 className='text-gray-200 text-md'>{item?.title}</h2>
                    </div>
                    {episodeId == item?.id && (
                      <div>
                        <PlayCircle className='text-green-200' />
                      </div>
                    )}
                  </div>
                </Link>
              ))}
          </div>
        </div>



        {/* Details - Mobile me last, desktop me right */}
        <div className="order-3 md:order-3 md:col-span-1 bg-black/20 backdrop-blur-2xl">
          <div className='text-white p-4'>
            {animeData &&
              <div>
                <div className='flex md:flex-col gap-3'>
                  <div className='relative'>
                    {animeData?.adultContent == true ? <h2 className='bg-green-300 px-1 py-0.5 rounded-md text-white absolute top-2 left-2'>18+</h2> : ''}
                    {animeData?.poster && <Image src={animeData?.poster} alt={animeData?.title} width={500} height={500} className='w-25 md:w-30' />}
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-xl text-white font-semibold'>{animeData?.title}</h2>
                    <div className='flex flex-wrap items-center justify-center md:justify-start text-xs gap-2'>
                      <div className='gap-0.5 flex items-center'>
                        {animeData?.animeInfo?.tvInfo?.rating && <span className='bg-white text-black px-2 py-0.5 rounded-tl-sm rounded-bl-sm'>{animeData?.animeInfo?.tvInfo?.rating}</span>}
                        {animeData?.animeInfo?.tvInfo?.quality && <span className='bg-green-200 text-black px-2 py-0.5'>{animeData?.animeInfo?.tvInfo?.quality}</span>}
                        {animeData?.animeInfo?.tvInfo?.sub && <span className='bg-green-200 text-black px-2 py-0.5'>{animeData?.animeInfo?.tvInfo?.sub}</span>}
                        {animeData?.animeInfo?.tvInfo?.dub && <span className='bg-purple-200 text-black px-2 py-0.5 flex items-center gap-1'><Mic size={14} /> {animeData?.animeInfo?.tvInfo?.dub}</span>}
                      </div>
                      <span className='text-gray-400'>•</span>
                      <span className='text-white text-sm'>{animeData?.showType}</span>
                      <span className='text-gray-400'>•</span>
                      <span className='text-white text-sm'>{animeData?.animeInfo?.Duration}</span>
                    </div>

                  </div>
                </div>
                <div className="max-h-30 overflow-y-auto text-white mt-5 no-scrollbar">
                  {animeData?.animeInfo?.Overview ?
                    <p className="font-light">
                      <span className="font-semibold">Overview: </span> {animeData?.animeInfo?.Overview}
                    </p> :
                    <p className='text-green-200'>Overview is not available</p>
                  }
                </div>
                <p className='text-sm text-gray-200 mt-5'>AniLook is the best site to watch <span className='text-white'>{animeData?.title}</span> SUB online, or you can even watch <span className='font-semibold text-white'>{animeData?.title}</span> DUB in HD quality. You can also find <span className='font-semibold text-white'>{animeData?.animeInfo?.Studios}</span> anime on AniLook website.</p>
              </div>
            }
          </div>
        </div>


      </div>
      <div className='md:flex'>
        <div className='px-3'>
          <h2 className='text-2xl font-semibold text-green-200 mt-10'>Recomended for You</h2>
          <RecomendedCard recomended={recomended} />
        </div>
        <Genre />
      </div>
    </div>

  )
}
