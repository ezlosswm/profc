import { nextEvent } from "@/data/events";

export function Marquee() {
  const item = `${nextEvent.name} · ${nextEvent.dateLabel} · ${nextEvent.venue}, ${nextEvent.city}`;
  const items = Array.from({ length: 6 }, () => item);
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden bg-primary text-foreground py-3"
    >
      <div className="animate-marquee flex w-max">
        {[...items, ...items].map((promotion, index) => (
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
