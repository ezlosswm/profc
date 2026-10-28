"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ChampionsPageData } from "@/types/types";
import { useState } from "react";

type Champion = ChampionsPageData["champions"][number];

type ChampionsInteractiveProps = {
  champions: Champion[];
};

export default function ChampionsInteractive({
  champions,
}: ChampionsInteractiveProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedChampion = champions[selectedIndex];

  if (!selectedChampion) return null;

  return (
    <>
      <div className="lg:col-span-4 lg:row-span-3 overflow-hidden lg:row-start-2 hidden sm:block">
        <Image
          src={urlFor(selectedChampion.image!.asset)
            .width(800)
            .height(1067)
            .url()}
          width={800}
          height={1067}
          loading="lazy"
          alt={`Champion of the ${selectedChampion.division} division.`}
          className="mt-10 aspect-3/4 w-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </div>

      <div className="lg:col-span-8 row-start-2 sm:row-start-1 row-span-full">
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
                className="pb-4 font-medium hidden text-right sm:table-cell"
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
                <td className="py-7 pr-4 text-sm font-medium text-muted-foreground w-[36%]">
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

                  {champion.nickname ? (
                    <span className="mt-2 block text-sm font-medium text-primary">
                      {'"'}
                      {champion.nickname}
                      {'"'}
                    </span>
                  ) : (
                    <></>
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
    </>
  );
}
