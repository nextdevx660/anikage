// File: app/filter/page.jsx

'use client';

import React, { useState, useEffect } from 'react';
import {
          Select,
          SelectContent,
          SelectItem,
          SelectTrigger,
          SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import FilterCard from '../_components/FilterCard';
import { Loader2Icon } from 'lucide-react';

const genres = [
          { id: 1, name: "Action" }, { id: 2, name: "Adventure" }, { id: 3, name: "Cars" },
          { id: 4, name: "Comedy" }, { id: 5, name: "Dementia" }, { id: 6, name: "Demons" },
          { id: 8, name: "Drama" }, { id: 9, name: "Ecchi" }, { id: 10, name: "Fantasy" },
          { id: 11, name: "Game" }, { id: 35, name: "Harem" }, { id: 13, name: "Historical" },
          { id: 14, name: "Horror" }, { id: 44, name: "Isekai" }, { id: 43, name: "Josei" },
          { id: 15, name: "Kids" }, { id: 16, name: "Magic" }, { id: 17, name: "Martial Arts" },
          { id: 18, name: "Mecha" }, { id: 38, name: "Military" }, { id: 19, name: "Music" },
          { id: 7, name: "Mystery" }, { id: 20, name: "Parody" }, { id: 39, name: "Police" },
          { id: 40, name: "Psychological" }, { id: 22, name: "Romance" }, { id: 21, name: "Samurai" },
          { id: 23, name: "School" }, { id: 24, name: "Sci-Fi" }, { id: 42, name: "Seinen" },
          { id: 25, name: "Shoujo" }, { id: 26, name: "Shoujo Ai" }, { id: 27, name: "Shounen" },
          { id: 28, name: "Shounen Ai" }, { id: 36, name: "Slice of Life" }, { id: 29, name: "Space" },
          { id: 30, name: "Sports" }, { id: 31, name: "Super Power" }, { id: 37, name: "Supernatural" },
          { id: 41, name: "Thriller" }, { id: 32, name: "Vampire" }
];

const createOptions = (items) => items.map(i => ({ name: i, value: i.toLowerCase().replace(/ /g, '_') }));

const typeOptions = createOptions(['All', 'TV', 'Movie', 'OVA', 'ONA', 'Special', 'Music']);
const statusOptions = createOptions(['All', 'Finished Airing', 'Currently Airing', 'Not yet aired']);
const ratedOptions = createOptions(['All', 'G - All Ages', 'PG - Children', 'PG-13', 'R - 17+', 'R+ - Mild Nudity', 'Rx - Hentai']);
const scoreOptions = createOptions(['All', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1']);
const seasonOptions = createOptions(['All', 'Spring', 'Summer', 'Fall', 'Winter']);
const languageOptions = createOptions(['All', 'Sub', 'Dub']);
const sortOptions = createOptions(['Default', 'Popularity', 'Rating', 'Newest', 'Oldest']);

export default function FilterPage() {
          const router = useRouter();
          const searchParams = useSearchParams();
          const [list, setAnimeList] = useState([]);
          const [totalPages, setTotalPages] = useState(1);
          const [loading, setLoading] = useState(false);

          const currentPage = parseInt(searchParams.get('page') || '1');
          const [type, setType] = useState(searchParams.get('type') || 'all');
          const [status, setStatus] = useState(searchParams.get('status') || 'all');
          const [rated, setRated] = useState(searchParams.get('rated') || 'all');
          const [score, setScore] = useState(searchParams.get('score') || 'all');
          const [season, setSeason] = useState(searchParams.get('season') || 'all');
          const [language, setLanguage] = useState(searchParams.get('language') || 'all');
          const [sort, setSort] = useState(searchParams.get('sort') || 'default');
          const [selectedGenres, setSelectedGenres] = useState(searchParams.get('genres')?.split(',').map(Number) || []);

          useEffect(() => {
                    const params = {};
                    searchParams.forEach((v, k) => { params[k] = v });

                    const fetchData = async () => {
                              try {
                                        setLoading(true);
                                        const res = await axios.get('https://anime-api-zeta-hazel.vercel.app/api/filter', { params });
                                        setAnimeList(res.data?.results?.data || []);
                                        setTotalPages(res.data?.results?.totalPage);
                              } catch (error) {
                                        console.error(error);
                              } finally {
                                        setLoading(false);
                              }
                    };

                    fetchData();
          }, [searchParams, currentPage]);

          const handleFilter = () => {
                    const params = {
                              type: type !== 'all' ? type : undefined,
                              status: status !== 'all' ? status : undefined,
                              rated: rated !== 'all' ? rated : undefined,
                              score: score !== 'all' ? score : undefined,
                              season: season !== 'all' ? season : undefined,
                              language: language !== 'all' ? language : undefined,
                              genres: selectedGenres.length ? selectedGenres.join(',') : undefined,
                              sort: sort !== 'default' ? sort : undefined,
                              page: currentPage,
                    };

                    const query = Object.entries(params)
                              .filter(([_, v]) => v)
                              .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
                              .join('&');

                    router.push(`/filter?${query}`);
          };

          const handlePageChange = (page) => {
                    if (page !== currentPage && page >= 1 && page <= totalPages) {
                              const params = new URLSearchParams(searchParams.toString());
                              params.set('page', page);
                              router.push(`/filter?${params.toString()}`);
                    }
          };


          const handleGenreToggle = (id) => {
                    setSelectedGenres(prev =>
                              prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
                    );
          };

          const renderPagination = () => {
                    const visiblePages = [];
                    for (let i = currentPage; i <= Math.min(currentPage + 2, totalPages); i++) {
                              visiblePages.push(i);
                    }

                    return (
                              <div className="flex flex-wrap justify-center gap-2 pt-10 pb-5 bg-neutral-950">
                                        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}
                                                  className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-rose-500 hover:text-white disabled:opacity-40">«</button>
                                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                                                  className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-rose-500 hover:text-white disabled:opacity-40">‹</button>

                                        {visiblePages.map((page) => (
                                                  <button key={page} onClick={() => handlePageChange(page)}
                                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentPage === page
                                                                      ? 'bg-rose-500 text-white'
                                                                      : 'bg-[#1f1f1f] text-gray-300 hover:bg-rose-500 hover:text-white'
                                                                      }`}>
                                                            {page}
                                                  </button>
                                        ))}

                                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}
                                                  className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-rose-500 hover:text-white disabled:opacity-40">›</button>
                                        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}
                                                  className="w-8 h-8 rounded-full bg-[#1f1f1f] text-white hover:bg-rose-500 hover:text-white disabled:opacity-40">»</button>
                              </div>
                    );
          };


          return (
                    <div className="pt-15 md:px-10">
                              <div className='px-5 md:px-10 py-3 bg-[#454243] md:rounded-md mb-10 mt-10'>
                                        <div className="flex flex-wrap gap-2 mb-5">
                                                  <FilterSelect label="Type" value={type} onValueChange={setType} options={typeOptions} />
                                                  <FilterSelect label="Status" value={status} onValueChange={setStatus} options={statusOptions} />
                                                  <FilterSelect label="Rated" value={rated} onValueChange={setRated} options={ratedOptions} />
                                                  <FilterSelect label="Score" value={score} onValueChange={setScore} options={scoreOptions} />
                                                  <FilterSelect label="Season" value={season} onValueChange={setSeason} options={seasonOptions} />
                                                  <FilterSelect label="Language" value={language} onValueChange={setLanguage} options={languageOptions} />
                                                  <FilterSelect label="Sort" value={sort} onValueChange={setSort} options={sortOptions} />
                                        </div>

                                        <div className="mb-5">
                                                  <h3 className="text-lg text-white font-semibold mb-2">Genres</h3>
                                                  <div className="flex flex-wrap gap-2">
                                                            {genres.map((genre, idx) => (
                                                                      <Button
                                                                                key={idx}
                                                                                onClick={() => handleGenreToggle(genre.id)}
                                                                                className={`text-sm ${selectedGenres.includes(genre.id) ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-neutral-800  hover:bg-neutral-900 text-white'}`}
                                                                      >
                                                                                {genre.name}
                                                                      </Button>
                                                            ))}
                                                  </div>
                                        </div>

                                        <Button onClick={handleFilter} className='mt-2 mb-5 md:mt-4 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3'>
                                                  Apply Filters
                                        </Button>
                              </div>

                              {loading ? (
                                        <div className="flex justify-center items-center mt-10">
                                                  <Loader2Icon className="h-10 w-10 animate-spin text-rose-500" />
                                        </div>
                              ) : (
                                        <div>
                                                  <h2 className='text-2xl text-rose-500 font-semibold px-3 mb-2'>Filter Results</h2>
                                                  <FilterCard list={list} />

                                                  {totalPages > 1 && (
                                                            renderPagination()
                                                  )}
                                        </div>
                              )}
                    </div>
          );
}

const FilterSelect = ({ label, value, onValueChange, options }) => (
          <div className="flex flex-wrap gap-1">
                    <Select value={value} onValueChange={onValueChange}>
                              <SelectTrigger className="bg-[#383536] border-gray-500 text-rose-500">
                                        <div className='flex items-center gap-3'>
                                                  {label && <Label className="text-white text-sm">{label}</Label>}
                                                  <SelectValue placeholder="Select" />
                                        </div>
                              </SelectTrigger>
                              <SelectContent className="bg-[#454243] border-gray-500 text-white">
                                        {options.map(opt => (
                                                  <SelectItem key={opt.value} value={opt.value}>{opt.name}</SelectItem>
                                        ))}
                              </SelectContent>
                    </Select>
          </div>
);
