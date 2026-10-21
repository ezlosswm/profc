import AllEvent from "@/components/Events";
import Hero from "@/components/Hero";
import { createPageMetadata } from "@/lib/seo";
import Section from "@/components/ui/section";
import { sanityFetch } from "@/lib/sanity";
import type { Event, ImageAsset } from "@/types/types";
import { Suspense } from "react";

export const metadata = createPageMetadata({
  title: "Upcoming MMA Events in Belize | PROFC Belize",
  description:
    "Explore upcoming PROFC Belize MMA events, fight cards, event dates, venues, and ticket information. Find out when the next fight takes place.",
  path: "/events",
});

const HEROIMAGE_QUERY = ` *[_type == "homePage"][0].heroImage`;
const ALL_EVENTS_QUERY = `*[_type == "allEvents"] | order(startsAt desc)`;

export async function Events() {
  const heroImg = await sanityFetch<ImageAsset>({
    query: HEROIMAGE_QUERY,
    errorMessage: "Error getting hero image",
  });

  const allEvents = await sanityFetch<Event[]>({
    query: ALL_EVENTS_QUERY,
    errorMessage: "Event data query failed",
  });

  return (
    <main className="bg-muted-background">
      <Suspense fallback={<></>}>
        <Hero heroImage={heroImg!} event={allEvents![0]} />
      </Suspense>
      <Section>
        <Suspense
          fallback={
            <>
              <h1>All event</h1>
            </>
          }
        >
          <AllEvent allEvents={allEvents!} />
        </Suspense>
      </Section>
    </main>
  );
}
export default Events;
