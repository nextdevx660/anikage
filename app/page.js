'use client'

import AdsBanner from "./_components/AdsBanner";
// import AdsBanner300x250 from "./_components/AdsBanner300x250";
import AnilookBanner from "./_components/AnilookBanner";
import Genre from "./_components/Genre";
import LatestEpisodes from "./_components/LatestEpisodes";
import NewOnAniLook from "./_components/NewOnAniLook";
import Slider from "./_components/Slider";
import { TopAiring, MostPopular, MostFavorite, LatestCompleted } from "./_components/TopAiring";
import TopUpcoming from "./_components/TopUpcoming";
import TrendingAnime from "./_components/TrendingAnime";

export default function Home() {




  return (
    <div className="bg-neutral-950 no-scrollbar">
      <Slider />
      <TrendingAnime />
      <AnilookBanner />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 bg-neutral-950 mt-5">
        <TopAiring />
        <MostPopular />
        <MostFavorite />
        <LatestCompleted />
      </div>
      <div className="md:flex">
        <div className="flex flex-col">
          <LatestEpisodes />
          <NewOnAniLook />
          <TopUpcoming />
          <div>
            <h2 className="text-2xl text-white px-4 pt-4 pb-2 font-bold">Sponserships</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 items-center gap-10 md:gap-2">
              <AdsBanner />
              <AdsBanner />
              <AdsBanner />
              <AdsBanner />
              <AdsBanner />
              <AdsBanner />
            </div>
          </div>
        </div>
        <Genre />
      </div>
    </div>
  );
}
