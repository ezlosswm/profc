import type { NextEvent } from "@/types/types";
import { connection } from "next/server";
import { client } from "@/src/sanity/client";
import { formatToMarqueeArray } from "@/lib/formatter";

const EVENTS_QUERY = `
  *[_type == "nextEvent" && startsAt >= $now]
  | order(startsAt asc)[0]
`;
const options = {
  next: { revalidate: 30 },
};

export default async function Marquee() {
  await connection();

  let nextEvent: NextEvent | null = null;

  try {
    nextEvent = await client.fetch<NextEvent>(
      EVENTS_QUERY,
      { now: new Date().toISOString() },
      options,
    );
  } catch (error) {
    console.error("Query failed: ", (error as Error).message);
  }

  if (!nextEvent) {
    return <>No event</>;
  }

  const eventArray = formatToMarqueeArray(nextEvent);

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden bg-primary text-foreground py-3"
    >
      <div className="animate-marquee flex w-max">
        {[...eventArray, ...eventArray].map((promotion, index) => (
          <span
            key={index}
            className="flex items-center whitespace-nowrap font-heading text-xl uppercase tracking-wide"
          >
            <span className="px-5">{promotion}</span>
            <span className="size-1.5 bg-white" />
          </span>
        ))}
      </div>
    </div>
  );
}
