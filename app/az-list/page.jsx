'use client'

import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AzListCard from '../_components/AzListCard'
import { Loader2Icon } from 'lucide-react'

export default function Page() {
  const [list, setList] = useState([])
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(true) // 🔹 Loading state

  const searchParams = useSearchParams()
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1')
    setCurrentPage(page)
  }, [searchParams])

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true) // Start loading 🔄
        const res = await axios.get(`https://anime-api-zeta-hazel.vercel.app/api/az-list?page=${currentPage}`)
        setList(res?.data?.results?.data || [])
        setPages(res?.data?.results?.totalPages || 1)
      } catch (err) {
        console.error("Failed to fetch data:", err)
      } finally {
        setLoading(false) // Stop loading ✅
      }
    }

    getData()
  }, [currentPage])

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= pages) {
      router.push(`/az-list?page=${page}`)
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
          className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-green-200 hover:text-black disabled:opacity-40"
        >
          «
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-green-200 hover:text-black disabled:opacity-40"
        >
          ‹
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentPage === page
                ? 'bg-green-200 text-black'
                : 'bg-[#1f1f1f] text-gray-300 hover:bg-green-200 hover:text-black'
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pages}
          className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-green-200 hover:text-black disabled:opacity-40"
        >
          ›
        </button>
        <button
          onClick={() => handlePageChange(pages)}
          disabled={currentPage === pages}
          className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-green-200 hover:text-black disabled:opacity-40"
        >
          »
        </button>
      </div>
    )
  }

  return (
    <div className="bg-[#2d2b2c] min-h-screen px-4 pt-15">
      {loading ? (
        <div className="flex justify-center items-center h-screen text-white text-lg font-semibold animate-pulse">
          <Loader2Icon className='text-white animate-spin' size={35} />
        </div>
      ) : (
        <>
          <AzListCard list={list} />
          {pages > 1 && renderPagination()}
        </>
      )}
    </div>
  )
}
