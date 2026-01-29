'use client'

import Image from "next/image"
import Link from "next/link";
import React from "react"

export default function TrendingCard({ trending }) {

          return (
                    <div className="flex items-center gap-0.5 md:gap-3 mt-5 overflow-x-auto no-scrollbar">
                              {trending &&
                                        trending.map((item, index) => (
                                                  <Link href={item?.id} key={index}>
                                                            <div className="flex-shrink-0 w-40 md:w-50 h-80">
                                                                      <div className="relative">
                                                                                {item?.poster && (
                                                                                          <Image
                                                                                                    src={item?.poster}
                                                                                                    alt={item?.title}
                                                                                                    width={300}
                                                                                                    height={300}
                                                                                                    className="w-40 md:w-60 aspect-[3/4]"
                                                                                          />
                                                                                )}
                                                                                <h2 className="absolute font-bold text-black text-xl left-0 bg-white top-0 p-1 md:text-green-200 md:top-2 md:left-2 md:bg-transparent">#{item?.number}</h2>
                                                                      </div>
                                                                      <h2 className="text-white font-bold hidden md:block">{(item?.title).slice(0, 17)}...</h2>
                                                            </div>
                                                  </Link>
                                        ))
                              }
                              {
                                        trending.length == 0 &&
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                                                  <div className="flex-shrink-0 w-50 h-80 bg-[#1e1c1d] animate-pulse" key={index}>
                                                            {item}
                                                  </div>
                                        ))
                              }
                    </div>
          )
}
