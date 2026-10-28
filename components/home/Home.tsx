import Hero from "@/components/Hero";
import Marquee from "@/components/home/MarqueeBanner";
import SponsorsAndPartners from "@/components/home/SponsorsAndPartners";
import { LatestNews } from "@/components/home/LatestNews";
import { FightEvent, HomePageData } from "@/types/types";
import { sanityFetch } from "@/lib/sanity";
import { connection } from "next/server";
import { sortEventsByAscendingTime } from "@/lib/sort";
import { getUpcomingEvent } from "@/lib/filter";
import { HOMEPAGE_QUERY, EVENTS_QUERY } from "@/lib/queries/queries";

async function HomePage() {
  await connection();

  const homePageData = await sanityFetch<HomePageData>({
    query: HOMEPAGE_QUERY,
    errorMessage: "Home page data query failed",
  });

  const events = await sanityFetch<FightEvent[]>({
    query: EVENTS_QUERY,
    errorMessage: "Event data query failed",
  });

  const upcomingEvent = sortEventsByAscendingTime(getUpcomingEvent(events!))[0];

  return (
    <>
      <Hero heroImage={homePageData!.heroImage} event={upcomingEvent} />
      <Marquee event={upcomingEvent} />

      <LatestNews />

      <SponsorsAndPartners sponsors={homePageData!.sponsor} />
    </>
  );
}

export default HomePage;
