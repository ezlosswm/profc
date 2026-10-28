import type { FightEvent } from "@/types/types";
import { formatToMarqueeArray } from "@/lib/formatter";

type MarqueeProps = {
  event: FightEvent;
};

export default async function Marquee({ event }: MarqueeProps) {
  const eventArray = formatToMarqueeArray(event);

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
