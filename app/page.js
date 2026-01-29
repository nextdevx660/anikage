'use client'

import Genre from "./_components/Genre";
import LatestEpisodes from "./_components/LatestEpisodes";
import NewOnAniLook from "./_components/NewOnAniLook";
import Slider from "./_components/Slider";
import { TopAiring, MostPopular, MostFavorite, LatestCompleted } from "./_components/TopAiring";
import TopUpcoming from "./_components/TopUpcoming";
import TrendingAnime from "./_components/TrendingAnime";

export default function Home() {




  return (
    <div className="bg-[#2d2b2c] no-scrollbar">
      <Slider />
      <TrendingAnime />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 bg-[#2d2b2c] mt-5">
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
        </div>
        <Genre />
      </div>
    </div>
  );
}
