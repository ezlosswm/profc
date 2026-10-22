import Hero from "@/components/Hero";
import Image from "next/image";
import hero from "@/public/images/hero-sample.webp";
import Marquee from "@/components/home/MarqueeBanner";
import SponsorsAndPartners from "@/components/home/SponsorsAndPartners";
import { LatestNews } from "@/components/home/LatestNews";
import { Suspense } from "react";
import { Event, HomePageData } from "@/types/types";
import { sanityFetch } from "@/lib/sanity";
import { connection } from "next/server";

const HOMEPAGE_QUERY = `
  *[_type == "homePage"][0]`;

const EVENTS_QUERY = `
  *[_type == "allEvents" && startsAt >= $now]
  | order(startsAt asc)[0]
`;

async function HomePage() {
  await connection();

  const homePageData = await sanityFetch<HomePageData>({
    query: HOMEPAGE_QUERY,
    errorMessage: "Home page data query failed",
  });

  const upcomingEvent = await sanityFetch<Event>({
    query: EVENTS_QUERY,
    params: { now: new Date().toISOString() },
    errorMessage: "Event data query failed",
  });

  return (
    <>
      {/* Hero */}
      <Suspense
        fallback={
          <main
            aria-labelledby="hero-title"
            className="relative min-h-[92vh] overflow-hidden isolate bg-background"
          >
            {/* TODO: Fix image alt text */}
            <div className="size-full">
              <Image
                src={hero}
                alt="Upcoming event flyer"
                width={1000}
                height={1000}
                priority
                className="absolute inset-0 -z-20 size-full object-cover object-[70%_center]"
              />
            </div>
            <div
              className="absolute inset-0 -z-10 bg-background md:bg-background/50"
              aria-hidden="true"
            />

            <div className="flex min-h-[92vh] items-center justify-center">
              Loading upcoming event...
              <p className="text-6xl font-heading animate-pulse text-muted-foreground"></p>
            </div>
          </main>
        }
      >
        <Hero heroImage={homePageData!.heroImage} event={upcomingEvent!} />
      </Suspense>

      {/* Marquee */}
      <Suspense fallback={<></>}>
        <Marquee event={upcomingEvent!} />
      </Suspense>

      {/* Todo */}
      <LatestNews />

      {/* Sponsors */}
      <Suspense fallback={<></>}>
        <SponsorsAndPartners sponsors={homePageData!.sponsor} />
      </Suspense>
    </>
  );
}

export default HomePage;
