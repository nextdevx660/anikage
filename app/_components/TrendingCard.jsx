'use client'

import Image from "next/image"
import Link from "next/link";
import React from "react"

export default function TrendingCard({ trending }) {
          console.log(trending);

          return (
                    <div className="flex items-center gap-0.5 md:gap-3 mt-5 overflow-x-auto overflow-y-hidden no-scrollbar">
                              {trending &&
                                        trending.map((item, index) => (
                                                  <Link href={item?.id} key={index}>
                                                            <div className="hidden md:block">
                                                                      <div className="grid w-60 h-70 grid-cols-[15%_85%] gap-0.5">

                                                                                {/* LEFT COLUMN */}
                                                                                <div className="h-full flex flex-col items-end justify-end">

                                                                                          {/* TITLE (Vertical) */}
                                                                                          <h1 className="[writing-mode:vertical-lr] rotate-180 text-white font-bold text-xl text-left">
                                                                                                    {item?.title.length > 15
                                                                                                              ? item?.title.slice(0, 15) + "..."
                                                                                                              : item?.title}
                                                                                          </h1>

                                                                                          {/* NUMBER BELOW TITLE */}
                                                                                          <h2 className="text-rose-500 font-bold text-2xl">
                                                                                                    {item?.number}
                                                                                          </h2>

                                                                                </div>

                                                                                {/* RIGHT COLUMN (IMAGE) */}
                                                                                <div className="relative w-full h-full">
                                                                                          <Image
                                                                                                    src={item?.poster}
                                                                                                    alt={item?.title}
                                                                                                    fill
                                                                                                    className="object-cover"
                                                                                          />
                                                                                </div>

                                                                      </div>
                                                            </div>

                                                            <div className="block md:hidden">
                                                                      <div className="relative w-50 h-70">
                                                                                <Image
                                                                                src={item?.poster}
                                                                                alt="posetr"
                                                                                width={500}
                                                                                height={500}
                                                                                className="aspect-3/4 w-50 h-70 object-cover"
                                                                                />
                                                                                <div className="absolute top-0 left-0 bg-white px-2 py-1 aspect-square font-bold">
                                                                                          {item?.number}
                                                                                </div>
                                                                      </div>    
                                                            </div>
                                                  </Link>
                                        ))
                              }
                              {
                                        trending.length == 0 &&
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                                                  <div className="flex-shrink-0 w-50 h-70 bg-neutral-900 animate-pulse" key={index}>
                                                            {/* {item} */}
                                                  </div>
                                        ))
                              }
                    </div>
          )
}
