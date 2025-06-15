'use client'

import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SearchCard from '../_components/SearchCard'
import { Loader2Icon } from 'lucide-react'

export default function Page() {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')
  const pageParam = parseInt(searchParams.get('page') || '1')

  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(pageParam)

  const router = useRouter()

  useEffect(() => {
    setCurrentPage(pageParam)
  }, [pageParam])

  useEffect(() => {
    if (keyword && currentPage) {
      getSearchSuggestions()
    }
  }, [keyword, currentPage])

  const getSearchSuggestions = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        `https://anime-api-zeta-hazel.vercel.app/api/search?keyword=${encodeURIComponent(keyword)}&page=${currentPage}`
      )
      setSearchSuggestions(res.data.results.data)
      setPages(res?.data?.results?.totalPage || 1)
    } catch (error) {
      console.log('Error fetching search suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= pages) {
      router.push(`/search?keyword=${encodeURIComponent(keyword)}&page=${page}`)
    }
  }

  const renderPagination = () => {
    const visiblePages = []
    for (let i = currentPage; i <= Math.min(currentPage + 2, pages); i++) {
      visiblePages.push(i)
    }

    return (
      <div className="flex flex-wrap justify-center gap-2 pt-10 pb-5 bg-[#2d2b2c]">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-red-200 hover:text-black disabled:opacity-40"
        >
          «
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-red-200 hover:text-black disabled:opacity-40"
        >
          ‹
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentPage === page
                ? 'bg-red-200 text-black'
                : 'bg-[#1f1f1f] text-gray-300 hover:bg-red-200 hover:text-black'
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pages}
          className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-red-200 hover:text-black disabled:opacity-40"
        >
          ›
        </button>
        <button
          onClick={() => handlePageChange(pages)}
          disabled={currentPage === pages}
          className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-red-200 hover:text-black disabled:opacity-40"
        >
          »
        </button>
      </div>
    )
  }

  return (
    <div>
      {loading ? (
        <div className='h-screen w-screen flex items-center justify-center'>
          <Loader2Icon className='text-white animate-spin' size={35} />
        </div>
      ) : (
        <div>
          <SearchCard searchSuggestions={searchSuggestions} keyword={keyword} />
          {pages > 1 && renderPagination()}
        </div>
      )}
    </div>
  )
}
