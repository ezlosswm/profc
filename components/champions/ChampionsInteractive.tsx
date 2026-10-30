"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ChampionsPageData } from "@/types/types";
import { useState } from "react";

type Champion = ChampionsPageData["champions"][number];

type ChampionsInteractiveProps = {
  champions: Champion[];
  description: string;
};

export default function ChampionsInteractive({
  champions,
  description,
}: ChampionsInteractiveProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedChampion = champions[selectedIndex];

  if (!selectedChampion) return null;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0">
      {/* Left column: Heading, description and image */}
      <div className="flex flex-col lg:col-span-4">
        <div>
          <h1
            id="champions-title"
            className="font-heading text-6xl uppercase leading-[0.9] md:text-7xl"
          >
            Our <br />
            Champions
          </h1>

          <p className="mt-6 max-w-sm text-muted-foreground">{description}</p>
        </div>

        {/* Selected champion image */}
        <div className="mt-8 hidden overflow-hidden sm:block">
          <Image
            src={urlFor(selectedChampion.image!).width(800).height(1067).url()}
            width={800}
            height={1067}
            sizes="(min-width: 1024px) 33vw, 100vw"
            loading="eager"
            alt={`Champion of the ${selectedChampion.division} division.`}
            className="aspect-square w-full object-cover object-top transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      </div>

      {/* Right column: Champions table */}
      <div className="min-w-0 lg:col-span-8">
        <table className="w-full text-left">
          <caption className="sr-only">
            Current PROFC champions by division
          </caption>

          <thead>
            <tr className="border-b border-border text-xs font-medium text-muted-foreground">
              <th scope="col" className="pb-4 font-medium">
                Division
              </th>

              <th scope="col" className="pb-4 font-medium">
                Champions
              </th>

              <th
                scope="col"
                className="hidden pb-4 text-right font-medium sm:table-cell"
              >
                Weight Class
              </th>
            </tr>
          </thead>

          <tbody>
            {champions.map((champion, index) => (
              <tr
                key={champion.name}
                className="border-b border-border align-baseline"
              >
                <td className="w-[36%] py-7 pr-4 text-sm font-medium text-muted-foreground">
                  {champion.division}

                  <span className="mt-1 block text-muted-foreground sm:hidden">
                    {champion.limit}
                  </span>
                </td>

                <th scope="row" className="py-7 pr-4 font-normal">
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    aria-pressed={selectedIndex === index}
                    className="block cursor-pointer font-heading text-3xl uppercase leading-none md:text-5xl"
                  >
                    {champion.name}
                  </button>

                  {champion.nickname && (
                    <span className="mt-2 block text-sm font-medium text-primary">
                      {'"'}
                      {champion.nickname}
                      {'"'}
                    </span>
                  )}
                </th>

                <td className="hidden py-7 text-right font-display text-xl tabular-nums text-muted sm:table-cell">
                  {champion.limit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
