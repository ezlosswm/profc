import AllEvent from "@/components/events/Events";
import { createPageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export const metadata = createPageMetadata({
  title: "Upcoming MMA Events in Belize | PROFC Belize",
  description:
    "Explore upcoming PROFC Belize MMA events, fight cards, event dates, venues, and ticket information. Find out when the next fight takes place.",
  path: "/events",
});

export async function Events() {
  return (
    <Suspense fallback={<Loader />}>
      <AllEvent />
    </Suspense>
  );
}
export default Events;
